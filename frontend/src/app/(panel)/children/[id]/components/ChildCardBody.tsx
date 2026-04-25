type ChildCardBodyProps = {
  label: string
  isAlert: boolean
  value: string
}

export const ChildCardBody = ({ label, isAlert, value }: ChildCardBodyProps) => {
  return (
    <div className='flex items-center justify-between py-1.5'>
      <p className='text-sm text-muted-foreground'>{label}</p>
      <p className={`text-sm font-medium ${isAlert ? 'text-attention' : 'text-foreground'}`}>
        {value}
      </p>
    </div>
  )
}
