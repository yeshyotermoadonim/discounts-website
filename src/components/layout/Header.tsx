import Link from 'next/link'
import Image from 'next/image'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--bg)]">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center h-14">
          <Link href="/" className="flex items-center gap-2 min-w-0">
            <Image src="/yeshyo-logo.jpeg" alt="" width={36} height={36} className="h-9 w-9 shrink-0" />
            <span className="truncate text-[15px] font-semibold">יש יותר מועדונים</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
