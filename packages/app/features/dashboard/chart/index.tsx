import { SafeAreaView, View } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import { BeatListEntry } from 'app/ui/beat-list-entry'
import { H1 } from 'app/design/typography'
import { useTopChart } from 'app/hooks/algolia/useTopChart'
import { BeatSkeleton } from 'app/ui/skeletons/BeatSkeleton'

export function ChartScreen() {
  const { data, onNextPage, loading } = useTopChart()

  console.log('rendering content')

  // reach end works properly only with a set height
  return (
    <View className="mx-auto flex min-h-screen w-full max-w-6xl pl-2 pt-4 ">
      <H1 className="mb-4 text-2xl">Trending</H1>
      {loading ? (
        <BeatSkeleton />
      ) : (
        <FlashList
          data={data}
          keyExtractor={(item) => item.id!}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <BeatListEntry entry={item} spot={index + 1} playlist={data} />
          )}
          onEndReached={() => {
            console.log('on reach end')
          }}
          onEndReachedThreshold={0.25}
          estimatedItemSize={200}
        />
      )}
    </View>
  )
}
