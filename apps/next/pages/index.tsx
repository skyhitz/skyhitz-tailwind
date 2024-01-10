import { HomeScreen } from 'app/features/home/screen'
import { GetServerSideProps } from 'next'
import { Post } from 'app/types'
import { isEmpty } from 'ramda'
import { blogIndex } from 'app/api/algolia'

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

export default function BlogPage({ posts }: Props) {
  return <HomeScreen posts={posts} />
}
