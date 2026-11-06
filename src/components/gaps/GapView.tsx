'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { BrandWithListings, Club } from '@/types'

interface GapViewProps {
  brands: BrandWithListings[]
  clubs: Club[]
}

const PAGE = 40

function listingFor(brand: BrandWithListings, clubId: string) {
  return brand.listings.find((listing) => listing.clubId === clubId)
}

export function GapView({ brands, clubs }: GapViewProps) {
  const [leftId, setLeftId] = useState(clubs[0]?.id ?? '')
  const [rightId, setRightId] = useState(clubs[1]?.id ?? clubs[0]?.id ?? '')
  const [visible, setVisible] = useState(PAGE)

  const left = clubs.find((club) => club.id === leftId) ?? clubs[0]
  const right = clubs.find((club) => club.id === rightId) ?? clubs[1] ?? clubs[0]

  const split = useMemo(() => {
    const onlyLeft: BrandWithListings[] = []
    const onlyRight: BrandWithListings[] = []
    let shared = 0
    for (const brand of brands) {
      const inLeft = Boolean(listingFor(brand, left.id))
      const inRight = Boolean(listingFor(brand, right.id))
      if (inLeft && inRight) shared += 1
      else if (inLeft) onlyLeft.push(brand)
      else if (inRight) onlyRight.push(brand)
    }
    const byName = (a: BrandWithListings, b: BrandWithListings) => a.name.localeCompare(b.name, 'he')
    onlyLeft.sort(byName)
    onlyRight.sort(byName)
    return { onlyLeft, onlyRight, shared }
  }, [brands, left.id, right.id])

  const sameClub = left.id === right.id

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-3 items-end">
        <ClubSelect label="מועדון ראשון" clubs={clubs} value={left.id} onChange={(id) => { setLeftId(id); setVisible(PAGE) }} />
        <p className="hidden sm:block pb-3 text-sm text-[var(--muted)]">מול</p>
        <ClubSelect label="מועדון שני" clubs={clubs} value={right.id} onChange={(id) => { setRightId(id); setVisible(PAGE) }} />
      </div>

      {sameClub ? (
        <p className="rounded-2xl bg-white border border-[var(--line)] px-5 py-8 text-center text-sm">
          בחרו שני מועדונים שונים.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-3">
            <Stat value={split.onlyLeft.length} label={`רק ב${left.name}`} color={left.color} />
            <Stat value={split.shared} label="בשניהם" color="#12151c" />
            <Stat value={split.onlyRight.length} label={`רק ב${right.name}`} color={right.color} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Column club={left} brands={split.onlyLeft.slice(0, visible)} total={split.onlyLeft.length} />
            <Column club={right} brands={split.onlyRight.slice(0, visible)} total={split.onlyRight.length} />
          </div>

          {(visible < split.onlyLeft.length || visible < split.onlyRight.length) && (
            <button
              type="button"
              onClick={() => setVisible((count) => count + PAGE)}
              className="block mx-auto rounded-full bg-[#12151c] px-5 py-2.5 text-sm text-white"
            >
              עוד מותגים
            </button>
          )}
        </>
      )}
    </div>
  )
}

function ClubSelect({
  label,
  clubs,
  value,
  onChange,
}: {
  label: string
  clubs: Club[]
  value: string
  onChange: (id: string) => void
}) {
  return (
    <label className="block">
      <span className="block text-xs text-[var(--muted)] mb-2">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm font-medium shadow-[0_8px_24px_rgba(18,21,28,0.05)] focus:outline-none"
      >
        {clubs.map((club) => (
          <option key={club.id} value={club.id}>
            {club.name}
          </option>
        ))}
      </select>
    </label>
  )
}

function Stat({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div className="rounded-2xl bg-white border border-[var(--line)] px-4 py-4">
      <p className="text-2xl font-semibold" style={{ color }}>{value}</p>
      <p className="mt-1 text-xs text-[var(--muted)]">{label}</p>
    </div>
  )
}

function Column({
  club,
  brands,
  total,
}: {
  club: Club
  brands: BrandWithListings[]
  total: number
}) {
  return (
    <section className="rounded-3xl border border-[var(--line)] bg-white overflow-hidden">
      <header className="px-5 py-4 flex items-center justify-between" style={{ backgroundColor: `${club.color}14` }}>
        <h2 className="font-semibold">רק ב{club.name}</h2>
        <span className="text-sm text-[var(--muted)]">{total}</span>
      </header>
      {brands.length === 0 ? (
        <p className="px-5 py-8 text-sm text-[var(--muted)]">אין מותגים שקיימים רק כאן.</p>
      ) : (
        <ul>
          {brands.map((brand) => {
            const listing = listingFor(brand, club.id)
            return (
              <li key={brand.id} className="border-t border-[var(--line)]">
                <Link href={`/brands/${brand.id}`} className="flex items-center justify-between gap-3 px-5 py-3 hover:bg-[#f6f8fc]">
                  <span className="text-sm font-medium truncate">{brand.name}</span>
                  {listing?.online && (
                    <span className="flex-shrink-0 rounded-full bg-[#12151c] px-2 py-0.5 text-[11px] text-white">
                      אונליין
                    </span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
