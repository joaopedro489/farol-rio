export class SummaryOutput {
  total: number
  pending: number
  reviewed: number

  constructor({
    total,
    pending,
    reviewed,
  }: {
    total: number
    pending: number
    reviewed: number
  }) {
    this.total = total
    this.pending = pending
    this.reviewed = reviewed
  }
}
