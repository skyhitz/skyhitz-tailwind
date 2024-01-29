import { Entry, EntryHolder } from 'app/api/graphql'
import { Pressable, Text, View, Platform } from 'react-native'
import InfoCircle from 'app/ui/icons/info-circle'
import { PriceContainer } from './PriceContainer'
import { usePlayback } from 'app/hooks/usePlayback'
import PlayIcon from 'app/ui/icons/play'
import PauseIcon from 'app/ui/icons/pause'
import LikeButton from 'app/ui/buttons/likeButton'
import { CollapsableView } from 'app/ui/CollapsableView'
import { LikesList } from 'app/features/player/components/likesList'
import { ShareButton } from 'app/ui/buttons/ShareButton'
import { Config } from 'app/config'
import { OwnerOffers } from './offers/OwnerOffers'
import { AssetBids } from './bids/AssetBids'
import { useRecoilValue } from 'recoil'
import { userAtom } from 'app/state/user'
import { useMemo } from 'react'
import { ActivityIndicator, H1, P } from 'app/design/typography'

type Props = {
  entry: Entry
  holders?: EntryHolder[] | null
}

export function BeatSummaryColumn({ entry, holders }: Props) {
  const user = useRecoilValue(userAtom)
  const isOnlyOwner = useMemo(
    () => holders?.length === 1 && holders[0]?.account === user?.publicKey,
    [user, holders],
  )
  return (
    <View className="flex w-full md:ml-4 md:flex-1">
      <View>
        <H1 className="font-unbounded mb-2 text-3xl font-bold md:text-5xl">
          {entry.title}
        </H1>
        <Text className="md:text-2xl">{entry.artist}</Text>
        <View className="mt-4 flex-row items-center gap-4">
          <PlayBeatButton currentEntry={entry} />
          <LikeButton size={24} entry={entry} />
          <ShareButton
            url={`${Config.APP_URL}/dashboard/beat/${entry.id}`}
            title="Share this beat!"
          />
        </View>
      </View>
      {!isOnlyOwner && <PriceContainer entry={entry} />}
      {Platform.OS !== 'ios' && <OwnerOffers entry={entry} holders={holders} />}
      {Platform.OS !== 'ios' && <AssetBids entry={entry} holders={holders} />}
      <CollapsableView icon={InfoCircle} headerText="Description">
        <P className="p-5 text-sm leading-6">{entry.description}</P>
      </CollapsableView>
      <LikesList entry={entry} />
    </View>
  )
}

function PlayBeatButton({ currentEntry }: { currentEntry: Entry }) {
  const { playEntry, playPause, entry, playbackState } = usePlayback()

  if (entry?.id === currentEntry.id) {
    if (playbackState === 'LOADING' || playbackState === 'FALLBACK') {
      return <ActivityIndicator grey />
    }

    return (
      <Pressable onPress={playPause}>
        {playbackState === 'PLAYING' ? (
          <PauseIcon className="text-gray-600" size={22} />
        ) : (
          <PlayIcon className="text-gray-600" size={22} />
        )}
      </Pressable>
    )
  }

  return (
    <Pressable onPress={() => playEntry(currentEntry, [currentEntry])}>
      <PlayIcon className="text-gray-600" />
    </Pressable>
  )
}
