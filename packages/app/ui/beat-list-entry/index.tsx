import { P } from 'app/design/typography'
import { View } from 'react-native'
import { Entry } from 'app/api/graphql'
import { Pressable } from 'react-native'
import Price from 'app/ui/price'
import LikeButton from 'app/ui/buttons/likeButton'
import VerticalDots from 'app/ui/icons/verticalDots'
import { ReactElement } from 'react'
import { useRouter } from 'solito/router'
import { imageUrlSmall } from 'app/utils/entry'
import { usePlayback } from 'app/hooks/usePlayback'
import { SolitoImage } from 'solito/image'

export type PressableState = Readonly<{
  hovered?: boolean
}>

export function BeatListEntry({
  entry,
  spot,
  playlist,
}: {
  entry: Entry
  spot?: number
  playlist: Entry[]
}) {
  const { push } = useRouter()
  const { playEntry } = usePlayback()

  return (
    <Pressable onPress={() => playEntry(entry, playlist)} className="flex">
      {({ hovered }: PressableState): ReactElement => {
        return (
          <View className="flex flex-row items-center py-2">
            <View className="aspect-[2/2] w-16 object-cover">
              <SolitoImage
                src={imageUrlSmall(entry.imageUrl)}
                alt={entry.title}
                contentFit="cover"
                fill
                sizes="4rem"
                style={{ borderRadius: 6 }}
              />
            </View>
            {spot && (
              <P className="ml-2 w-11 text-center text-2xl leading-none">
                {spot}
              </P>
            )}
            <View className="ml-2 flex flex-1 justify-center pr-2">
              <P numberOfLines={1} className="text-sm font-bold leading-6">
                {entry.title}
              </P>
              <P
                numberOfLines={1}
                className="text-xs leading-6 text-neutral-400"
              >
                {entry.artist}
              </P>
            </View>
            <View className="flex flex-row items-center">
              <Price entry={entry} className="mr-3" hovered={hovered} />
              <LikeButton size={20} entry={entry} />
              <Pressable
                onPress={() => {
                  push(`/dashboard/beat/${entry.id}`)
                }}
                className="text-gray-600"
              >
                <VerticalDots size={30} />
              </Pressable>
            </View>
          </View>
        )
      }}
    </Pressable>
  )
}
