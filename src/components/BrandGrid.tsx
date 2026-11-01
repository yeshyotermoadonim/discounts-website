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
    <div className="space-y-6">
      {/* Search bar */}
      <SearchBar
        value={filters.search}
        onChange={(search) => setFilters((f) => ({ ...f, search }))}
      />

      {/* Filter bar */}
      <FilterBar
        clubs={clubs}
        categories={categories}
        filters={filters}
        sort={sort}
        onFilterChange={setFilters}
        onSortChange={setSort}
      />

      {/* Results summary header */}
      <div className="flex items-center justify-between pt-2 px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-zinc-950">
            {filtered.length === brands.length ? (
              <span>נמצאו {brands.length} מותגים</span>
            ) : (
              <span>מציג {filtered.length} מתוך {brands.length} מותגים</span>
            )}
          </span>
          {filters.search && (
            <span className="text-xs font-medium text-zinc-400">
              עבור &quot;{filters.search}&quot;
            </span>
          )}
        </div>
      </div>

      {/* Grid or empty state */}
      {filtered.length === 0 ? (
        <EmptyState onClearFilters={handleClearFilters} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((brand) => (
            <BrandCard key={brand.id} brand={brand} categories={categories} />
          ))}
        </div>
      )}
    </div>
  )
}
