import { Club } from '@/types'

interface ClubBadgeProps {
  club: Club
  size?: 'sm' | 'md' | 'lg'
}

export function ClubBadge({ club, size = 'sm' }: ClubBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2.5 py-0.5 gap-1.5',
    md: 'text-xs px-3 py-1 gap-2 font-medium',
    lg: 'text-sm px-4 py-1.5 gap-2 font-semibold',
  }

  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold bg-white border border-zinc-200/80 text-zinc-800 shadow-2xs ${sizeClasses[size]}`}
    >
      <span
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ backgroundColor: club.color }}
      />
      <span>{club.name}</span>
    </span>
  )
}
