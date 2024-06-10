/** @jsxImportSource react */

import { ratingEntriesIndex } from 'app/api/algolia'
import { Entry } from 'app/api/graphql'
import { Config } from 'app/config'
import { ChartScreen } from 'app/features/chart'
import JsonLdScript from 'app/seo/jsonLd'
import { Metadata } from 'next'
import { isEmpty } from 'ramda'
import { cache } from 'react'

export const metadata: Metadata = {
  title: 'Skyhitz - Top Chart',
  description: 'Discover trending music NFTs',
  alternates: {
    canonical: `${Config.APP_URL}/chart`,
  },
}

const getChart = cache(async () => {
  const res = await ratingEntriesIndex.search<Entry>('', { cacheable: true })

  if (isEmpty(res.hits)) {
    return []
  }

  return res.hits as Entry[]
})

export default async function ChartPage() {
  const chart = await getChart()

  return (
    <>
      <ChartScreen entries={chart} />
      <JsonLdScript chart={chart} />
    </>
  )
}
