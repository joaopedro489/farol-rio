import { Prisma } from '@/generated/prisma/client'
import { AlertsBySeverityOutput } from '../../domain/outputs/alerts-by-severity.output'

type AlertFlags = { alerts?: unknown[] }

type AlertFlagsModelConstructor = {
  health: Prisma.JsonValue | typeof Prisma.DbNull
  education: Prisma.JsonValue | typeof Prisma.DbNull
  social_assistance: Prisma.JsonValue | typeof Prisma.DbNull
}

const alertsLength = (value: Prisma.JsonValue | typeof Prisma.DbNull): number =>
  (value as AlertFlags)?.alerts?.length ?? 0

export class AlertsBySeverityModel {
  static toOutput(
    children: AlertFlagsModelConstructor[],
  ): AlertsBySeverityOutput {
    const acc: AlertsBySeverityOutput = { none: 0, one: 0, two: 0, three: 0 }

    for (const child of children) {
      const count =
        alertsLength(child.health) +
        alertsLength(child.education) +
        alertsLength(child.social_assistance)

      if (count === 0) acc.none++
      else if (count === 1) acc.one++
      else if (count === 2) acc.two++
      else acc.three++
    }

    return new AlertsBySeverityOutput(acc)
  }
}
