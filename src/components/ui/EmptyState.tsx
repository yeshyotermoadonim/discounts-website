interface EmptyStateProps {
  onClearFilters: () => void
}

export function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div className="py-16 text-center">
      <p className="text-base font-medium">אין מותגים שמתאימים לסינון</p>
      <button type="button" onClick={onClearFilters} className="mt-4 min-h-11 text-sm underline underline-offset-4">
        איפוס
      </button>
    </div>
  )
}
