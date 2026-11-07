import { BrandWithListings, FilterState, SortOption } from '@/types'
import { brandInGroup } from '@/lib/groups'

export function filterBrands(
  brands: BrandWithListings[],
  filters: FilterState,
): BrandWithListings[] {
  let result = brands

  if (filters.search.trim()) {
    const query = filters.search.trim().toLowerCase()
    result = result.filter((brand) =>
      [brand.name, ...brand.aliases].some((name) => name.toLowerCase().includes(query)),
    )
  }

  if (filters.clubIds.length > 0) {
    result = result.filter((brand) =>
      brand.listings.some((listing) => filters.clubIds.includes(listing.clubId)),
    )
  }

  if (filters.excludeClubIds.length > 0) {
    result = result.filter(
      (brand) => !brand.listings.some((listing) => filters.excludeClubIds.includes(listing.clubId)),
    )
  }

  if (filters.categoryIds.length > 0) {
    result = result.filter((brand) =>
      filters.categoryIds.some((groupId) => brandInGroup(brand.categories, groupId)),
    )
  }

  if (filters.onlineOnly) {
    result = result.filter((brand) =>
      brand.listings.some(
        (listing) =>
          listing.online &&
          !filters.excludeClubIds.includes(listing.clubId) &&
          (filters.clubIds.length === 0 || filters.clubIds.includes(listing.clubId)),
      ),
    )
  }

  return result
}

export function sortBrands(brands: BrandWithListings[], sort: SortOption): BrandWithListings[] {
  const copy = [...brands]
  if (sort === 'club-count') {
    return copy.sort((a, b) => b.clubCount - a.clubCount || a.name.localeCompare(b.name, 'he'))
  }
  return copy.sort((a, b) => a.name.localeCompare(b.name, 'he'))
}

export function defaultFilters(): FilterState {
  return {
    search: '',
    clubIds: [],
    excludeClubIds: [],
    categoryIds: [],
    onlineOnly: false,
  }
}
