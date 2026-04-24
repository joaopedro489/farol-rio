import { AlertsByTypeOutput } from '../../domain/outputs/alerts-by-type.output'

type AlertsByTypeModelConstructor = {
  health: number
  education: number
  socialAssistance: number
}

export class AlertsByTypeModel {
  static toOutput(prisma: AlertsByTypeModelConstructor): AlertsByTypeOutput {
    return new AlertsByTypeOutput({
      health: prisma.health,
      education: prisma.education,
      social_assistance: prisma.socialAssistance,
    })
  }
}
