import { ratingEntriesIndex } from 'app/api/algolia'
import { Entry } from 'app/api/graphql'
import { ChartScreen } from 'app/features/dashboard/chart'
import { GetServerSideProps } from 'next'
import { isEmpty } from 'ramda'

export const getServerSideProps: GetServerSideProps = async (props) => {
  const res = await ratingEntriesIndex.search<Entry>('')

  if (isEmpty(res.hits)) {
    return { props: {} }
  }

  const entries = res.hits

  return {
    props: {
      entries,
    },
  }
}

type Props = {
  entries: Entry[]
}

export default function ChartPage({ entries }: Props) {
  return <ChartScreen entries={entries} />
}
