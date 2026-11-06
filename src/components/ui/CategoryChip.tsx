// Rounded pill chip for category filters with active/inactive states
import { Category } from '@/types'

interface CategoryChipProps {
  category: Category
  active: boolean
  onClick: () => void
}

export function CategoryChip({ category, active, onClick }: CategoryChipProps) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center rounded-full px-4 py-1.5 text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
        active
          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 scale-102'
          : 'bg-white text-zinc-700 border border-zinc-200/90 hover:border-zinc-300 hover:bg-zinc-50'
      }`}
    >
      {category.name}
    </button>
  )
}
