// Core data types matching the JSON data files

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
  website: string | null
}

export interface Category {
  id: string
  name: string
}

export type DiscountType = 'percentage' | 'fixed-price'
export type VerificationStatus = 'verified' | 'seed' | 'unverified' | 'outdated'

export interface Discount {
  id: string
  brandId: string
  clubId: string
  type: DiscountType
  discountPercentage: number | null
  originalPrice: number | null
  discountedPrice: number | null
  redemptionUrl: string | null
  onlineRedemption: boolean | null
  mobileRedemption: boolean | null
  sourceUrl: string | null
  lastVerified: string | null
  verificationStatus: VerificationStatus
  _meta: {
    source: string
    note: string
  }
}

// Enriched types used in the UI
export interface DiscountWithClub extends Discount {
  club: Club
}

export interface BrandWithDiscounts extends Brand {
  discounts: DiscountWithClub[]
  bestDiscount: number | null
  clubCount: number
}

export interface DataStore {
  clubs: Club[]
  brands: Brand[]
  discounts: Discount[]
  categories: Category[]
}

export type SortOption = 'name' | 'best-discount' | 'club-count'

export interface FilterState {
  search: string
  clubIds: string[]
  categoryIds: string[]
  minDiscount: number | null
  mobileOnly: boolean
}
