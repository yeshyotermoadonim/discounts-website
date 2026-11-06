'use client'

import { useState, useMemo } from 'react'
import { BrandWithDiscounts, Club, Category, SortOption, FilterState } from '@/types'
import { filterBrands, sortBrands, defaultFilters } from '@/lib/utils'
import { SearchBar } from '@/components/ui/SearchBar'
import { FilterBar } from '@/components/ui/FilterBar'
import { BrandCard } from '@/components/ui/BrandCard'
import { EmptyState } from '@/components/ui/EmptyState'

interface BrandGridProps {
  brands: BrandWithDiscounts[]
  clubs: Club[]
  categories: Category[]
  initialClubId?: string
}

export function BrandGrid({ brands, clubs, categories, initialClubId }: BrandGridProps) {
  const [filters, setFilters] = useState<FilterState>({
    ...defaultFilters(),
    clubIds: initialClubId ? [initialClubId] : [],
  })
  const [sort, setSort] = useState<SortOption>('best-discount')

  const filtered = useMemo(() => {
    return sortBrands(filterBrands(brands, filters), sort)
  }, [brands, filters, sort])

  const handleClearFilters = () => {
    setFilters({
      ...defaultFilters(),
      clubIds: initialClubId ? [initialClubId] : [],
    })
  }

  return (
    <div className="space-y-8">
      {/* Search Input Hero Box */}
      <SearchBar
        value={filters.search}
        onChange={(search) => setFilters((f) => ({ ...f, search }))}
      />

      {/* Control Filter Deck */}
      <FilterBar
        clubs={clubs}
        categories={categories}
        filters={filters}
        sort={sort}
        onFilterChange={setFilters}
        onSortChange={setSort}
      />

      {/* Results Header Status */}
      <div className="flex items-center justify-between pt-2 px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-zinc-950 px-3 py-1 rounded-full bg-white border border-zinc-200/80 shadow-2xs">
            {filtered.length === brands.length ? (
              <span>נמצאו {brands.length} מותגים</span>
            ) : (
              <span>מציג {filtered.length} מתוך {brands.length} מותגים</span>
            )}
          </span>
          {filters.search && (
            <span className="text-xs font-semibold text-zinc-500">
              עבור &quot;{filters.search}&quot;
            </span>
          )}
        </div>
      </div>

      {/* Responsive Cards Grid */}
      {filtered.length === 0 ? (
        <EmptyState onClearFilters={handleClearFilters} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((brand) => (
            <BrandCard key={brand.id} brand={brand} categories={categories} />
          ))}
        </div>
      )}
    </div>
  )
}
