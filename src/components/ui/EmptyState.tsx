// Empty state shown when no brands match the current filters
interface EmptyStateProps {
  onClearFilters: () => void
}

export function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <span className="text-6xl mb-4" role="img" aria-label="אין תוצאות">
        🔍
      </span>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">לא נמצאו מותגים</h3>
      <p className="text-gray-500 mb-6 max-w-xs">
        לא נמצאו מותגים התואמים לחיפוש ולסינון שבחרת. נסה לשנות את הסינון.
      </p>
      <button
        onClick={onClearFilters}
        className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
      >
        נקה את הסינון
      </button>
    </div>
  )
}
