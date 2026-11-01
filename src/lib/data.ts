// Data fetching layer with Next.js ISR caching
// Fetches JSON data from the public discounts-data GitHub repository
// Falls back gracefully to bundled seed data if remote source is temporarily unreachable

import { Club, Brand, Category, Discount, DataStore, BrandWithDiscounts } from '@/types'
import fallbackClubs from '@/data/seed/clubs.json'
import fallbackBrands from '@/data/seed/brands.json'
import fallbackDiscounts from '@/data/seed/discounts.json'
import fallbackCategories from '@/data/seed/categories.json'

const BASE_URL =
  process.env.DATA_REPO_BASE_URL ||
  'https://raw.githubusercontent.com/yeshyotermoadonim/discounts-data/main'

const REVALIDATE = Number(process.env.DATA_REVALIDATE_SECONDS || 3600)

async function fetchJson<T>(path: string, fallback: T): Promise<T> {
  const url = `${BASE_URL}/${path}`
  try {
    const res = await fetch(url, { next: { revalidate: REVALIDATE } })
    if (!res.ok) {
      console.warn(`[data] Remote fetch failed (${res.status} ${res.statusText}) for ${url}. Using fallback.`)
      return fallback
    }
    const data = await res.json()
    return data as T
  } catch (error) {
    console.warn(`[data] Network error fetching ${url}:`, error, `. Using fallback.`)
    return fallback
  }
}

export async function getDataStore(): Promise<DataStore> {
  const [clubs, brands, discounts, categories] = await Promise.all([
    fetchJson<Club[]>('clubs.json', fallbackClubs as Club[]),
    fetchJson<Brand[]>('brands.json', fallbackBrands as Brand[]),
    fetchJson<Discount[]>('discounts.json', fallbackDiscounts as Discount[]),
    fetchJson<Category[]>('categories.json', fallbackCategories as Category[]),
  ])
  return { clubs, brands, discounts, categories }
}

export async function getClubs(): Promise<Club[]> {
  const { clubs } = await getDataStore()
  return clubs
}

export async function getClubById(id: string): Promise<Club | undefined> {
  const clubs = await getClubs()
  return clubs.find((c) => c.id === id)
}

export async function getBrandById(id: string): Promise<BrandWithDiscounts | undefined> {
  const brands = await getBrandsWithDiscounts()
  return brands.find((b) => b.id === id)
}

export async function getBrandsWithDiscounts(store?: DataStore): Promise<BrandWithDiscounts[]> {
  const data = store || (await getDataStore())
  const { clubs, brands, discounts } = data

  const clubMap = new Map(clubs.map((c) => [c.id, c]))

  return brands.map((brand) => {
    const brandDiscounts = discounts
      .filter((d) => d.brandId === brand.id)
      .map((d) => ({ ...d, club: clubMap.get(d.clubId)! }))
      .filter((d) => d.club !== undefined)

    const percentages = brandDiscounts
      .map((d) => d.discountPercentage)
      .filter((p): p is number => p !== null)

    return {
      ...brand,
      discounts: brandDiscounts,
      bestDiscount: percentages.length > 0 ? Math.max(...percentages) : null,
      clubCount: brandDiscounts.length,
    }
  })
}
