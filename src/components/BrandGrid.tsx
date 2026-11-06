'use client'

import { useEffect, useMemo, useState } from 'react'
import { BrandWithListings, Club, Category, SortOption, FilterState } from '@/types'
import { filterBrands, sortBrands, defaultFilters } from '@/lib/utils'
import { SearchBar } from '@/components/ui/SearchBar'
import { FilterBar } from '@/components/ui/FilterBar'
import { BrandCard } from '@/components/ui/BrandCard'
import { EmptyState } from '@/components/ui/EmptyState'

interface BrandGridProps {
  brands: BrandWithListings[]
  clubs: Club[]
  categories: Category[]
  initialClubId?: string
}

export function BrandGrid({ brands, clubs, categories, initialClubId }: BrandGridProps) {
  const [filters, setFilters] = useState<FilterState>({
    ...defaultFilters(),
    clubIds: initialClubId ? [initialClubId] : [],
  })
  const [sort, setSort] = useState<SortOption>('name')
  const [visible, setVisible] = useState(48)

  const filtered = useMemo(
    () => sortBrands(filterBrands(brands, filters), sort),
    [brands, filters, sort],
  )

  useEffect(() => {
    setVisible(48)
  }, [filters, sort])

  return (
    <div className="space-y-8">
      <SearchBar value={filters.search} onChange={(search) => setFilters((current) => ({ ...current, search }))} />
      <FilterBar
        clubs={clubs}
        categories={categories}
        filters={filters}
        sort={sort}
        preserveClubIds={initialClubId ? [initialClubId] : []}
        onFilterChange={setFilters}
        onSortChange={setSort}
      />
      <p className="text-xs text-[var(--muted)]">
        {filtered.length === brands.length
          ? `${brands.length} מותגים`
          : `${filtered.length} מתוך ${brands.length}`}
      </p>
      {filtered.length === 0 ? (
        <EmptyState
          onClearFilters={() =>
            setFilters({ ...defaultFilters(), clubIds: initialClubId ? [initialClubId] : [] })
          }
        />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.slice(0, visible).map((brand) => (
              <BrandCard key={brand.id} brand={brand} categories={categories} />
            ))}
          </div>
          {visible < filtered.length && (
            <button
              type="button"
              onClick={() => setVisible((count) => count + 48)}
              className="block mx-auto rounded-full bg-[#12151c] px-5 py-2.5 text-sm text-white"
            >
              עוד מותגים
            </button>
          )}
        </>
      )}
    </div>
  )
}
