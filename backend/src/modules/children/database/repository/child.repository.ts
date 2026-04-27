import { Child } from '../../domain/entities/child.entity'
import { BrowseChildrenOutput } from '../../domain/outputs/browse-children.output'
import { AlertTypeEnum } from '../../domain/types/enum/alert-type.enum'
import { ReviewStatusEnum } from '../../domain/types/enum/review-status.enum'

export type BrowseChildrenParams = {
  offset: number
  limit: number
  name?: string
  neighborhood?: string[]
  type?: AlertTypeEnum[]
  statusReview?: ReviewStatusEnum
}

export interface ChildRepository {
  browse(params: BrowseChildrenParams): Promise<BrowseChildrenOutput>
  findById(id: string): Promise<Child | null>
  edit(child: Child): Promise<void>
  listNeighborhoods(): Promise<string[]>
}
