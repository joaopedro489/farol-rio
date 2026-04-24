export class AlertsByNeighborhoodOutput {
  label: string
  value: number

  constructor({ label, value }: { label: string; value: number }) {
    this.label = label
    this.value = value
  }
}
