export class AlertsBySeverityOutput {
  none: number
  one: number
  two: number
  three: number

  constructor({
    none,
    one,
    two,
    three,
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
