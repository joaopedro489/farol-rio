import { ChildModel } from '@/domain/models/child/child.model'
import dayjs from 'dayjs'

const formatDate = (date: Date | null | undefined): string => {
  if (!date) return 'Não informado'
  return new Date(date).toLocaleDateString('pt-BR')
}

const formatFrequency = (frequency: number | null | undefined): string => {
  if (frequency === null || frequency === undefined) return 'Não informado'
  return `${frequency}%`
}

export const getCardChildData = (child?: ChildModel) => {
  const healthCard = child?.health
    ? [
        {
          label: 'Vacinas em dia',
          value: child.health.vaccinesUpToDate ? 'em dia' : 'atrasadas',
          isAlert: !child.health.vaccinesUpToDate
        },
        {
          label: 'Última consulta',
          value: formatDate(child.health.lastMedicalAppointment),
          isAlert:
            !child.health.lastMedicalAppointment ||
            dayjs().diff(dayjs(child.health.lastMedicalAppointment), 'month') > 12
        }
      ]
    : null

  const educationCard = child?.education
    ? [
        {
          label: 'Escola',
          value: child.education.school || 'Não informado',
          isAlert: false
        },
        {
          label: 'Frequência',
          value: formatFrequency(child.education.frequency),
          isAlert: child.education.frequency < 50
        }
      ]
    : null

  const socialAssistanceCard = child?.socialAssistance
    ? [
        {
          label: 'CadÚnico',
          value: child.socialAssistance.cad ? 'em dia' : 'ausente/desatualizado',
          isAlert: !child.socialAssistance.cad
        },
        {
          label: 'Benefício',
          value: child.socialAssistance.benefit ? 'ativo' : 'inativo',
          isAlert: !child.socialAssistance.benefit
        }
      ]
    : null

  return {
    healthCard,
    educationCard,
    socialAssistanceCard
  }
}
