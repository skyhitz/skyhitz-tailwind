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

  const chart = res.hits

  return {
    props: {
      chart,
    },
  }
}

type Props = {
  chart: Entry[]
}

export default function ChartPage({ chart }: Props) {
  return <ChartScreen entries={chart} />
}
