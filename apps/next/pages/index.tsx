import { HomeScreen } from 'app/features/home/screen'
import { GetServerSideProps } from 'next'
import { Post } from 'app/types'
import { isEmpty } from 'ramda'
import { blogIndex } from 'app/api/algolia'
import { homeContent } from 'app/constants/content'

export const getServerSideProps: GetServerSideProps = async (props) => {
  const res = await blogIndex.search<Post>('', { hitsPerPage: 3 })

  if (isEmpty(res.hits)) {
    return { props: {} }
  }

  const posts = res.hits

  return {
    props: {
      posts,
      landing: true,
    },
  }
}

type Props = {
  posts: Post[]
  landing: boolean
}

export default function HomePage({ posts, landing }: Props) {
  return <HomeScreen {...homeContent} posts={posts} landing={landing} />
}
