/** @jsxImportSource react */

import { ProfileScreen } from 'app/features/profile'
import { AuthGuard } from 'app/utils/authGuard'

export default function ProfilePage() {
  return (
    <AuthGuard>
      <ProfileScreen />
    </AuthGuard>
  )
}
