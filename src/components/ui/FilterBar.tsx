'use client'

import { Club, Category, FilterState, SortOption } from '@/types'

interface FilterBarProps {
  clubs: Club[]
  categories: Category[]
  filters: FilterState
  sort: SortOption
  preserveClubIds?: string[]
  onFilterChange: (filters: FilterState) => void
  onSortChange: (sort: SortOption) => void
}

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: 'שם', value: 'name' },
  { label: 'מספר מועדונים', value: 'club-count' },
]

export function FilterBar({
  clubs,
  categories,
  filters,
  sort,
  preserveClubIds = [],
  onFilterChange,
  onSortChange,
}: FilterBarProps) {
  const toggleClub = (clubId: string) => {
    const next = filters.clubIds.includes(clubId)
      ? filters.clubIds.filter((id) => id !== clubId)
      : [...filters.clubIds, clubId]
    onFilterChange({ ...filters, clubIds: next })
  }

  const toggleCategory = (catId: string) => {
    const next = filters.categoryIds.includes(catId)
      ? filters.categoryIds.filter((id) => id !== catId)
      : [...filters.categoryIds, catId]
    onFilterChange({ ...filters, categoryIds: next })
  }

  const hasFilters =
    filters.clubIds.length > preserveClubIds.length ||
    filters.categoryIds.length > 0 ||
    filters.onlineOnly ||
    filters.search.trim().length > 0

  return (
    <div className="rounded-3xl border border-[var(--line)] bg-white p-4 sm:p-5 shadow-[0_10px_30px_rgba(18,21,28,0.04)] space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {clubs.map((club) => {
          const active = filters.clubIds.includes(club.id)
          return (
            <button
              key={club.id}
              type="button"
              onClick={() => toggleClub(club.id)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm border"
              style={
                active
                  ? { backgroundColor: club.color, borderColor: club.color, color: '#fff' }
                  : { backgroundColor: '#fff', borderColor: 'var(--line)', color: 'var(--ink)' }
              }
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: active ? '#fff' : club.color }}
              />
              {club.name}
            </button>
          )
        })}
        {hasFilters && (
          <button
            type="button"
            onClick={() =>
              onFilterChange({
                search: '',
                clubIds: preserveClubIds,
                categoryIds: [],
                onlineOnly: false,
              })
            }
            className="text-sm text-[var(--muted)] hover:text-[var(--ink)] px-2"
          >
            איפוס
          </button>
        )}
        <label className="mr-auto flex items-center gap-2 text-sm text-[var(--muted)]">
          <span>מיון</span>
          <select
            value={sort}
            onChange={(event) => onSortChange(event.target.value as SortOption)}
            className="bg-[#f4f7fb] border border-[var(--line)] rounded-full px-3 py-1 text-[var(--ink)] focus:outline-none"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={filters.onlineOnly}
        onClick={() => onFilterChange({ ...filters, onlineOnly: !filters.onlineOnly })}
        className="w-full sm:w-auto flex items-center justify-between gap-6 rounded-2xl border border-dashed border-[#b7c3d6] bg-[#f6f8fc] px-4 py-3 text-right"
      >
        <span>
          <span className="block text-sm font-medium text-[var(--ink)]">רק מימוש אונליין</span>
          <span className="block text-xs text-[var(--muted)] mt-0.5">מותגים שאפשר לממש באתר המועדון</span>
        </span>
        <span
          className={`relative h-7 w-12 rounded-full transition-colors ${
            filters.onlineOnly ? 'bg-[#12151c]' : 'bg-[#d5dce8]'
          }`}
        >
          <span
            className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-all ${
              filters.onlineOnly ? 'right-5' : 'right-0.5'
            }`}
          />
        </span>
      </button>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {categories
          .filter((category) => category.id !== 'other')
          .map((category) => {
            const active = filters.categoryIds.includes(category.id)
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => toggleCategory(category.id)}
                className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full ${
                  active ? 'bg-[#12151c] text-white' : 'bg-[#f4f7fb] text-[var(--muted)] hover:text-[var(--ink)]'
                }`}
              >
                {category.name}
              </button>
            )
          })}
      </div>
    </div>
  )
}
