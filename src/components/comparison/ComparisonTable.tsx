'use client'

// Comparison tool: side-by-side view of two clubs' discounts
// Mobile-friendly: stacked cards instead of a wide table
import { useState, useMemo } from 'react'
import { Club, BrandWithDiscounts, Category } from '@/types'
import { LogoImage } from '@/components/ui/LogoImage'
import { DiscountBadge } from '@/components/ui/DiscountBadge'
import { ClubBadge } from '@/components/ui/ClubBadge'

interface ComparisonTableProps {
  clubs: Club[]
  brands: BrandWithDiscounts[]
  categories: Category[]
  defaultClub1Id?: string
  defaultClub2Id?: string
}

type TabMode = 'all' | 'shared' | 'club1only' | 'club2only'

export function ComparisonTable({
  clubs,
  brands,
  categories,
  defaultClub1Id,
  defaultClub2Id,
}: ComparisonTableProps) {
  const activeClubs = clubs.filter((c) => c.active)
  const [club1Id, setClub1Id] = useState(defaultClub1Id || activeClubs[0]?.id || '')
  const [club2Id, setClub2Id] = useState(defaultClub2Id || activeClubs[1]?.id || '')
  const [tab, setTab] = useState<TabMode>('all')

  const club1 = activeClubs.find((c) => c.id === club1Id)
  const club2 = activeClubs.find((c) => c.id === club2Id)

  // For each brand, find discounts from club1 and club2
  const brandRows = useMemo(() => {
    return brands
      .map((brand) => {
        const d1 = brand.discounts.find((d) => d.clubId === club1Id) || null
        const d2 = brand.discounts.find((d) => d.clubId === club2Id) || null
        return { brand, d1, d2 }
      })
      .filter((row) => row.d1 || row.d2) // Only show brands available in at least one club
  }, [brands, club1Id, club2Id])

  const filtered = useMemo(() => {
    switch (tab) {
      case 'shared':
        return brandRows.filter((r) => r.d1 && r.d2)
      case 'club1only':
        return brandRows.filter((r) => r.d1 && !r.d2)
      case 'club2only':
        return brandRows.filter((r) => !r.d1 && r.d2)
      default:
        return brandRows
    }
  }, [brandRows, tab])

  const sharedCount = brandRows.filter((r) => r.d1 && r.d2).length
  const club1OnlyCount = brandRows.filter((r) => r.d1 && !r.d2).length
  const club2OnlyCount = brandRows.filter((r) => !r.d1 && r.d2).length

  const tabs: { key: TabMode; label: string; count: number }[] = [
    { key: 'all', label: 'כל המותגים', count: brandRows.length },
    { key: 'shared', label: 'משותף לשניהם', count: sharedCount },
    { key: 'club1only', label: club1 ? `רק ב${club1.name}` : 'רק במועדון 1', count: club1OnlyCount },
    { key: 'club2only', label: club2 ? `רק ב${club2.name}` : 'רק במועדון 2', count: club2OnlyCount },
  ]

  return (
    <div className="space-y-6">
      {/* Club selectors */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { value: club1Id, onChange: setClub1Id, label: 'מועדון ראשון' },
          { value: club2Id, onChange: setClub2Id, label: 'מועדון שני' },
        ].map((selector, i) => {
          const selectedClub = activeClubs.find((c) => c.id === selector.value)
          return (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
              <label className="block text-xs font-semibold text-gray-500 mb-2">
                {selector.label}
              </label>
              <select
                value={selector.value}
                onChange={(e) => selector.onChange(e.target.value)}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                dir="rtl"
              >
                {activeClubs.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              {selectedClub && (
                <div className="mt-3">
                  <ClubBadge club={selectedClub} size="md" />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Tab buttons */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              tab === t.key
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-600'
            }`}
          >
            {t.label}
            <span
              className={`mr-1.5 text-xs font-bold ${tab === t.key ? 'text-blue-100' : 'text-gray-400'}`}
            >
              ({t.count})
            </span>
          </button>
        ))}
      </div>

      {/* Column headers (desktop only) */}
      {club1 && club2 && (
        <div className="hidden sm:grid grid-cols-[1fr_auto_auto] gap-4 items-center px-4 pb-1">
          <span className="text-xs font-semibold text-gray-500">מותג</span>
          <div className="text-center">
            <ClubBadge club={club1} size="md" />
          </div>
          <div className="text-center">
            <ClubBadge club={club2} size="md" />
          </div>
        </div>
      )}

      {/* Brand rows */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <span className="text-5xl mb-4 block">🤷</span>
            <p className="text-lg font-medium">אין מותגים בקטגוריה זו</p>
          </div>
        )}
        {filtered.map(({ brand, d1, d2 }) => {
          const catNames = brand.categories
            .map((id) => categories.find((c) => c.id === id)?.name)
            .filter((n): n is string => Boolean(n))

          return (
            <div
              key={brand.id}
              className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm"
            >
              {/* Mobile layout: stacked */}
              <div className="flex items-center gap-3 mb-3 sm:mb-0">
                <LogoImage logoUrl={brand.logoUrl} brandName={brand.name} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{brand.name}</p>
                  {catNames.length > 0 && (
                    <p className="text-xs text-gray-500 truncate">{catNames.join(' · ')}</p>
                  )}
                </div>
              </div>

              {/* Desktop: inline club columns | Mobile: stacked rows */}
              <div className="sm:grid sm:grid-cols-[1fr_auto_auto] sm:gap-4 sm:items-center">
                {/* Brand info already above on mobile */}
                <div className="hidden sm:block" />

                {/* Club 1 discount */}
                <div className="flex sm:flex-col items-center justify-between sm:justify-center gap-2 py-2 sm:py-0 border-t sm:border-t-0 border-gray-100 sm:w-28">
                  <span className="sm:hidden">
                    {club1 && <ClubBadge club={club1} />}
                  </span>
                  {d1 ? (
                    <DiscountBadge discount={d1} />
                  ) : (
                    <span className="text-sm text-gray-400">לא זמין</span>
                  )}
                </div>

                {/* Club 2 discount */}
                <div className="flex sm:flex-col items-center justify-between sm:justify-center gap-2 py-2 sm:py-0 border-t sm:border-t-0 border-gray-100 sm:w-28">
                  <span className="sm:hidden">
                    {club2 && <ClubBadge club={club2} />}
                  </span>
                  {d2 ? (
                    <DiscountBadge discount={d2} />
                  ) : (
                    <span className="text-sm text-gray-400">לא זמין</span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
