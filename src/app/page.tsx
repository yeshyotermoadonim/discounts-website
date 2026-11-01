import { getDataStore, getBrandsWithDiscounts } from '@/lib/data'
import { BrandGrid } from '@/components/BrandGrid'

export const dynamic = 'force-static'
export const revalidate = 3600

export default async function HomePage() {
  const store = await getDataStore()
  const brandsWithDiscounts = await getBrandsWithDiscounts(store)

  return (
    <div className="relative overflow-hidden">
      {/* Background ambient radial glow */}
      <div className="absolute top-0 right-1/2 translate-x-1/2 -z-10 w-[1000px] h-[500px] bg-gradient-to-b from-indigo-100/60 via-violet-50/40 to-transparent blur-3xl opacity-70 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Futuristic Hero Section */}
        <section className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          {/* Live Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-zinc-200/80 shadow-xs text-xs font-bold text-zinc-800 mb-6 backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>השוואת מועדוני צרכנות בלייב</span>
            <span className="text-zinc-300">|</span>
            <span className="text-indigo-600 font-extrabold">חבר שלי · בהצדעה · ביימי</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-zinc-950 tracking-tight leading-[1.15] mb-5">
            למה לשלם מחיר מלא <br className="hidden sm:block" />
            כשאתם <span className="bg-gradient-to-l from-indigo-600 via-indigo-500 to-violet-600 bg-clip-text text-transparent">במועדון?</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
            מנוע השוואה מתקדם שמאתר ומציג היכן ההנחה המשתלמת ביותר עבור המותגים שאתם אוהבים. השוו תוך שניות וחסכו בכל רכישה.
          </p>

          {/* Value props pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-zinc-600">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-zinc-200/80 shadow-2xs">
              <span>⚡</span>
              <span>השוואה מהירה</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-zinc-200/80 shadow-2xs">
              <span>👑</span>
              <span>עד 20% הנחה</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-zinc-200/80 shadow-2xs">
              <span>🔒</span>
              <span>חינם לחלוטין וללא הרשמה</span>
            </div>
          </div>
        </section>

        {/* Main interactive grid */}
        <BrandGrid
          brands={brandsWithDiscounts}
          clubs={store.clubs}
          categories={store.categories}
        />
      </div>
    </div>
  )
}
