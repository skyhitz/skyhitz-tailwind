import { ToastProvider } from 'react-native-toast-notifications'
import { ReactElement } from 'react'
import { Toast } from 'app/ui/toast'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'

export default function SkyhitzToastProvider({
  children,
}: {
  children: ReactElement
}) {
  const { top } = useSafeArea()
  return (
    <ToastProvider placement="top" renderToast={Toast} offsetTop={top}>
      {children}
    </ToastProvider>
  )
}
