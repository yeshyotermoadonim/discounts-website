'use client'

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
      .filter((row) => row.d1 || row.d2)
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
    <div className="space-y-8">
      {/* Club Selector Deck */}
      <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl border border-zinc-200/90 p-6 sm:p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* Club 1 */}
          <div className="space-y-2.5">
            <label className="block text-xs font-black text-zinc-600 uppercase tracking-wider">
              מועדון ראשון
            </label>
            <div className="relative">
              <select
                value={club1Id}
                onChange={(e) => setClub1Id(e.target.value)}
                className="w-full text-sm font-bold text-zinc-950 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200/90 rounded-2xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer appearance-none pl-10 transition-colors"
                dir="rtl"
              >
                {activeClubs.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.nameEn})
                  </option>
                ))}
              </select>
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {club1 && (
              <div className="pt-1">
                <ClubBadge club={club1} size="md" />
              </div>
            )}
          </div>

          {/* Club 2 */}
          <div className="space-y-2.5">
            <label className="block text-xs font-black text-zinc-600 uppercase tracking-wider">
              מועדון שני
            </label>
            <div className="relative">
              <select
                value={club2Id}
                onChange={(e) => setClub2Id(e.target.value)}
                className="w-full text-sm font-bold text-zinc-950 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200/90 rounded-2xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer appearance-none pl-10 transition-colors"
                dir="rtl"
              >
                {activeClubs.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.nameEn})
                  </option>
                ))}
              </select>
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {club2 && (
              <div className="pt-1">
                <ClubBadge club={club2} size="md" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Segmented Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-5 py-2.5 rounded-full text-xs font-extrabold transition-all duration-200 cursor-pointer ${
              tab === t.key
                ? 'bg-zinc-950 text-white shadow-md shadow-zinc-950/15 scale-102'
                : 'bg-white border border-zinc-200/90 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50'
            }`}
          >
            {t.label}
            <span
              className={`mr-1.5 text-[11px] font-black ${
                tab === t.key ? 'text-zinc-400' : 'text-zinc-400'
              }`}
            >
              ({t.count})
            </span>
          </button>
        ))}
      </div>

      {/* Brand Comparison List */}
      <div className="space-y-4">
        {filtered.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-zinc-200 text-zinc-500">
            <span className="text-4xl mb-3 block">🔍</span>
            <p className="text-base font-black text-zinc-800">אין מותגים התואמים לחיתוך זה</p>
          </div>
        )}

        {filtered.map(({ brand, d1, d2 }) => {
          const catNames = brand.categories
            .map((id) => categories.find((c) => c.id === id)?.name)
            .filter((n): n is string => Boolean(n))

          const p1 = d1?.discountPercentage ?? -1
          const p2 = d2?.discountPercentage ?? -1

          const club1Wins = p1 > p2 && p2 !== -1
          const club2Wins = p2 > p1 && p1 !== -1
          const isTie = p1 === p2 && p1 > 0

          return (
            <div
              key={brand.id}
              className="bg-white/95 backdrop-blur-xl rounded-3xl border border-zinc-200/90 p-5 sm:p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:border-indigo-300/80 transition-all duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Brand Info */}
                <div className="flex items-center gap-3.5">
                  <LogoImage logoUrl={brand.logoUrl} brandName={brand.name} size="sm" />
                  <div>
                    <h3 className="text-base font-black text-zinc-950 truncate">
                      {brand.name}
                    </h3>
                    {catNames.length > 0 && (
                      <p className="text-xs font-semibold text-zinc-400 mt-0.5 truncate">
                        {catNames.join(' · ')}
                      </p>
                    )}
                  </div>
                </div>

                {/* Compare Blocks */}
                <div className="grid grid-cols-2 sm:flex sm:items-center gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-zinc-100">
                  {/* Club 1 Box */}
                  <div className={`p-3.5 rounded-2xl border text-center sm:w-40 transition-colors ${
                    club1Wins
                      ? 'bg-emerald-50/90 border-emerald-300/80 shadow-xs'
                      : 'bg-zinc-50/80 border-zinc-200/60'
                  }`}>
                    <span className="block text-[11px] font-black text-zinc-600 mb-1">
                      {club1?.name}
                    </span>
                    {d1 ? (
                      <div className="flex items-center justify-center gap-1.5">
                        <DiscountBadge discount={d1} highlight={club1Wins} />
                        {club1Wins && <span className="text-xs">👑</span>}
                      </div>
                    ) : (
                      <span className="text-xs font-bold text-zinc-400">לא זמין</span>
                    )}
                  </div>

                  {/* Club 2 Box */}
                  <div className={`p-3.5 rounded-2xl border text-center sm:w-40 transition-colors ${
                    club2Wins
                      ? 'bg-emerald-50/90 border-emerald-300/80 shadow-xs'
                      : 'bg-zinc-50/80 border-zinc-200/60'
                  }`}>
                    <span className="block text-[11px] font-black text-zinc-600 mb-1">
                      {club2?.name}
                    </span>
                    {d2 ? (
                      <div className="flex items-center justify-center gap-1.5">
                        <DiscountBadge discount={d2} highlight={club2Wins} />
                        {club2Wins && <span className="text-xs">👑</span>}
                      </div>
                    ) : (
                      <span className="text-xs font-bold text-zinc-400">לא זמין</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Difference highlight footer */}
              {(club1Wins || club2Wins || isTie) && (
                <div className="mt-3.5 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs">
                  {club1Wins && (
                    <span className="font-black text-emerald-700 inline-flex items-center gap-1.5">
                      <span>⚡</span>
                      <span>{club1?.name} משתלם יותר ב-{(p1 - p2)}%</span>
                    </span>
                  )}
                  {club2Wins && (
                    <span className="font-black text-emerald-700 inline-flex items-center gap-1.5">
                      <span>⚡</span>
                      <span>{club2?.name} משתלם יותר ב-{(p2 - p1)}%</span>
                    </span>
                  )}
                  {isTie && (
                    <span className="font-bold text-zinc-500">
                      הנחה זהה בשני המועדונים ({p1}%)
                    </span>
                  )}

                  <a
                    href={`/brands/${brand.id}`}
                    className="font-black text-indigo-600 hover:text-indigo-700 mr-auto flex items-center gap-1"
                  >
                    <span>לכל הפרטים</span>
                    <span>&larr;</span>
                  </a>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
