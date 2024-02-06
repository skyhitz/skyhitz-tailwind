import { View } from 'react-native'
import { FlashList as FlatList, ListRenderItem } from '@shopify/flash-list'

import SearchingIndicator from 'app/features/dashboard/search/search-result-lists/searchingIndicator'
import EmptyListIndicator from 'app/features/dashboard/search/search-result-lists/emptyListIndicator'
import { P } from 'app/design/typography'

type SearchResultListsProps<T> = {
  searchPhrase: string
  loading: boolean
  data: T[]
  renderItem: ListRenderItem<T>
  emptyListText: string
  error?: boolean
}

export function SearchResultList<T>({
  searchPhrase,
  loading,
  data,
  renderItem,
  emptyListText,
  error,
}: SearchResultListsProps<T>) {
  if (error && !loading) {
    return (
      <View className="flex-1 items-center pt-4">
        <P className="text-red">Something went wrong. Try again.</P>
      </View>
    )
  }

  return (
    <FlatList
      ListHeaderComponent={
        <SearchingIndicator visible={loading} searchPhrase={searchPhrase} />
      }
      data={data}
      renderItem={renderItem}
      ListEmptyComponent={
        <EmptyListIndicator visible={!loading} text={emptyListText} />
      }
      showsVerticalScrollIndicator={false}
      estimatedItemSize={20}
    />
  )
}
