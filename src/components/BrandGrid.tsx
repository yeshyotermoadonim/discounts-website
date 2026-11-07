'use client'

import { useMemo, useState } from 'react'
import { BrandWithListings, Club, FilterState } from '@/types'
import { filterBrands, defaultFilters } from '@/lib/utils'
import { CATEGORY_GROUPS, UNCATEGORIZED_ID, groupName, sectionGroupId } from '@/lib/groups'
import { SearchBar } from '@/components/ui/SearchBar'
import { FilterBar } from '@/components/ui/FilterBar'
import { BrandCard } from '@/components/ui/BrandCard'
import { EmptyState } from '@/components/ui/EmptyState'

interface BrandGridProps {
  brands: BrandWithListings[]
  clubs: Club[]
  initialClubId?: string
  showClubs?: boolean
}

export function BrandGrid({ brands, clubs, initialClubId, showClubs = true }: BrandGridProps) {
  const [filters, setFilters] = useState<FilterState>({
    ...defaultFilters(),
    clubIds: initialClubId ? [initialClubId] : [],
  })

  const sections = useMemo(() => {
    const filtered = filterBrands(brands, filters)
    const buckets = new Map<string, BrandWithListings[]>()
    for (const brand of filtered) {
      const id = sectionGroupId(brand.categories, filters.categoryIds)
      const list = buckets.get(id) ?? []
      list.push(brand)
      buckets.set(id, list)
    }
    const order = [...CATEGORY_GROUPS.map((group) => group.id), UNCATEGORIZED_ID]
    return order
      .filter((id) => buckets.has(id))
      .map((id) => ({
        id,
        name: groupName(id),
        brands: buckets.get(id)!.sort((a, b) => a.name.localeCompare(b.name, 'he')),
      }))
  }, [brands, filters])

  return (
    <div>
      <div className="flex items-center gap-2">
        <SearchBar value={filters.search} onChange={(search) => setFilters((current) => ({ ...current, search }))} />
        <button
          type="button"
          aria-pressed={filters.onlineOnly}
          onClick={() => setFilters((current) => ({ ...current, onlineOnly: !current.onlineOnly }))}
          className={`shrink-0 h-11 px-1 text-[13px] ${
            filters.onlineOnly ? 'text-[var(--ink)] font-medium underline underline-offset-4' : 'text-[var(--muted)]'
          }`}
        >
          אונליין
        </button>
      </div>
      <div className="mt-3">
        <FilterBar
          clubs={clubs}
          filters={filters}
          preserveClubIds={initialClubId ? [initialClubId] : []}
          showClubs={showClubs}
          onFilterChange={setFilters}
        />
      </div>
      {sections.length === 0 ? (
        <EmptyState
          onClearFilters={() =>
            setFilters({ ...defaultFilters(), clubIds: initialClubId ? [initialClubId] : [] })
          }
        />
      ) : (
        <div className="mt-6">
          {sections.map((section) => (
            <section key={section.id} className="mb-6">
              <h2 className="sticky top-14 z-10 -mx-4 px-4 py-2 bg-[var(--bg)] text-[13px] font-semibold border-b border-[var(--line)]">
                {section.name}
              </h2>
              {section.brands.map((brand) => (
                <BrandCard key={brand.id} brand={brand} />
              ))}
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
