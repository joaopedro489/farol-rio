import { BrowseChildItem, BrowseChildItemConstructor } from './browse-child-item.model'

export class BrowseChildren {
  public readonly items: BrowseChildItem[]
  public readonly total: number
  public readonly offset: number
  public readonly limit: number

  constructor({
    items,
    total,
    offset,
    limit
  }: {
    items: BrowseChildItemConstructor[]
    total: number
    offset: number
    limit: number
  }) {
    this.items = items.map((item) => new BrowseChildItem(item))
    this.total = total
    this.offset = offset
    this.limit = limit
  }

  get neighborhoods() {
    const neighborhoodsSet = new Set<string>()
    this.items.forEach((item) => {
      if (item.neighborhood) {
        neighborhoodsSet.add(item.neighborhood)
      }
    })
    return Array.from(neighborhoodsSet)
  }
}
