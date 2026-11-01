// Small pill badge showing a club name with its brand color
import { Club } from '@/types'

interface ClubBadgeProps {
  club: Club
  size?: 'sm' | 'md' | 'lg'
}

export function ClubBadge({ club, size = 'sm' }: ClubBadgeProps) {
  const sizeClass =
    size === 'lg'
      ? 'px-4 py-1.5 text-base font-bold'
      : size === 'md'
      ? 'px-3 py-1 text-sm font-semibold'
      : 'px-2 py-0.5 text-xs font-medium'

  return (
    <span
      className={`inline-flex items-center rounded-full shadow-xs ${sizeClass} text-white`}
      style={{ backgroundColor: club.color }}
    >
      {club.name}
    </span>
  )
}
