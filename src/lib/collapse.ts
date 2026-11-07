import type { BrandWithListings, ListingWithClub } from '@/types'

const HEBREW: Record<string, string> = {
  א: '',
  ב: 'b',
  ג: 'g',
  ד: 'd',
  ה: 'h',
  ו: 'v',
  ז: 'z',
  ח: 'h',
  ט: 't',
  י: 'i',
  כ: 'k',
  ך: 'k',
  ל: 'l',
  מ: 'm',
  ם: 'm',
  נ: 'n',
  ן: 'n',
  ס: 's',
  ע: 'a',
  פ: 'p',
  ף: 'p',
  צ: 'ts',
  ץ: 'ts',
  ק: 'k',
  ר: 'r',
  ש: 'sh',
  ת: 't',
}

function nameKey(name: string): string {
  let text = name.replace(/\s+/g, ' ').trim()
  const colon = text.indexOf(':')
  if (colon >= 0) {
    const right = text.slice(colon + 1).trim()
    if (right) text = right
  }
  text = text.toLowerCase()
  text = text.replace(/[׳'"`״]/g, '')
  text = text.replace(/(^|\s)(online|אונליין|אונלין)(?=\s|$)/gi, ' ')
  text = text.replace(/^רשת\s+/, '')
  return text.replace(/[^0-9a-z\u0590-\u05FF]+/gi, '')
}

function phonetic(text: string): string {
  const chars = [...text]
  let out = ''
  for (let i = 0; i < chars.length; i += 1) {
    const ch = chars[i]
    if (ch === 'א' && i + 1 < chars.length && (chars[i + 1] === 'י' || chars[i + 1] === 'ו')) {
      out += chars[i + 1] === 'י' ? 'i' : 'o'
      i += 1
      continue
    }
    if (ch === 'ה' && i === chars.length - 1) {
      out += 'a'
      continue
    }
    if (ch >= 'א' && ch <= 'ת') {
      out += HEBREW[ch] ?? ''
      continue
    }
    if (/[a-z0-9]/.test(ch)) out += ch
  }
  return out
}

function scriptKind(key: string): 'he' | 'lat' | 'other' {
  const hebrew = /[\u0590-\u05FF]/.test(key)
  const latin = /[a-z]/.test(key)
  if (hebrew && !latin) return 'he'
  if (latin && !hebrew) return 'lat'
  return 'other'
}

function namePenalty(name: string): number {
  const folded = name.toLowerCase()
  const noisy =
    folded.includes('אונליין') ||
    folded.includes('online') ||
    name.includes(':') ||
    folded.startsWith('רשת')
  return noisy ? 1 : 0
}

function preferName(current: string, incoming: string): string {
  const currentPenalty = namePenalty(current)
  const incomingPenalty = namePenalty(incoming)
  if (incomingPenalty !== currentPenalty) return incomingPenalty < currentPenalty ? incoming : current
  return incoming.length < current.length ? incoming : current
}

function pickId(group: BrandWithListings[], displayName: string): string {
  const key = nameKey(displayName)
  return [...group].sort((a, b) => {
    const aMatch = nameKey(a.name) === key ? 0 : 1
    const bMatch = nameKey(b.name) === key ? 0 : 1
    const aSlug = a.id.startsWith('b-') ? 1 : 0
    const bSlug = b.id.startsWith('b-') ? 1 : 0
    return aMatch - bMatch || aSlug - bSlug || a.id.length - b.id.length || a.id.localeCompare(b.id)
  })[0].id
}

function mergeCluster(group: BrandWithListings[]): BrandWithListings {
  const name = group.map((brand) => brand.name).reduce(preferName)
  const id = pickId(group, name)
  const aliases = [...new Set(group.map((brand) => brand.name).filter((alias) => alias !== name))]
  const categories: string[] = []
  for (const brand of group) {
    for (const categoryId of brand.categories) {
      if (!categories.includes(categoryId)) categories.push(categoryId)
    }
  }
  const specific = categories.filter((categoryId) => categoryId !== 'other')
  const logoUrl =
    group.find((brand) => brand.name === name && brand.logoUrl)?.logoUrl ??
    group.find((brand) => brand.logoUrl)?.logoUrl ??
    null

  const listingsByClub = new Map<string, ListingWithClub>()
  for (const brand of group) {
    for (const listing of brand.listings) {
      const current = listingsByClub.get(listing.clubId)
      if (!current) {
        listingsByClub.set(listing.clubId, { ...listing, brandId: id })
        continue
      }
      current.online = current.online || listing.online
    }
  }
  const listings = [...listingsByClub.values()]

  return {
    id,
    name,
    aliases,
    sourceIds: group.map((brand) => brand.id),
    categories: specific.length > 0 ? specific : categories,
    logoUrl,
    listings,
    clubCount: listings.length,
  }
}

export function collapseBrands(brands: BrandWithListings[]): BrandWithListings[] {
  const byKey = new Map<string, BrandWithListings[]>()
  for (const brand of brands) {
    const key = nameKey(brand.name) || brand.id
    const list = byKey.get(key) ?? []
    list.push(brand)
    byKey.set(key, list)
  }

  const keys = [...byKey.keys()]
  const parent = new Map(keys.map((key) => [key, key]))
  const find = (key: string): string => {
    let current = key
    while (parent.get(current) !== current) current = parent.get(current) ?? current
    return current
  }
  const union = (left: string, right: string) => {
    const leftRoot = find(left)
    const rightRoot = find(right)
    if (leftRoot !== rightRoot) parent.set(rightRoot, leftRoot)
  }

  const latinByPhonetic = new Map<string, string[]>()
  for (const key of keys) {
    if (scriptKind(key) !== 'lat') continue
    const sound = phonetic(key)
    if (sound.length < 4) continue
    const list = latinByPhonetic.get(sound) ?? []
    list.push(key)
    latinByPhonetic.set(sound, list)
  }
  for (const key of keys) {
    if (scriptKind(key) !== 'he') continue
    const sound = phonetic(key)
    if (sound.length < 4) continue
    for (const latinKey of latinByPhonetic.get(sound) ?? []) union(latinKey, key)
  }

  const clusters = new Map<string, BrandWithListings[]>()
  for (const key of keys) {
    const root = find(key)
    const list = clusters.get(root) ?? []
    list.push(...(byKey.get(key) ?? []))
    clusters.set(root, list)
  }

  return [...clusters.values()].map(mergeCluster)
}
