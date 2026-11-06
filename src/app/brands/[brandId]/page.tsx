import { getDataStore, getBrandsWithDiscounts } from '@/lib/data'
import { LogoImage } from '@/components/ui/LogoImage'
import { DiscountBadge } from '@/components/ui/DiscountBadge'
import { ClubBadge } from '@/components/ui/ClubBadge'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

interface BrandPageProps {
  params: Promise<{ brandId: string }>
}

export async function generateStaticParams() {
  const store = await getDataStore()
  return store.brands.map((brand) => ({
    brandId: brand.id,
  }))
}

export async function generateMetadata({ params }: BrandPageProps): Promise<Metadata> {
  const { brandId } = await params
  const store = await getDataStore()
  const brand = store.brands.find((b) => b.id === brandId)

  if (!brand) {
    return { title: 'מותג לא נמצא' }
  }

  return {
    title: `הנחות ומבצעים ב-${brand.name} | יש יותר מועדונים`,
    description: `השוואת הנחות והטבות עבור ${brand.name} בכל מועדוני הצרכנות בישראל.`,
  }
}

export const dynamic = 'force-static'
export const revalidate = 3600

export default async function BrandDetailPage({ params }: BrandPageProps) {
  const { brandId } = await params
  const store = await getDataStore()
  const brandsWithDiscounts = await getBrandsWithDiscounts(store)
  const brand = brandsWithDiscounts.find((b) => b.id === brandId)

  if (!brand) {
    notFound()
  }

  const categoryNames = brand.categories
    .map((catId) => store.categories.find((c) => c.id === catId)?.name)
    .filter((n): n is string => Boolean(n))

  const maxDiscount = brand.bestDiscount

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs font-bold text-zinc-400 mb-6">
        <Link href="/" className="hover:text-zinc-950 transition-colors">בית</Link>
        <span>/</span>
        <span className="text-zinc-950">{brand.name}</span>
      </nav>

      {/* Brand Header */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-zinc-200/90 p-6 sm:p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)] mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-right">
          <div className="shadow-sm rounded-2xl">
            <LogoImage logoUrl={brand.logoUrl} brandName={brand.name} size="lg" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl sm:text-5xl font-black text-zinc-950 mb-3 tracking-tight">
              {brand.name}
            </h1>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-4">
              {categoryNames.map((name) => (
                <span
                  key={name}
                  className="px-3.5 py-1 rounded-full text-xs font-bold bg-zinc-100 text-zinc-700"
                >
                  {name}
                </span>
              ))}
            </div>
            {brand.bestDiscount !== null && (
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-emerald-50/90 border border-emerald-200/80 text-emerald-950 shadow-2xs">
                <span className="text-xs font-bold">הנחה מרבית זמינה:</span>
                <span className="font-black text-emerald-600 text-xl tabular-nums">
                  {brand.bestDiscount}%
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Club Discounts Section */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-zinc-200/90 p-6 sm:p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)] mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-zinc-950">
            הנחות זמינות לפי מועדון ({brand.discounts.length})
          </h2>
          <span className="text-xs font-semibold text-zinc-400">מעודכן לשימוש מיידי</span>
        </div>

        {brand.discounts.length === 0 ? (
          <p className="text-zinc-400 text-center py-10 text-sm font-semibold">
            כרגע אין הנחות זמינות עבור מותג זה
          </p>
        ) : (
          <div className="space-y-4">
            {brand.discounts.map((discount) => {
              const isBest =
                discount.discountPercentage !== null &&
                discount.discountPercentage === maxDiscount

              return (
                <div
                  key={discount.id}
                  className={`p-6 rounded-2xl border transition-all ${
                    isBest
                      ? 'border-emerald-200 bg-emerald-50/60 shadow-sm'
                      : 'border-zinc-100 bg-zinc-50/80'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <ClubBadge club={discount.club} size="md" />
                      {isBest && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-black px-3 py-1 rounded-full bg-emerald-600 text-white shadow-2xs">
                          <span>👑</span>
                          <span>ההנחה הגבוהה ביותר</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      <DiscountBadge discount={discount} highlight={isBest} size="lg" />
                    </div>
                  </div>

                  {/* Additional offer details */}
                  <div className="mt-4 pt-3.5 border-t border-zinc-200/60 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-600">
                    <div className="flex items-center gap-2 font-bold">
                      <span className="text-zinc-400">מימוש אונליין:</span>
                      <span>
                        {discount.onlineRedemption === true
                          ? '✅ זמין באתר המותג'
                          : discount.onlineRedemption === false
                          ? '❌ לא זמין'
                          : '❓ לא צוין'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 font-bold">
                      <span className="text-zinc-400">מימוש באפליקציה:</span>
                      <span>
                        {discount.mobileRedemption === true
                          ? '✅ זמין במובייל'
                          : discount.mobileRedemption === false
                          ? '❌ לא זמין'
                          : '❓ לא צוין'}
                      </span>
                    </div>
                  </div>

                  {discount.redemptionUrl && (
                    <div className="mt-4">
                      <a
                        href={discount.redemptionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-black text-indigo-600 hover:text-indigo-700"
                      >
                        <span>מעבר למימוש ההטבה באתר המועדון</span>
                        <span aria-hidden="true">&larr;</span>
                      </a>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Back button */}
      <div className="text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-800 font-extrabold text-xs transition-all shadow-xs hover:scale-102"
        >
          <span aria-hidden="true">&rarr;</span>
          <span>חזרה לכל המותגים</span>
        </Link>
      </div>
    </div>
  )
}
