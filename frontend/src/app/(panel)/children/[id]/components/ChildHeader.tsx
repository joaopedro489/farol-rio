import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check, MapPin } from 'lucide-react'
import { useState } from 'react'
import { ChildModalConfirmation } from './ChildModalConfirmation'

type ChildHeaderProps = {
  name: string
  age: string
  neighborhood: string
  responsible: string
  isReviewed?: boolean
  reviewedBy?: string
  initials: string
  reviewedDate?: Date
  onReview?: () => void
}

export const ChildHeader = ({
  name,
  age,
  initials,
  neighborhood,
  responsible,
  isReviewed,
  reviewedBy,
  reviewedDate,
  onReview
}: ChildHeaderProps) => {
  const [open, setOpen] = useState(false)

  const handleOpenModal = () => {
    setOpen(true)
  }

  return (
    <div className='flex items-center justify-between gap-4'>
      <div className='flex items-center gap-4'>
        <Avatar className='h-12 w-12 rounded-lg'>
          <AvatarFallback className='rounded-lg bg-muted text-foreground font-semibold'>
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className='flex flex-col gap-1'>
          <p className='text-2xl font-semibold text-foreground'>{name}</p>
          <div className='flex items-center gap-2 text-sm text-muted-foreground flex-wrap'>
            <span>{age}</span>
            <MapPin size={12} className='inline-block' />
            <span>{neighborhood}</span>
            <span>Responsável: {responsible}</span>
          </div>
          {isReviewed && (
            <Badge variant='outline' className='w-fit mt-1 text-ok border-ok/30 bg-ok-soft'>
              Revisado por: {reviewedBy} em {reviewedDate?.toLocaleDateString()}
            </Badge>
          )}
        </div>
      </div>
      {!isReviewed && (
        <Button variant='default' size='sm' onClick={handleOpenModal}>
          <Check size={14} />
          Marcar como revisado
        </Button>
      )}
      <ChildModalConfirmation
        open={open}
        onOpenChange={setOpen}
        onConfirm={() => {
          onReview?.()
        }}
      />
    </div>
  )
}
