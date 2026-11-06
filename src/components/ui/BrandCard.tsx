import Link from 'next/link'
import { BrandWithDiscounts, Category } from '@/types'
import { LogoImage } from './LogoImage'

interface BrandCardProps {
  brand: BrandWithDiscounts
  categories: Category[]
}

export function BrandCard({ brand, categories }: BrandCardProps) {
  const maxPct = brand.bestDiscount

  // Map category ids to Hebrew names
  const catNames = brand.categories
    .map((id) => categories.find((c) => c.id === id)?.name)
    .filter((n): n is string => Boolean(n))

  const hasOnline = brand.discounts.some((d) => d.onlineRedemption === true)
  const hasMobile = brand.discounts.some((d) => d.mobileRedemption === true)

  return (
    <Link href={`/brands/${brand.id}`} className="group block focus:outline-none h-full">
      <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl border border-zinc-200/90 p-5 sm:p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_35px_-8px_rgba(99,102,241,0.12)] hover:border-indigo-400/80 hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full overflow-hidden">
        {/* Top ambient highlight gradient */}
        <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-l from-indigo-500 via-violet-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Card Header */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="group-hover:scale-105 transition-transform duration-300">
              <LogoImage logoUrl={brand.logoUrl} brandName={brand.name} size="md" />
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-black text-zinc-950 truncate tracking-tight group-hover:text-indigo-600 transition-colors">
                {brand.name}
              </h3>
              {catNames.length > 0 && (
                <p className="text-xs font-semibold text-zinc-400 truncate mt-0.5">
                  {catNames.join(' · ')}
                </p>
              )}
            </div>
          </div>

          {/* Top Max Discount Banner */}
          {maxPct !== null && (
            <div className="flex-shrink-0">
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-zinc-400 tracking-wider uppercase">
                  הנחה עד
                </span>
                <span className="text-2xl font-black bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent leading-none mt-0.5 tabular-nums">
                  {maxPct}%
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Club Breakdown Matrix */}
        <div className="flex-1 space-y-2 mb-5">
          {brand.discounts.map((d) => {
            const isHighest =
              d.discountPercentage !== null && d.discountPercentage === maxPct

            return (
              <div
                key={d.id}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl transition-all ${
                  isHighest
                    ? 'bg-emerald-50/80 border border-emerald-200/80 text-emerald-950 shadow-xs'
                    : 'bg-zinc-50/80 border border-zinc-100 text-zinc-700'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0 shadow-xs"
                    style={{ backgroundColor: d.club.color }}
                  />
                  <span className="text-xs font-black text-zinc-800 truncate">
                    {d.club.name}
                  </span>
                  {isHighest && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-600 text-white shadow-2xs">
                      <span>👑</span>
                      <span>המשתלם ביותר</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span
                    className={`text-sm font-black tabular-nums ${
                      isHighest ? 'text-emerald-700 font-black' : 'text-zinc-900 font-extrabold'
                    }`}
                  >
                    {d.discountPercentage !== null
                      ? `${d.discountPercentage}%`
                      : d.discountedPrice !== null
                      ? `₪${d.discountedPrice}`
                      : '—'}
                  </span>
                </div>
              </div>
            )
          })}

          {brand.discounts.length === 0 && (
            <div className="py-4 text-center text-xs text-zinc-400 bg-zinc-50 rounded-2xl font-medium">
              אין הנחות זמינות כרגע
            </div>
          )}
        </div>

        {/* Card Footer */}
        <div className="pt-3.5 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
          <div className="flex items-center gap-3">
            {hasOnline && (
              <span className="inline-flex items-center gap-1 font-bold text-zinc-600" title="מימוש באתר המותג">
                <svg className="w-3.5 h-3.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <span>אונליין</span>
              </span>
            )}
            {hasMobile && (
              <span className="inline-flex items-center gap-1 font-bold text-zinc-600" title="מימוש באפליקציה או בנייד">
                <svg className="w-3.5 h-3.5 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span>באפליקציה</span>
              </span>
            )}
          </div>

          <span className="inline-flex items-center gap-1 font-black text-indigo-600 group-hover:gap-2 transition-all">
            <span>לכל ההטבות</span>
            <span aria-hidden="true" className="group-hover:-translate-x-0.5 transition-transform">&larr;</span>
          </span>
        </div>
      </div>
    </Link>
  )
}
