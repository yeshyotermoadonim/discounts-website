'use client'

// Client component for the interactive brand grid with filtering, search, and sorting
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
  initialClubId?: string // Pre-filter by a specific club (used on club pages)
}

export function BrandGrid({ brands, clubs, categories, initialClubId }: BrandGridProps) {
  const [filters, setFilters] = useState<FilterState>({
    ...defaultFilters(),
    clubIds: initialClubId ? [initialClubId] : [],
  })
  const [sort, setSort] = useState<SortOption>('name')

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
    <div className="space-y-5">
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

      {/* Results count */}
      <p className="text-sm text-gray-500">
        {filtered.length === brands.length ? (
          <span>{brands.length} מותגים</span>
        ) : (
          <span>
            {filtered.length} מותגים מתוך {brands.length}
          </span>
        )}
      </p>

      {/* Grid or empty state */}
      {filtered.length === 0 ? (
        <EmptyState onClearFilters={handleClearFilters} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((brand) => (
            <BrandCard key={brand.id} brand={brand} categories={categories} />
          ))}
        </div>
      )}
    </div>
  )
}
