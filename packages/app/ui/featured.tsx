import { SolitoImage } from 'solito/image'

// import {
//   CloudArrowUpIcon,
//   LockClosedIcon,
//   ServerIcon,
// } from '@heroicons/react/20/solid'
import { View } from 'react-native'
import { H2, P } from 'app/design/typography'
import Wallet from 'app/ui/icons/wallet'
import Discover from 'app/ui/icons/discover'
import Collect from 'app/ui/icons/collect'
import Chart from 'app/ui/icons/chart'

const features = [
  {
    name: 'Wallet setup made easy',
    description:
      'Set up your digital wallet using either email for a custodial option or WalletConnect for a non-custodial experience, ensuring seamless and secure transactions.',
    icon: Wallet,
  },
  {
    name: 'Discover unique music collections',
    description:
      'Dive into a variety of exceptional music collections available on our platform.',
    icon: Discover,
  },
  {
    name: 'Collect your favorite music NFTs',
    description:
      'Purchase fractions of your favorite music pieces for an affordable price, or own the entire masterpiece if you desire.',
    icon: Collect,
  },
  {
    name: 'Interactive Top Chart',
    description:
      'Discover and influence trending creations - where user interactions like buying, streaming, and liking propel tracks up the charts.',
    icon: Chart,
  },
]

export function Featured() {
  return (
    <View className="overflow-hidden bg-white py-24 sm:py-32">
      <View className="mx-auto max-w-7xl md:px-6 lg:px-8">
        <View className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-center">
          <View className="px-6 lg:px-0 lg:pr-4 lg:pt-4">
            <View className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
              <P className="text-blue-brand text-base font-semibold leading-7">
                Enjoy our features
              </P>
              <H2 className="font-unbounded mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Embrace the fusion of music and innovation
              </H2>

              <View className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <View
                    key={feature.name}
                    className="relative flex flex-row items-center pl-9"
                  >
                    <View className="h-5 w-5 text-black">
                      {feature.icon && feature.icon({})}
                    </View>
                    <View className="relative max-w-fit pl-9">
                      <View className="font-semibold text-gray-900">
                        {feature.name}
                      </View>
                      <View className="inline">{feature.description}</View>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
          <View className="sm:px-6 lg:px-0">
            <View className="relative isolate overflow-hidden sm:mx-auto sm:max-w-2xl sm:rounded-3xl lg:mx-0 lg:max-w-none">
              <View className="mx-auto max-w-2xl sm:mx-0 sm:max-w-none">
                <SolitoImage
                  src="/img/landing-2.jpg"
                  alt="Product screenshot"
                  width={2432}
                  height={1442}
                  style={{
                    width: 912,
                    borderTopLeftRadius: 12,
                    maxWidth: undefined,
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
