// Utility functions for filtering, searching, and sorting brand data

import { BrandWithDiscounts, FilterState, SortOption } from '@/types'

/**
 * Filters brands based on the provided filter state.
 */
export function filterBrands(
  brands: BrandWithDiscounts[],
  filters: FilterState,
): BrandWithDiscounts[] {
  let result = brands

  // Search filter: match brand name case-insensitively
  if (filters.search.trim()) {
    const q = filters.search.trim().toLowerCase()
    result = result.filter((b) => b.name.toLowerCase().includes(q))
  }

  // Club filter: brand must have a discount from at least one of the selected clubs
  if (filters.clubIds.length > 0) {
    result = result.filter((b) =>
      b.discounts.some((d) => filters.clubIds.includes(d.clubId)),
    )
  }

  // Category filter: brand must belong to at least one of the selected categories
  if (filters.categoryIds.length > 0) {
    result = result.filter((b) =>
      b.categories.some((c) => filters.categoryIds.includes(c)),
    )
  }

  // Minimum discount filter
  if (filters.minDiscount !== null) {
    result = result.filter(
      (b) => b.bestDiscount !== null && b.bestDiscount >= (filters.minDiscount as number),
    )
  }

  // Mobile redemption filter
  if (filters.mobileOnly) {
    result = result.filter((b) => b.discounts.some((d) => d.mobileRedemption === true))
  }

  return result
}

/**
 * Sorts brands by the given sort option.
 */
export function sortBrands(brands: BrandWithDiscounts[], sort: SortOption): BrandWithDiscounts[] {
  const copy = [...brands]
  switch (sort) {
    case 'name':
      return copy.sort((a, b) => a.name.localeCompare(b.name))
    case 'best-discount':
      return copy.sort((a, b) => {
        const da = a.bestDiscount ?? -1
        const db = b.bestDiscount ?? -1
        return db - da
      })
    case 'club-count':
      return copy.sort((a, b) => b.clubCount - a.clubCount)
    default:
      return copy
  }
}

/**
 * Returns the initial (default) filter state.
 */
export function defaultFilters(): FilterState {
  return {
    search: '',
    clubIds: [],
    categoryIds: [],
    minDiscount: null,
    mobileOnly: false,
  }
}
