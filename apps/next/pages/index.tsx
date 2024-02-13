import { HomeScreen } from 'app/features/home/screen'
import { GetServerSideProps } from 'next'
import { Post } from 'app/types'
import { isEmpty } from 'ramda'
import { blogIndex } from 'app/api/algolia'
import { footer, homeContent, keywords } from 'app/constants/content'
import { Config } from 'app/config'

export const getServerSideProps: GetServerSideProps = async (props) => {
  const res = await blogIndex.search<Post>('', { hitsPerPage: 3 })

  if (isEmpty(res.hits)) {
    return { props: {} }
  }

  const posts = res.hits

  return {
    props: {
      posts,
    },
  }
}

type Props = {
  posts: Post[]
}

export default function HomePage({ posts }: Props) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'OnlineBusiness',
    name: 'Skyhitz',
    legalName: footer.companyName,
    logo: {
      '@type': 'ImageObject',
      url: 'https://skyhitz.io/icon.png',
    },
    description: homeContent.header.desc,
    url: Config.APP_URL,
    '@id': `${Config.APP_URL}#mission`,
    areaServed: 'Worldwide',
    award: 'Stellar Community Fund',
    sameAs: [
      'https://www.facebook.com/skyhitzio',
      'https://instagram.com/skyhitz',
      'https://www.youtube.com/@skyhitzio',
      'https://www.linkedin.com/company/skyhitz',
      'https://www.tiktok.com/@skyhitz',
      'https://twitter.com/skyhitz',
      'https://communityfund.stellar.org/project/skyhitz',
    ],
    founder: {
      '@type': 'Person',
      name: 'Alejo Mendoza',
    },
    email: 'support@skyhitz.io',
    keywords: keywords,
    knowsAbout: 'Music NFTs',
  }

  return (
    <>
      <HomeScreen {...homeContent} posts={posts} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
