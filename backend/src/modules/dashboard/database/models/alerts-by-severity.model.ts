import { Prisma } from 'src/generated/prisma/client'
import { AlertsBySeverityOutput } from '../../domain/outputs/alerts-by-severity.output'

type AlertFlagsModelConstructor = {
  health: Prisma.JsonValue | typeof Prisma.DbNull
  education: Prisma.JsonValue | typeof Prisma.DbNull
  social_assistance: Prisma.JsonValue | typeof Prisma.DbNull
}

export class AlertsBySeverityModel {
  static toOutput(
    children: AlertFlagsModelConstructor[],
  ): AlertsBySeverityOutput {
    const acc: AlertsBySeverityOutput = { none: 0, one: 0, two: 0, three: 0 }

    for (const child of children) {
      const count =
        (child.health != Prisma.DbNull ? 1 : 0) +
        (child.education != Prisma.DbNull ? 1 : 0) +
        (child.social_assistance != Prisma.DbNull ? 1 : 0)

      if (count === 0) acc.none++
      else if (count === 1) acc.one++
      else if (count === 2) acc.two++
      else acc.three++
    }

    return new AlertsBySeverityOutput(acc)
  }
}
