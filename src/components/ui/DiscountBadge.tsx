import { Discount } from '@/types'

interface DiscountBadgeProps {
  discount: Discount
  highlight?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function DiscountBadge({ discount, highlight = false, size = 'md' }: DiscountBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 font-bold',
    md: 'text-sm px-2.5 py-0.5 font-extrabold',
    lg: 'text-base sm:text-lg px-3.5 py-1 font-black',
  }

  if (discount.type === 'percentage' && discount.discountPercentage !== null) {
    const pct = discount.discountPercentage

    if (highlight) {
      return (
        <span
          className={`inline-flex items-center gap-1 rounded-full tabular-nums text-white bg-gradient-to-r from-emerald-600 to-teal-500 shadow-sm shadow-emerald-500/20 ${sizeClasses[size]}`}
        >
          <svg className="w-3 h-3 text-emerald-200 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
          </svg>
          <span>{pct}%</span>
        </span>
      )
    }

    return (
      <span
        className={`inline-flex items-center rounded-full tabular-nums bg-zinc-100 text-zinc-700 border border-zinc-200/80 ${sizeClasses[size]}`}
      >
        {pct}%
      </span>
    )
  }

  if (discount.type === 'fixed-price' && discount.discountedPrice !== null) {
    return (
      <span
        className={`inline-flex items-center rounded-full font-bold tabular-nums ${
          highlight
            ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm shadow-indigo-500/20'
            : 'bg-zinc-100 text-zinc-800 border border-zinc-200'
        } ${sizeClasses[size]}`}
      >
        ₪{discount.discountedPrice}
      </span>
    )
  }

  return null
}
