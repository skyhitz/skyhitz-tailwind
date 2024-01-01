import { A, H1, P } from 'app/design/typography'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import Navbar from 'app/ui/navbar'
import { View } from 'react-native'

import { MotiLink } from 'solito/moti'

export function HomeScreen() {
  const insets = useSafeArea()

  return (
    <View
      className={`flex h-full w-full pt-[${insets.top}px] pb-[${insets.bottom}px]`}
    >
      <Navbar />
      <View className="flex-1 items-center justify-center p-3">
        <H1>Welcome to Solito.</H1>
        <View className="max-w-xl">
          <P className="text-center">
            Here is a basic starter to show you how you can navigate from one
            screen to another. This screen uses the same code on Next.js and
            React Native.
          </P>
          <p className="text-center">
            Solito is made by{' '}
            <A
              href="https://twitter.com/fernandotherojo"
              hrefAttrs={{
                target: '_blank',
                rel: 'noreferrer',
              }}
            >
              Fernando Rojo
            </A>
            .
          </p>
          <p className="text-center">
            NativeWind is made by{' '}
            <A
              href="https://twitter.com/mark__lawlor"
              hrefAttrs={{
                target: '_blank',
                rel: 'noreferrer',
              }}
            >
              Mark Lawlor
            </A>
            .
          </p>
        </View>
        <View className="h-[32px]" />
        <View className="space-x-8">
          <MotiLink
            href="/user/fernando"
            animate={({ hovered, pressed }) => {
              'worklet'

              return {
                scale: pressed ? 0.95 : hovered ? 1.1 : 1,
                rotateZ: pressed ? '0deg' : hovered ? '-3deg' : '0deg',
              }
            }}
            transition={{
              type: 'timing',
              duration: 150,
            }}
          >
            <P selectable={false} className="text-base font-bold">
              Moti Link
            </P>
          </MotiLink>
        </View>
      </View>
    </View>
  )
}
