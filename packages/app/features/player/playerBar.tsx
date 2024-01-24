import { Text, View } from 'react-native'
import { PlayerButtonsRow } from './components/playerButtonsRow'
import { VideoPlayer } from 'app/ui/VideoPlayer'
import { usePlayback } from 'app/hooks/usePlayback'
import { PlayerSlider } from 'app/features/player/components/playerSlider'

export function PlayerBar({ className }: { className?: string }) {
  const { entry, playbackState } = usePlayback()

  return (
    <View
      className={`bg-opacity-97 flex h-20 flex-row items-center justify-between border-t border-t-gray-600/50 bg-white ${
        playbackState === 'IDLE' || playbackState === 'ERROR' ? 'hidden' : ''
      } ${className}`}
    >
      <View className="flex w-[20%] max-w-[20%] flex-row items-center truncate p-4">
        <VideoPlayer fixedSize={60} />
        <View className="h-full justify-end pl-4">
          <Text
            className="text-left text-sm font-bold text-gray-600"
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {entry?.title}
          </Text>
          <Text
            className="text-grey mt-1 text-left text-xs"
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {entry?.artist}
          </Text>
        </View>
      </View>
      {playbackState === 'ERROR' ? (
        <View className="h-20 items-center justify-center">
          <Text className="text-red">Something went wrong. Try again.</Text>
        </View>
      ) : (
        <View className="flex grow items-center justify-evenly pb-1">
          <PlayerButtonsRow />
          <PlayerSlider />
        </View>
      )}

      <View className="flex h-full w-[20%] max-w-[20%]" />
    </View>
  )
}
