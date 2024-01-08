import { A, H2 } from 'app/design/typography'
import { View } from 'react-native'
import Card from 'app/ui/card'

export default function BlogSection() {
  return (
    <View className="mx-auto w-full max-w-7xl px-6 pb-24 sm:pb-32 lg:px-8">
      <View className="mx-auto w-full">
        <View className="flex flex-row justify-between">
          <H2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
            Blog
          </H2>
          <A href="/blog" className="text-sm font-semibold text-gray-900">
            See all →
          </A>
        </View>
        <View className="mt-10 flex w-full flex-col gap-4 sm:flex-row lg:gap-8">
          <Card />
          <Card />
          <Card />
        </View>
      </View>
    </View>
  )
}
