import { ToastProps } from 'react-native-toast-notifications/lib/typescript/toast'
import { View } from 'react-native'
import { P } from 'app/design/typography'
import X from 'app/ui/icons/x'
import { ReactElement } from 'react'
import Check from 'app/ui/icons/check'

type SupportedToastTypes = 'danger' | 'success'

const containerClassNames: Record<SupportedToastTypes | 'default', string> = {
  danger: 'border-red bg-red-dark',
  success: 'border-valid bg-valid-dark',
  default: '',
}

const icons: Record<SupportedToastTypes | 'default', ReactElement> = {
  danger: <X className="text-red" />,
  success: <Check className="text-green" />,
  default: <></>,
}

export const Toast: (_toastOptions: ToastProps) => JSX.Element = (
  toastOptions,
) => {
  const type = (toastOptions.type as SupportedToastTypes) ?? 'default'

  return (
    <View
      className={`w-80vw m-1.5 h-12 max-w-sm flex-row items-center rounded-xl border-[0.5px] px-2 ${containerClassNames[type]}`}
    >
      {icons[type]}
      <P className="ml-2 flex-1 text-sm">{toastOptions.message}</P>
    </View>
  )
}
