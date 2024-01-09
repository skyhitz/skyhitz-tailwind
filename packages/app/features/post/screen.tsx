import { H1, P } from 'app/design/typography'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { Post } from 'app/types'
import Footer from 'app/ui/footer'
import Navbar from 'app/ui/navbar'
import { View } from 'react-native'

export function PostScreen({ post }: { post: Post }) {
  const insets = useSafeArea()

  const { title, imageUrl, content, tag } = post

  return (
    <View
      className={`flex h-full w-full pt-[${insets.top}px] pb-[${insets.bottom}px]`}
    >
      <Navbar />
      <View className="mx-auto mb-32 w-full max-w-4xl px-6 lg:px-8">
        <H1 className="mb-4 mt-10 text-4xl">{title}</H1>
        <View className="my-8 border-b border-gray-200" />
        <View className="gap-8"></View>
      </View>
      <Footer />
    </View>
  )
}
