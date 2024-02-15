import { SearchScreen } from 'app/features/dashboard/search'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (props) => {
  return {
    props: {
      search: true,
    },
  }
}

type Props = {
  search: boolean
}

export default function SearchPage() {
  return <SearchScreen />
}
