import { getDataStore, getBrandsWithListings } from '@/lib/data'
import { GapView } from '@/components/gaps/GapView'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'פערים | יש יותר מועדונים',
  description: 'מותגים שקיימים במועדון אחד ולא בשני.',
}

export const dynamic = 'force-static'
export const revalidate = 3600

export default async function GapsPage() {
  const store = await getDataStore()
  const brands = await getBrandsWithListings(store)

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">פערים</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">מותג שקיים במועדון אחד ולא בשני.</p>
      <div className="mt-8">
        <GapView brands={brands} clubs={store.clubs} />
      </div>
    </div>
  )
}
