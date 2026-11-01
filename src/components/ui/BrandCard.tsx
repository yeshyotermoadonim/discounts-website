// Brand card component - the main UI element of the marketplace
import Link from 'next/link'
import { BrandWithDiscounts, Category } from '@/types'
import { LogoImage } from './LogoImage'
import { DiscountBadge } from './DiscountBadge'
import { ClubBadge } from './ClubBadge'

interface BrandCardProps {
  brand: BrandWithDiscounts
  categories: Category[]
}

export function BrandCard({ brand, categories }: BrandCardProps) {
  // Find the highest discount to highlight it
  const maxPct = brand.bestDiscount

  // Map category ids to names
  const catNames = brand.categories
    .map((id) => categories.find((c) => c.id === id)?.name)
    .filter((n): n is string => Boolean(n))

  // Check if any discount has online or mobile redemption
  const hasOnline = brand.discounts.some((d) => d.onlineRedemption === true)
  const hasMobile = brand.discounts.some((d) => d.mobileRedemption === true)

  return (
    <Link href={`/brands/${brand.id}`} className="block group">
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-200 group-hover:-translate-y-0.5 h-full flex flex-col">
        {/* Header: logo + name + categories */}
        <div className="flex items-start gap-3 mb-4">
          <LogoImage logoUrl={brand.logoUrl} brandName={brand.name} size="md" />
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-gray-900 truncate">{brand.name}</h3>
            {catNames.length > 0 && (
              <p className="text-xs text-gray-500 mt-0.5 truncate">{catNames.join(' · ')}</p>
            )}
          </div>
        </div>

        {/* Discount rows per club */}
        <div className="flex-1 space-y-2 mb-3">
          {brand.discounts.map((d) => {
            const isHighest =
              d.discountPercentage !== null && d.discountPercentage === maxPct
            return (
              <div
                key={d.id}
                className={`flex items-center justify-between gap-2 rounded-xl px-3 py-2 ${
                  isHighest ? 'bg-green-50 border border-green-100' : 'bg-gray-50'
                }`}
              >
                <ClubBadge club={d.club} />
                <DiscountBadge discount={d} highlight={isHighest} />
              </div>
            )
          })}
          {brand.discounts.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-2">אין הנחות זמינות</p>
          )}
        </div>

        {/* Footer: redemption icons */}
        {(hasOnline || hasMobile) && (
          <div className="flex items-center gap-3 pt-2 border-t border-gray-100 text-xs text-gray-500">
            {hasOnline && (
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                מימוש אונליין
              </span>
            )}
            {hasMobile && (
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                מימוש במובייל
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}
