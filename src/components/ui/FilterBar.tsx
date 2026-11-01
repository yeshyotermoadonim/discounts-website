'use client'

// Filter and sort controls for the brand grid
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
  { label: 'לפי שם', value: 'name' },
  { label: 'הנחה גבוהה ביותר', value: 'best-discount' },
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

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-4">
      {/* Club filters */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">מועדונים</p>
        <div className="flex flex-wrap gap-2">
          {clubs.map((club) => {
            const active = filters.clubIds.includes(club.id)
            return (
              <button
                key={club.id}
                onClick={() => toggleClub(club.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  active ? 'text-white shadow-sm' : 'text-white opacity-60 hover:opacity-90'
                }`}
                style={{ backgroundColor: club.color }}
              >
                {club.name}
              </button>
            )
          })}
        </div>
      </div>

      {/* Category filters - horizontally scrollable */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">קטגוריות</p>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((cat) => {
            const active = filters.categoryIds.includes(cat.id)
            return (
              <button
                key={cat.id}
                onClick={() => toggleCategory(cat.id)}
                className={`inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                  active
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-50 text-gray-700 border border-gray-200 hover:border-blue-400 hover:text-blue-600'
                }`}
              >
                {cat.name}
              </button>
            )
          })}
        </div>
      </div>

      {/* Bottom row: min discount + mobile toggle + sort */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Min discount buttons */}
        <div className="flex items-center gap-1">
          <span className="text-xs font-semibold text-gray-500 ml-2">הנחה מינימלית:</span>
          {MIN_DISCOUNT_OPTIONS.map((opt) => (
            <button
              key={String(opt.value)}
              onClick={() => setMinDiscount(opt.value)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                filters.minDiscount === opt.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Mobile redemption toggle */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.mobileOnly}
            onChange={(e) => onFilterChange({ ...filters, mobileOnly: e.target.checked })}
            className="sr-only"
          />
          <div
            className={`relative w-9 h-5 rounded-full transition-colors ${
              filters.mobileOnly ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                filters.mobileOnly ? 'translate-x-4' : 'translate-x-0.5'
              }`}
            />
          </div>
          <span className="text-sm text-gray-700">מימוש במובייל</span>
        </label>

        {/* Sort dropdown - pushed to the left in RTL */}
        <div className="mr-auto">
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            dir="rtl"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
