import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export const ChildModalConfirmation = ({ open, onOpenChange, onConfirm }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Marcar como revisado</DialogTitle>
        </DialogHeader>

        <p className='text-sm text-muted-foreground'>
          Tem certeza que deseja marcar esta criança como revisada? Esta ação não pode ser desfeita.
        </p>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancelar</Button>
          </DialogClose>

          <Button
            variant='default'
            onClick={() => {
              onConfirm()
              onOpenChange(false)
            }}
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
