import { ChildrenOutput } from './children.output'

type BrowseChildrenOutputConstructor = {
  items: ChildrenOutput[]
  total: number
  offset: number
  limit: number
}

export class BrowseChildrenOutput {
  items: ChildrenOutput[]
  total: number
  offset: number
  limit: number

  constructor(params: BrowseChildrenOutputConstructor) {
    this.items = params.items
    this.total = params.total
    this.offset = params.offset
    this.limit = params.limit
  }
}
