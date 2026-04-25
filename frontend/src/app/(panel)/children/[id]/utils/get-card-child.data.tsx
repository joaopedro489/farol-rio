import { ChildModel } from '@/domain/models/child/child.model'

export const getCardChildData = (child?: ChildModel) => {
  const healthCard = child?.health
    ? [
        {
          label: 'Vacinas em dia',
          value: child.health.vaccinesUpToDate ? 'Sim' : 'Não',
          isAlert: !child.health.vaccinesUpToDate
        },
        {
          label: 'Última consulta',
          value: child.health.lastMedicalAppointment ? 'Sim' : 'Não',
          isAlert: !child.health.lastMedicalAppointment
        }
      ]
    : null

  const educationCard = child?.education
    ? [
        {
          label: 'Escola',
          value: child.education.school,
          isAlert: false
        },
        {
          label: 'Frequência escolar',
          value: child.education.frequency
            ? `${child.education.frequency} vezes por semana`
            : 'Não informado',
          isAlert: child.education.frequency === 0
        }
      ]
    : null

  const socialAssistanceCard = child?.socialAssistance
    ? [
        {
          label: 'CadÚnico',
          value: child.socialAssistance.cad ? 'Sim' : 'Desatualizado',
          isAlert: !child.socialAssistance.cad
        },
        {
          label: 'Benefício',
          value: child.socialAssistance.benefit ? 'Ativo' : 'Inativo',
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
