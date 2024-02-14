import CollectorScreen from 'app/features/dashboard/collector'
import { GetServerSideProps } from 'next'
import { usersIndex } from 'app/api/algolia'
import { isEmpty } from 'ramda'

export const getServerSideProps: GetServerSideProps = async (props) => {
  const id = props.params?.id as string
  const res = await usersIndex.search('', {
    filters: `id:${id}`,
  })

  if (isEmpty(res.hits)) {
    return { props: {} }
  }

  const collector = res.hits[0]

  return {
    props: {
      collector,
    },
  }
}

export default function BeatmakerPage() {
  return <CollectorScreen />
}
