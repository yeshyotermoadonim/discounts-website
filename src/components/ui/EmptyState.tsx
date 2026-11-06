interface EmptyStateProps {
  onClearFilters: () => void
}

export function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div className="py-16 text-center">
      <p className="text-base font-medium">אין מותגים שמתאימים לסינון</p>
      <button type="button" onClick={onClearFilters} className="mt-4 rounded-full bg-[#12151c] px-4 py-2 text-sm text-white">
        איפוס
      </button>
    </div>
  )
}
