export interface CategoryGroup {
  id: string
  name: string
  ids: string[]
}

export const CATEGORY_GROUPS: CategoryGroup[] = [
  { id: 'fashion', name: 'ביגוד', ids: ['clothing', 'clothing-footwear'] },
  { id: 'children', name: 'ילדים', ids: ['children'] },
  { id: 'beauty', name: 'טיפוח', ids: ['beauty'] },
  { id: 'home', name: 'בית', ids: ['home', 'sleep-textile'] },
  { id: 'jewelry', name: 'תכשיטים', ids: ['jewelry'] },
  { id: 'leisure', name: 'פנאי', ids: ['gifts-leisure', 'sport', 'attractions'] },
  { id: 'electronics', name: 'חשמל', ids: ['electronics'] },
  { id: 'food', name: 'אוכל', ids: ['food'] },
  { id: 'travel', name: 'נופש', ids: ['tourism', 'travel-camping'] },
  { id: 'optics', name: 'אופטיקה', ids: ['optics'] },
  { id: 'more', name: 'עוד', ids: ['pets', 'education', 'judaica'] },
]

export const UNCATEGORIZED_ID = 'uncategorized'
export const UNCATEGORIZED_NAME = 'ללא קטגוריה'

const groupById = new Map(CATEGORY_GROUPS.map((group) => [group.id, group]))

export function groupName(id: string): string {
  return groupById.get(id)?.name ?? UNCATEGORIZED_NAME
}

export function brandInGroup(categoryIds: string[], groupId: string): boolean {
  const group = groupById.get(groupId)
  if (!group) return categoryIds.length === 0
  return categoryIds.some((id) => group.ids.includes(id))
}

export function primaryGroupId(categoryIds: string[]): string {
  const match = CATEGORY_GROUPS.find((group) => brandInGroup(categoryIds, group.id))
  return match?.id ?? UNCATEGORIZED_ID
}

export function sectionGroupId(categoryIds: string[], selectedGroupIds: string[]): string {
  const selected = selectedGroupIds.find((id) => brandInGroup(categoryIds, id))
  return selected ?? primaryGroupId(categoryIds)
}
