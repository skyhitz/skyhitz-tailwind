import { FlashList as FlatList } from '@shopify/flash-list'
import { BeatListEntry } from 'app/ui/beat-list-entry'
import { useRecentlyAdded } from 'app/hooks/algolia/useRecentlyAdded'
import { BeatSkeleton } from 'app/ui/skeletons/BeatSkeleton'
import { P } from 'app/design/typography'
import { usePlayback } from 'app/hooks/usePlayback'
import { useEffect } from 'react'

export default function RecentlyAddedList() {
  const { data, onNextPage, loading } = useRecentlyAdded()

  const { playEntry, playback, playbackState } = usePlayback()

  useEffect(() => {
    // play the last played entry
    if (playback && playbackState === 'IDLE' && data[0]) {
      playEntry(data[0], data, false)
    }
  }, [playback, playEntry, playbackState, data])

  if (loading) {
    return <BeatSkeleton />
  }

  return (
    <FlatList
      ListHeaderComponent={ListHeader}
      data={data}
      keyExtractor={(item) => item.id!}
      renderItem={({ item }) => <BeatListEntry entry={item} playlist={data} />}
      showsVerticalScrollIndicator={false}
      onEndReached={onNextPage}
      onEndReachedThreshold={0.1}
      estimatedItemSize={20}
    />
  )
}

function ListHeader() {
  return <P className="font-unbounded mt-0.5 pb-4">Recently Added</P>
}
