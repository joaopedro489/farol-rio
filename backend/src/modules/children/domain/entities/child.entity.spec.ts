import { Child } from './child.entity'
import { AlertEnum } from '../types/enum/alert.enum'

describe('Child', () => {
  let sut: Child

  const baseParams = {
    id: 'child-uuid-1',
    name: 'João Silva',
    birthday: new Date('2015-06-15'),
    neighborhood: 'Centro',
    responsible: 'Maria Silva',
    health: {
      vaccinesUpToDate: false,
      lastMedicalAppointment: new Date('2023-01-10'),
      alerts: [AlertEnum.LATE_VACCINE],
    },
    education: {
      school: 'Escola Municipal',
      frequency: 75,
      alerts: [AlertEnum.LOW_FREQUENCY],
    },
    socialAssistance: {
      cad: true,
      benefit: false,
      alerts: [],
    },
    reviewed: false,
    reviewedBy: null,
    reviewedAt: null,
  }

  beforeEach(() => {
    sut = new Child(baseParams)
  })

  it('should be created with correct properties', () => {
    expect(sut.id).toBe('child-uuid-1')
    expect(sut.name).toBe('João Silva')
    expect(sut.birthday).toEqual(new Date('2015-06-15'))
    expect(sut.neighborhood).toBe('Centro')
    expect(sut.responsible).toBe('Maria Silva')
    expect(sut.health).toEqual(baseParams.health)
    expect(sut.education).toEqual(baseParams.education)
    expect(sut.socialAssistance).toEqual(baseParams.socialAssistance)
  })

  it('should start as not reviewed', () => {
    expect(sut.reviewed).toBe(false)
    expect(sut.reviewedBy).toBeNull()
    expect(sut.reviewedAt).toBeNull()
  })

  it('should mark as reviewed', () => {
    const reviewer = { id: 42, email: 'reviewer@test.com' }

    sut.markAsReviewed(reviewer)

    expect(sut.reviewed).toBe(true)
    expect(sut.reviewedBy).toEqual(reviewer)
    expect(sut.reviewedAt).toBeInstanceOf(Date)
  })

  it('should return false when marking already reviewed child', () => {
    sut.markAsReviewed({ id: 42, email: 'reviewer@test.com' })

    const result = sut.markAsReviewed({ id: 99, email: 'other@test.com' })

    expect(result).toBe(false)
  })
})
