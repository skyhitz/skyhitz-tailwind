import { GetStaticProps } from 'next'
import { PostScreen } from 'app/features/post/screen'
import { Post } from 'app/types'
import { isEmpty, filter, map } from 'ramda'
import { blogIndex } from 'app/api/algolia'
import { isSome } from 'app/utils'

export async function getStaticPaths() {
  const res = await blogIndex.search<Post>('', {
    hitsPerPage: 1000,
  })

  const slugs = filter(
    isSome,
    map((post) => {
      if (post.slug) {
        return { params: { slug: post.slug } }
      }
      return null
    }, res.hits as Post[]),
  )

  if (isEmpty(res.hits)) {
    return { props: {} }
  }
  return {
    paths: slugs,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (props) => {
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
