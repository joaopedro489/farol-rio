export class DashboardSummary {
  public readonly total: number
  public readonly pending: number
  public readonly reviewed: number

  constructor({ total, pending, reviewed }: { total: number; pending: number; reviewed: number }) {
    this.total = total
    this.pending = pending
    this.reviewed = reviewed
  }
}
