/** @jsxImportSource react */

import { AuthGuard } from 'app/utils/authGuard'
import LikesScreen from 'app/features/profile/likes'

export default function LikesPage() {
  return (
    <AuthGuard>
      <LikesScreen />
    </AuthGuard>
  )
}
