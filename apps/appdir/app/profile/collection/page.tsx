/** @jsxImportSource react */

import { AuthGuard } from 'app/utils/authGuard'
import CollectionScreen from 'app/features/profile/collection'

export default function CollectionPage() {
  return (
    <AuthGuard>
      <CollectionScreen />
    </AuthGuard>
  )
}
