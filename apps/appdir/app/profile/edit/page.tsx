/** @jsxImportSource react */

import { AuthGuard } from 'app/utils/authGuard'
import EditProfileScreen from 'app/features/profile/edit'

export default function EditProfilePage() {
  return (
    <AuthGuard>
      <EditProfileScreen />
    </AuthGuard>
  )
}
