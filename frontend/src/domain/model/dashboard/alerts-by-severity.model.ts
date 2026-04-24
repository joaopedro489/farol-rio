export class AlertsBySeverity {
  public readonly none: number
  public readonly one: number
  public readonly two: number
  public readonly three: number

  constructor({
    none,
    one,
    two,
    three
  }: {
    none: number
    one: number
    two: number
    three: number
  }) {
    this.none = none
    this.one = one
    this.two = two
    this.three = three
  }
}
