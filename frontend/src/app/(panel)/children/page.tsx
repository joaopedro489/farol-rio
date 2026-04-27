import { Suspense } from 'react'
import { ChildrenContent } from './components/ChildrenContent'

export default function ChildrenPage() {
  return (
    <Suspense>
      <ChildrenContent />
    </Suspense>
  )
}
