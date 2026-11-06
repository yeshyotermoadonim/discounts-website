'use client'

import { Club, Category, FilterState, SortOption } from '@/types'

interface FilterBarProps {
  clubs: Club[]
  categories: Category[]
  filters: FilterState
  sort: SortOption
  onFilterChange: (filters: FilterState) => void
  onSortChange: (sort: SortOption) => void
}

const MIN_DISCOUNT_OPTIONS = [
  { label: 'הכל', value: null },
  { label: '10%+', value: 10 },
  { label: '15%+', value: 15 },
  { label: '20%+', value: 20 },
]

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: 'הנחה גבוהה ביותר', value: 'best-discount' },
  { label: 'לפי שם (א-ת)', value: 'name' },
  { label: 'מספר מועדונים', value: 'club-count' },
]

export function FilterBar({
  clubs,
  categories,
  filters,
  sort,
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

  const setMinDiscount = (val: number | null) => {
    onFilterChange({ ...filters, minDiscount: val })
  }

  const activeFiltersCount =
    filters.clubIds.length +
    filters.categoryIds.length +
    (filters.minDiscount !== null ? 1 : 0) +
    (filters.mobileOnly ? 1 : 0) +
    (filters.search.trim() ? 1 : 0)

  const clearAllFilters = () => {
    onFilterChange({
      search: '',
      clubIds: [],
      categoryIds: [],
      minDiscount: null,
      mobileOnly: false,
    })
  }

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-zinc-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-5 sm:p-7 space-y-6">
      {/* Top Deck: Club Filter Chips */}
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <span className="text-xs font-black text-zinc-950 uppercase tracking-wider flex items-center gap-2">
            <span>מועדוני צרכנות</span>
            <span className="text-[11px] text-zinc-400 font-semibold">
              ({filters.clubIds.length > 0 ? `${filters.clubIds.length} מסוננים` : 'כל המועדונים'})
            </span>
          </span>

          {activeFiltersCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1.5 transition-colors cursor-pointer group"
            >
              <span>איפוס מסננים</span>
              <span className="px-1.5 py-0.5 rounded-full bg-rose-50 text-rose-600 font-mono text-[10px] group-hover:bg-rose-100 transition-colors">
                {activeFiltersCount}
              </span>
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2.5">
          {clubs.map((club) => {
            const active = filters.clubIds.includes(club.id)
            return (
              <button
                key={club.id}
                onClick={() => toggleClub(club.id)}
                className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  active
                    ? 'bg-zinc-950 text-white shadow-md shadow-zinc-950/15 scale-102 ring-2 ring-zinc-950/10'
                    : 'bg-zinc-100/80 text-zinc-700 hover:bg-zinc-200/80 border border-zinc-200/60'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0 shadow-2xs"
                  style={{ backgroundColor: club.color }}
                />
                <span>{club.name}</span>
                {active && (
                  <span className="text-zinc-400 text-[10px] font-mono">✓</span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Middle Deck: Category Chips */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-black text-zinc-950 uppercase tracking-wider">
            קטגוריות
          </span>
          <span className="text-[11px] text-zinc-400 font-medium">
            בחירה מהירה
          </span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
          {categories.map((cat) => {
            const active = filters.categoryIds.includes(cat.id)
            return (
              <button
                key={cat.id}
                onClick={() => toggleCategory(cat.id)}
                className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 flex-shrink-0 cursor-pointer ${
                  active
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 scale-102'
                    : 'bg-zinc-50 text-zinc-700 border border-zinc-200/80 hover:border-zinc-300 hover:bg-white'
                }`}
              >
                {cat.name}
              </button>
            )
          })}
        </div>
      </div>

      {/* Control Deck: Min Discount + Mobile Filter + Sort */}
      <div className="pt-4 border-t border-zinc-100/90 flex flex-wrap items-center justify-between gap-4">
        {/* Min Discount Segmented Pill */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-zinc-700">הנחה:</span>
          <div className="inline-flex bg-zinc-100/90 p-1 rounded-full border border-zinc-200/70 shadow-inner">
            {MIN_DISCOUNT_OPTIONS.map((opt) => {
              const isActive = filters.minDiscount === opt.value
              return (
                <button
                  key={String(opt.value)}
                  onClick={() => setMinDiscount(opt.value)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-white text-zinc-950 shadow-xs scale-102'
                      : 'text-zinc-500 hover:text-zinc-900'
                  }`}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Right Side: Mobile switch & Sort Dropdown */}
        <div className="flex items-center gap-4 mr-auto">
          {/* Mobile Only Toggle */}
          <label className="inline-flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={filters.mobileOnly}
              onChange={(e) =>
                onFilterChange({ ...filters, mobileOnly: e.target.checked })
              }
              className="sr-only"
            />
            <div
              className={`relative w-8 h-4.5 rounded-full transition-colors duration-200 ${
                filters.mobileOnly ? 'bg-indigo-600' : 'bg-zinc-200'
              }`}
            >
              <div
                className={`absolute top-0.5 w-3.5 h-3.5 bg-white rounded-full shadow-xs transition-transform duration-200 ${
                  filters.mobileOnly ? 'translate-x-3.5' : 'translate-x-0.5'
                }`}
              />
            </div>
            <span className="text-xs font-bold text-zinc-700">
              באפליקציה בלבד
            </span>
          </label>

          {/* Sort Selector */}
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="text-xs font-extrabold text-zinc-800 bg-zinc-100/80 hover:bg-zinc-100 border border-zinc-200/80 rounded-2xl px-3.5 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer appearance-none pl-8"
              dir="rtl"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
