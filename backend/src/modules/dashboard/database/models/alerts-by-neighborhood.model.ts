import { AlertsByNeighborhoodOutput } from '../../domain/outputs/alerts-by-neighborhood.output'

type AlertsByNeighborhoodModelConstructor = {
  neighborhood: string
  _count: { id: number }
}

export class AlertsByNeighborhoodModel {
  static toOutput(
    rows: AlertsByNeighborhoodModelConstructor[],
  ): AlertsByNeighborhoodOutput[] {
    return rows.map(
      (row) =>
        new AlertsByNeighborhoodOutput({
          label: row.neighborhood,
          value: row._count.id,
        }),
    )
  }
}
