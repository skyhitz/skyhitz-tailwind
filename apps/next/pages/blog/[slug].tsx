import { GetServerSideProps } from 'next'
import { PostScreen } from 'app/features/post/screen'
import { Post } from 'app/types'
import { isEmpty } from 'ramda'
import { blogIndex } from 'app/api/algolia'

export const getServerSideProps: GetServerSideProps = async (props) => {
  const slug = props.params?.slug as string
  const res = await blogIndex.search('', {
    filters: `objectID:${slug}`,
  })

  if (isEmpty(res.hits)) {
    return { props: {} }
  }

  const post = res.hits[0]

  return {
    props: {
      post,
    },
  }
}

type Props = {
  post: Post
}

export default function BlogPage({ post }: Props) {
  return <PostScreen post={post} />
}
