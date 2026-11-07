import Image from 'next/image'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="max-w-3xl mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center gap-3 text-xs text-[var(--muted)]">
        <Image src="/yeshyo-logo.jpeg" alt="" width={56} height={56} className="h-14 w-14" />
        יש יותר מועדונים
      </Link>
    </footer>
  )
}
