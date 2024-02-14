import { GetServerSideProps } from 'next'
import { BlogScreen } from 'app/features/blog/screen'
import { Post } from 'app/types'
import { isEmpty } from 'ramda'
import { blogIndex } from 'app/api/algolia'

export const getServerSideProps: GetServerSideProps = async (props) => {
  const res = await blogIndex.search<Post>('')

  if (isEmpty(res.hits)) {
    return { props: {} }
  }

  const blog = res.hits

  return {
    props: {
      blog,
    },
  }
}

type Props = {
  blog: Post[]
}

export default function BlogPage({ blog }: Props) {
  return <BlogScreen posts={blog} />
}
