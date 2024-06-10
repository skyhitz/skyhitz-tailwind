/** @jsxImportSource react */

import { AuthGuard } from 'app/utils/authGuard'
import { BidsScreen } from 'app/features/profile/bids/index'

export default function BidsPage() {
  return (
    <AuthGuard>
      <BidsScreen />
    </AuthGuard>
  )
}
