import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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

        <DialogDescription>
          Tem certeza que deseja marcar esta criança como revisada? Esta ação não pode ser desfeita.
        </DialogDescription>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline' className='cursor-pointer'>
              Cancelar
            </Button>
          </DialogClose>

          <Button
            className='cursor-pointer'
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
