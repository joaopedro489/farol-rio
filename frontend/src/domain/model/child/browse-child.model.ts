export interface BrowseChildItem {
  id: string
  name: string
  birthday: Date
  neighborhood: string
  isHealthWithAlert: boolean
  isEducationWithAlert: boolean
  isAssistanceWithAlert: boolean
  status: boolean
}

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
    items: BrowseChildItem[]
    total: number
    offset: number
    limit: number
  }) {
    this.items = items
    this.total = total
    this.offset = offset
    this.limit = limit
  }
}
