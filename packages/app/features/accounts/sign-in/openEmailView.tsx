import { Pressable, View } from 'react-native'
import { openEmail } from 'app/utils/email'
import { P } from 'app/design/typography'

export function OpenEmailView() {
  return (
    <View>
      <P className="flex h-12 w-full flex-row items-center rounded-lg bg-gray-700/20 p-2 text-sm">
        We send you an email to access your account!
      </P>
      <Pressable onPress={() => openEmail()} className="btn mt-4">
        <P className="tracking-0.5">Open Email</P>
      </Pressable>
    </View>
  )
}
