import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import { Post } from 'app/types'
import BlogSection from 'app/ui/blog-section'
import CtaBanner from 'app/ui/cta-banner'
import Faq from 'app/ui/faq'
import { Featured } from 'app/ui/featured'
import Footer from 'app/ui/footer'
import { Hero } from 'app/ui/hero'
import Navbar from 'app/ui/navbar'
import { View } from 'react-native'

export function HomeScreen({ posts }: { posts: Post[] }) {
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
      <BlogSection posts={posts} />
      <Footer />
    </View>
  )
}
