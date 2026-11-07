import type { ListingWithClub } from '@/types'

export function listingTags(listing: Pick<ListingWithClub, 'online'>): string[] {
  const tags: string[] = []
  if (listing.online) tags.push('אונליין')
  return tags
}

export function formatListingTags(tags: string[]): string {
  return tags.length > 0 ? `(${tags.join(', ')})` : ''
}
