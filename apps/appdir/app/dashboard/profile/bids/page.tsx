'use client'
/** @jsxImportSource react */

import { ComponentAuthGuard } from 'app/utils/authGuard'
import { BidsScreen } from 'app/features/dashboard/profile/bids/index'
import { useUserAtomState } from 'app/state/user'

export default function BidsPage() {
  const { user } = useUserAtomState()
  return (
    <ComponentAuthGuard>
      {user && <BidsScreen user={user} />}
    </ComponentAuthGuard>
  )
}
