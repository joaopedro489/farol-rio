import { SummaryOutput } from '../../domain/outputs/summary.output'

type SummaryModelConstructor = {
  total: number
  reviewed: number
}

export class SummaryModel {
  static toOutput(prisma: SummaryModelConstructor): SummaryOutput {
    return new SummaryOutput({
      total: prisma.total,
      reviewed: prisma.reviewed,
      pending: prisma.total - prisma.reviewed,
    })
  }
}
