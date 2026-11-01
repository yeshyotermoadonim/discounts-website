interface EmptyStateProps {
  onClearFilters: () => void
}

export function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-3xl border border-dashed border-zinc-200">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4 shadow-xs">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </div>

      <h3 className="text-xl font-black text-zinc-950 mb-1">
        לא מצאנו מותגים תואמים
      </h3>
      <p className="text-sm text-zinc-500 mb-6 max-w-sm leading-relaxed">
        נסו להרחיב את החיפוש, להסיר חלק מהסינונים או לבדוק איות שונה של המותג.
      </p>

      <button
        onClick={onClearFilters}
        className="px-5 py-2.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-bold transition-all shadow-md shadow-zinc-950/10 cursor-pointer hover:scale-102"
      >
        איפוס כל הסינונים
      </button>
    </div>
  )
}
