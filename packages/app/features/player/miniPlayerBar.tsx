import { View } from 'react-native'
import { Pressable, ViewStyle } from 'react-native'
import ChevronUp from 'app/ui/icons/chevron-up'
import PlayIcon from 'app/ui/icons/play'
import PauseIcon from 'app/ui/icons/pause'
import Animated from 'react-native-reanimated'

import { usePlayback } from 'app/hooks/usePlayback'
import { ActivityIndicator, P } from 'app/design/typography'

type Props = {
  onTogglePress?: () => void
  animatedStyle: ViewStyle
}

export function MiniPlayerBar({ onTogglePress, animatedStyle }: Props) {
  const { playPause, playbackState, entry } = usePlayback()

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          display:
            playbackState === 'IDLE' || playbackState === 'ERROR'
              ? 'none'
              : 'flex',
          height: 40,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        },
      ]}
    >
      <Pressable onPress={onTogglePress}>
        <View className="flex flex-row items-center">
          <ChevronUp className="text-gray-600" />
          <P className="ml-2.5 pl-1 text-sm">
            {entry?.title} - {entry?.artist}
          </P>
        </View>
      </Pressable>
      {playbackState === 'LOADING' || playbackState === 'FALLBACK' ? (
        <ActivityIndicator />
      ) : (
        <Pressable onPress={playPause}>
          {playbackState === 'PLAYING' ? (
            <PauseIcon className="text-gray-600" size={22} />
          ) : (
            <PlayIcon className="text-gray-600" size={22} />
          )}
        </Pressable>
      )}
    </Animated.View>
  )
}
