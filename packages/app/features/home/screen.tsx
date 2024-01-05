import { A, H1, P } from 'app/design/typography'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import CtaBanner from 'app/ui/cta-banner'
import Faq from 'app/ui/faq'
import { Featured } from 'app/ui/featured'
import { Hero } from 'app/ui/hero'
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
      <Hero
        title={'Join the future of music ownership'}
        description={
          'The ultimate destination for music fans, collectors, and creators, offering a novel way to immerse in and experience music like never before. We are a blockchain-powered platform that enables music enthusiasts to discover and collect unique creations through a decentralized framework.'
        }
      />
      <CtaBanner />
      <Featured />
      <Faq />
      <View className="flex-1 items-center justify-center p-3">
        <H1 className="font-unbounded">Join the future of music ownership</H1>
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
              Link
            </P>
          </MotiLink>
        </View>
      </View>
    </View>
  )
}
