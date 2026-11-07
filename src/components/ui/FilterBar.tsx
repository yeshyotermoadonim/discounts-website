'use client'

import { useState } from 'react'
import { Club, FilterState } from '@/types'
import { CATEGORY_GROUPS } from '@/lib/groups'

interface FilterBarProps {
  clubs: Club[]
  filters: FilterState
  preserveClubIds?: string[]
  showClubs?: boolean
  onFilterChange: (filters: FilterState) => void
}

export function FilterBar({
  clubs,
  filters,
  preserveClubIds = [],
  showClubs = true,
  onFilterChange,
}: FilterBarProps) {
  const [hideOpen, setHideOpen] = useState(false)

  const toggleClub = (clubId: string) => {
    const active = filters.clubIds.includes(clubId)
    onFilterChange({
      ...filters,
      clubIds: active ? filters.clubIds.filter((id) => id !== clubId) : [...filters.clubIds, clubId],
      excludeClubIds: active
        ? filters.excludeClubIds
        : filters.excludeClubIds.filter((id) => id !== clubId),
    })
  }

  const toggleExclude = (clubId: string) => {
    const active = filters.excludeClubIds.includes(clubId)
    onFilterChange({
      ...filters,
      excludeClubIds: active
        ? filters.excludeClubIds.filter((id) => id !== clubId)
        : [...filters.excludeClubIds, clubId],
      clubIds: active ? filters.clubIds : filters.clubIds.filter((id) => id !== clubId),
    })
  }

  const toggleCategory = (groupId: string) => {
    const next = filters.categoryIds.includes(groupId)
      ? filters.categoryIds.filter((id) => id !== groupId)
      : [...filters.categoryIds, groupId]
    onFilterChange({ ...filters, categoryIds: next })
  }

  const hasFilters =
    filters.clubIds.length > preserveClubIds.length ||
    filters.excludeClubIds.length > 0 ||
    filters.categoryIds.length > 0 ||
    filters.onlineOnly ||
    filters.search.trim().length > 0

  return (
    <div className="space-y-3">
      {showClubs && (
        <>
          <ClubChoices clubs={clubs} selected={filters.clubIds} onToggle={toggleClub} />
          <button
            type="button"
            aria-expanded={hideOpen}
            onClick={() => setHideOpen((open) => !open)}
            className={`min-h-11 text-[13px] ${
              hideOpen || filters.excludeClubIds.length > 0
                ? 'text-[var(--ink)] font-medium underline underline-offset-4'
                : 'text-[var(--muted)]'
            }`}
          >
            הסתר מועדונים
          </button>
          {hideOpen && (
            <div>
              <p className="mb-2 text-[12px] text-[var(--muted)]">הסתר מותגים שקיימים ב</p>
              <ClubChoices
                clubs={clubs}
                selected={filters.excludeClubIds}
                onToggle={toggleExclude}
                struck
              />
            </div>
          )}
        </>
      )}

      <div className="flex flex-wrap gap-x-3 gap-y-2">
        {CATEGORY_GROUPS.map((group) => {
          const active = filters.categoryIds.includes(group.id)
          return (
            <button
              key={group.id}
              type="button"
              onClick={() => toggleCategory(group.id)}
              className={`min-h-11 text-[13px] ${
                active ? 'text-[var(--ink)] underline underline-offset-4 font-medium' : 'text-[var(--muted)]'
              }`}
            >
              {group.name}
            </button>
          )
        })}
        {hasFilters && (
          <button
            type="button"
            onClick={() =>
              onFilterChange({
                search: '',
                clubIds: preserveClubIds,
                excludeClubIds: [],
                categoryIds: [],
                onlineOnly: false,
              })
            }
            className="min-h-11 text-[13px] text-[var(--ink)]"
          >
            איפוס
          </button>
        )}
      </div>
    </div>
  )
}

function ClubChoices({
  clubs,
  selected,
  onToggle,
  struck = false,
}: {
  clubs: Club[]
  selected: string[]
  onToggle: (clubId: string) => void
  struck?: boolean
}) {
  return (
    <div className="flex flex-wrap gap-px border border-[var(--line)] bg-[var(--line)]">
      {clubs.map((club) => {
        const active = selected.includes(club.id)
        return (
          <button
            key={club.id}
            type="button"
            aria-pressed={active}
            onClick={() => onToggle(club.id)}
            className={`min-h-11 min-w-24 flex-1 bg-[var(--paper)] px-2 text-[13px] ${
              active && struck ? 'text-[var(--muted)] line-through' : ''
            }`}
            style={active ? { boxShadow: `inset 0 -2px 0 ${club.color}`, fontWeight: struck ? 500 : 600 } : undefined}
          >
            {club.name}
          </button>
        )
      })}
    </div>
  )
}
