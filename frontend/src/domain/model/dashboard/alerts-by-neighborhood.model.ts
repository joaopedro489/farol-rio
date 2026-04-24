export class AlertsByNeighborhood {
  public readonly label: string
  public readonly value: number

  constructor({ label, value }: { label: string; value: number }) {
    this.label = label
    this.value = value
  }
}
