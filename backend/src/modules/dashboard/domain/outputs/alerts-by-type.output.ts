export class AlertsByTypeOutput {
  health: number
  education: number
  social_assistance: number

  constructor({
    health,
    education,
    social_assistance,
  }: {
    health: number
    education: number
    social_assistance: number
  }) {
    this.health = health
    this.education = education
    this.social_assistance = social_assistance
  }
}
