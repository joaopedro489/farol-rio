export enum AlertEnum {
  LATE_VACCINE = 'vacinas_atrasadas',
  LOW_FREQUENCY = 'frequencia_baixa',
  LATE_APPOINTMENT = 'consulta_atrasada',
  SUSPENDED_BENEFIT = 'beneficio_suspenso',
  OUTDATED_REGISTRATION = 'cadastro_desatualizado',
  PENDING_ENROLLMENT = 'matricula_pendente',
  ABSENT_REGISTRATION = 'cadastro_ausente'
}

export const AlertEnumLabels: Record<AlertEnum, string> = {
  [AlertEnum.LATE_VACCINE]: 'Vacinas Atrasadas',
  [AlertEnum.LOW_FREQUENCY]: 'Frequência Baixa',
  [AlertEnum.LATE_APPOINTMENT]: 'Consulta Atrasada',
  [AlertEnum.SUSPENDED_BENEFIT]: 'Benefício Suspenso',
  [AlertEnum.OUTDATED_REGISTRATION]: 'Cadastro Desatualizado',
  [AlertEnum.PENDING_ENROLLMENT]: 'Matrícula Pendente',
  [AlertEnum.ABSENT_REGISTRATION]: 'Cadastro Ausente'
}
