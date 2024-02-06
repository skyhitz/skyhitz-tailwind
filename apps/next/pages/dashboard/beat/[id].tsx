import BeatScreen from 'app/features/dashboard/beat'
import { entriesIndex } from 'app/api/algolia'
import { GetServerSideProps } from 'next'
import { isEmpty } from 'ramda'
import { Entry } from 'app/api/graphql'

export const getServerSideProps: GetServerSideProps = async (props) => {
  const id = props.params?.id as string
  const res = await entriesIndex.search('', {
    filters: `id:${id}`,
  })

  if (isEmpty(res.hits)) {
    return { props: {} }
  }

  const entry = res.hits[0]

  return {
    props: {
      entry,
    },
  }
}

type Props = {
  entry?: Entry
}

export default function BeatPage({ entry }: Props) {
  return <BeatScreen entry={entry} />
}
