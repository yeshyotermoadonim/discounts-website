import { Club, Brand, Category, Listing, DataStore, BrandWithListings } from '@/types'
import fallbackClubs from '@/data/seed/clubs.json'
import fallbackBrands from '@/data/seed/brands.json'
import fallbackListings from '@/data/seed/listings.json'
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
  const [clubs, brands, listings, categories] = await Promise.all([
    fetchJson<Club[]>('clubs.json', fallbackClubs as Club[]),
    fetchJson<Brand[]>('brands.json', fallbackBrands as Brand[]),
    fetchJson<Listing[]>('listings.json', fallbackListings as Listing[]),
    fetchJson<Category[]>('categories.json', fallbackCategories as Category[]),
  ])
  return { clubs, brands, listings, categories }
}

export async function getBrandsWithListings(store?: DataStore): Promise<BrandWithListings[]> {
  const data = store || (await getDataStore())
  const { clubs, brands, listings } = data
  const clubMap = new Map(clubs.map((club) => [club.id, club]))

  return brands.map((brand) => {
    const brandListings = listings
      .filter((listing) => listing.brandId === brand.id)
      .map((listing) => ({ ...listing, club: clubMap.get(listing.clubId)! }))
      .filter((listing) => listing.club !== undefined)

    return {
      ...brand,
      listings: brandListings,
      clubCount: brandListings.length,
    }
  })
}
