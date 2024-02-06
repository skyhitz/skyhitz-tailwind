import { H2, P, A, Button } from 'app/design/typography'
import { View } from 'react-native'
import { SolitoImage } from 'solito/image'

export default function CtaBanner() {
  return (
    <View className="relative">
      <View className="bg-brand-blue relative h-80 overflow-hidden md:absolute md:left-0 md:h-full md:w-1/3 lg:w-1/2">
        <View className="h-full w-full rounded-full p-0">
          <SolitoImage
            src="/img/landing-3.png"
            fill
            alt=""
            contentFit="cover"
            style={{ borderTopRightRadius: 12, borderBottomRightRadius: 12 }}
          />
        </View>
      </View>
      <View
        className="relative mx-auto max-w-7xl pb-0 pt-24 sm:py-24 lg:px-8 lg:py-24"
        id="mission"
      >
        <View className="pl-6 pr-6 md:ml-auto md:w-2/3 md:pl-16 lg:w-1/2 lg:pl-24 lg:pr-0 xl:pl-32">
          <P className="!text-blue-brand font-unbounded text-base font-semibold leading-7">
            Our Mission
          </P>
          <H2 className="font-unbounded mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Redefine music ownership and accessibility
          </H2>
          <P className="mt-6 leading-8">
            We envision a future where artists have full control over their
            creations, fans have direct and transparent access to unique music,
            and the industry is reshaped through the innovative use of
            blockchain technology.
          </P>
          <View className="mt-8">
            <A variant="primary" href="/dashboard/chart">
              Explore Music
            </A>
          </View>
        </View>
      </View>
    </View>
  )
}
