/** @jsxImportSource react */

import { SearchScreen } from 'app/features/search'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Skyhitz - Search music NFTs',
  description: 'Search for the best music NFTs',
  alternates: {
    canonical: `https://skyhitz.io/search`,
  },
}

export default function SearchPage() {
  return <SearchScreen />
}
