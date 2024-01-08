import { Button, H1, H2, H3, P } from 'app/design/typography'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import Footer from 'app/ui/footer'
import Navbar from 'app/ui/navbar'
import { View } from 'react-native'
import { SolitoImage } from 'solito/image'

let blogPosts = [
  {
    title: 'Embrace authenticity and connect with your audience',
    date: 'July 17, 2023',
    imageUrl: '/img/landing-3.png',
  },
  {
    title: 'Embrace authenticity and connect with your audience',
    date: 'July 17, 2023',
    imageUrl: '/img/landing-3.png',
  },
  {
    title: 'Embrace authenticity and connect with your audience',
    date: 'July 17, 2023',
    imageUrl: '/img/landing-3.png',
  },
  {
    title: 'Embrace authenticity and connect with your audience',
    date: 'July 17, 2023',
    imageUrl: '/img/landing-3.png',
  },
  {
    title: 'Embrace authenticity and connect with your audience',
    date: 'July 17, 2023',
    imageUrl: '/img/landing-3.png',
  },
  {
    title: 'Embrace authenticity and connect with your audience',
    date: 'July 17, 2023',
    imageUrl: '/img/landing-3.png',
  },
]

export function BlogScreen() {
  const insets = useSafeArea()

  const handleLoadMore = () => {
    blogPosts = [...blogPosts, ...blogPosts]
  }

  return (
    <View
      className={`flex h-full w-full pt-[${insets.top}px] pb-[${insets.bottom}px]`}
    >
      <Navbar />
      <View className="mx-auto mb-32 w-full max-w-4xl px-6 lg:px-8">
        <H1 className="mb-4 mt-10 text-4xl">Blog</H1>
        <View className="my-8 border-b border-gray-200" />
        <View className="gap-8">
          {blogPosts.map(({ imageUrl, title, date }, index) => {
            return (
              <View
                key={index}
                className="flex flex-row items-center justify-start gap-8"
              >
                <View className="aspect-[2/2] w-32 object-cover">
                  <SolitoImage
                    src={imageUrl}
                    alt={title}
                    contentFit="cover"
                    fill
                    style={{ borderRadius: 12 }}
                  />
                </View>
                <View className="flex shrink flex-col items-start justify-center">
                  <H2 className="mb-2 break-words text-xl">{title}</H2>
                  <P>{date}</P>
                </View>
              </View>
            )
          })}
        </View>
        <View className="mt-16 flex items-center">
          <Button
            onPress={() => {
              handleLoadMore()
            }}
          >
            Load More →
          </Button>
        </View>
      </View>
      <Footer />
    </View>
  )
}
