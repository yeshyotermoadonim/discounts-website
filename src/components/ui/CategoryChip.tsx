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
      className={`inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-all ${
        active
          ? 'bg-blue-600 text-white shadow-sm'
          : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-400 hover:text-blue-600'
      }`}
    >
      {category.name}
    </button>
  )
}
