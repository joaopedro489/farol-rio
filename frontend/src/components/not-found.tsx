import { InfoIcon } from 'lucide-react'

export const NotFound = () => {
  return (
    <div className='w-full border-2 border-gray-400 rounded-md p-4 flex flex-col items-center justify-center'>
      <InfoIcon className='mx-auto mb-4' size={16} />
      <p className='text-center text-sm text-muted-foreground'>Nenhum registro encontrado.</p>
    </div>
  )
}
