import Link from 'next/link'

export function Footer() {
  return (
    <footer className="mt-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-10">
        <div className="rounded-3xl bg-[#12151c] text-white px-6 py-8 sm:px-8 flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold">יש יותר מועדונים</p>
            <p className="mt-1 text-xs text-white/60">חבר שלי · בהצדעה · ביימי אול</p>
          </div>
          <div className="flex gap-5 text-sm text-white/80">
            <Link href="/" className="hover:text-white">מותגים</Link>
            <Link href="/gaps" className="hover:text-white">פערים</Link>
            <Link href="/clubs" className="hover:text-white">מועדונים</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
