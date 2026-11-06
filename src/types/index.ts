export interface Club {
  id: string
  name: string
  nameEn: string
  url: string
  color: string
  active: boolean
}

export interface Brand {
  id: string
  name: string
  categories: string[]
  logoUrl: string | null
}

export interface Category {
  id: string
  name: string
}

export interface Listing {
  brandId: string
  clubId: string
  online: boolean
  url: string
}

export interface ListingWithClub extends Listing {
  club: Club
}

export interface BrandWithListings extends Brand {
  listings: ListingWithClub[]
  clubCount: number
}

export interface DataStore {
  clubs: Club[]
  brands: Brand[]
  listings: Listing[]
  categories: Category[]
}

export type SortOption = 'name' | 'club-count'

export interface FilterState {
  search: string
  clubIds: string[]
  categoryIds: string[]
  onlineOnly: boolean
}
