import { View } from 'react-native'
import { BeatListEntry } from 'app/ui/beat-list-entry'
import { ActivityIndicator, H1, Button } from 'app/design/typography'
import { useTopChart } from 'app/hooks/algolia/useTopChart'
import { Entry } from 'app/api/graphql'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'
import Navbar from 'app/ui/navbar'
import Footer from 'app/ui/footer'

export function ChartScreen({ entries }: { entries: Entry[] }) {
  const insets = useSafeArea()

  const {
    data: extraEntries,
    isLoadingMore,
    onNextPage,
    loadMoreEnabled,
  } = useTopChart(1)

  return (
    <View
      className={`flex h-full w-full pt-[${insets.top}px] pb-[${insets.bottom}px]`}
    >
      <Navbar />
      <View className="mx-auto mb-32 w-full max-w-7xl px-6 lg:px-8">
        <H1 className="mb-4 mt-10 text-4xl">Trending</H1>
        <View className="my-8 border-b border-gray-200" />
        <View className="gap-8">
          {entries.map((entry, index) => {
            return (
              <BeatListEntry
                key={index}
                entry={entry}
                spot={index + 1}
                playlist={entries}
              />
            )
          })}

          {extraEntries.map((entry, index) => {
            return (
              <BeatListEntry
                key={index}
                entry={entry}
                spot={index + 1}
                playlist={entries}
              />
            )
          })}
        </View>
        <View className="mt-16 flex h-12 items-center  justify-center">
          {isLoadingMore ? (
            <ActivityIndicator size={'small'} />
          ) : (
            loadMoreEnabled && (
              <Button
                onPress={() => {
                  onNextPage()
                }}
              >
                Load More →
              </Button>
            )
          )}
        </View>
      </View>
      <Footer />
    </View>
  )
}
