import { A, H3, P } from 'app/design/typography'
import { View } from 'react-native'
import { SkyhitzLogo } from 'app/ui/logo'

const navigation = {
  explore: [
    { name: 'Artists', href: '/artists' },
    { name: 'Genres', href: '/genres' },
    { name: 'Trending', href: '/dashboard/chart' },
  ],
  support: [
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: 'mailto:support@skyhitz.io' },
    { name: 'Terms', href: '/terms' },
    { name: 'Privacy', href: '/privacy' },
  ],
  connect: [
    { name: 'Blog', href: '/blog' },
    { name: 'X', href: 'https://x.com/skyhitz' },
    { name: 'Instagram', href: 'https://instagram.com/skyhitz' },
    { name: 'Discord', href: 'https://discord.com/invite/2C3HzsPEuZ' },
  ],
}

export default function Footer() {
  return (
    <View className="mx-auto w-full max-w-7xl px-6 pb-12 lg:px-8">
      <View className="xl:grid xl:grid-cols-2 xl:gap-8">
        <View />
        <View className="gap-8 md:grid md:grid-cols-3">
          <View>
            <H3 className="text-sm font-semibold leading-6 text-gray-900">
              Explore
            </H3>
            <View role="list" className="mt-6 space-y-4">
              {navigation.explore.map((item) => (
                <View key={item.name}>
                  <A
                    href={item.href}
                    className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                  >
                    {item.name}
                  </A>
                </View>
              ))}
            </View>
          </View>
          <View>
            <H3 className="text-sm font-semibold leading-6 text-gray-900">
              Support
            </H3>
            <View role="list" className="mt-6 space-y-4">
              {navigation.support.map((item) => (
                <View key={item.name}>
                  <A
                    href={item.href}
                    className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                  >
                    {item.name}
                  </A>
                </View>
              ))}
            </View>
          </View>
          <View>
            <H3 className="text-sm font-semibold leading-6 text-gray-900">
              Connect
            </H3>
            <View role="list" className="mt-6 space-y-4">
              {navigation.connect.map((item) => (
                <View key={item.name}>
                  <A
                    href={item.href}
                    className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                  >
                    {item.name}
                  </A>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
      <P className="mt-16 flex flex-row items-center gap-4 text-xs">
        <SkyhitzLogo size={25} id="footer" /> © {new Date().getFullYear()}{' '}
        Skyhitz - All Rights Reserved.
      </P>
    </View>
  )
}
