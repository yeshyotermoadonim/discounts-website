// Badge showing the discount amount for a brand+club combination
import { Discount } from '@/types'

interface DiscountBadgeProps {
  discount: Discount
  highlight?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function DiscountBadge({ discount, highlight = false, size = 'md' }: DiscountBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: highlight ? 'text-base px-3 py-1 font-bold' : 'text-sm px-2.5 py-0.5 font-semibold',
    lg: 'text-lg px-4 py-1.5 font-black',
  }

  if (discount.type === 'percentage' && discount.discountPercentage !== null) {
    const pct = discount.discountPercentage
    // Color based on discount level
    const colorClass =
      pct >= 20
        ? highlight
          ? 'bg-green-600 text-white'
          : 'bg-green-100 text-green-800'
        : pct >= 15
          ? highlight
            ? 'bg-yellow-500 text-white'
            : 'bg-yellow-100 text-yellow-800'
          : highlight
            ? 'bg-gray-600 text-white'
            : 'bg-gray-100 text-gray-700'

    return (
      <span
        className={`inline-flex items-center rounded-full tabular-nums shadow-xs ${sizeClasses[size]} ${colorClass}`}
      >
        {pct}%
      </span>
    )
  }

  if (discount.type === 'fixed-price' && discount.discountedPrice !== null) {
    return (
      <span
        className={`inline-flex items-center rounded-full font-semibold shadow-xs ${sizeClasses[size]} ${
          highlight ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'
        }`}
      >
        ₪{discount.discountedPrice}
      </span>
    )
  }

  return null
}
