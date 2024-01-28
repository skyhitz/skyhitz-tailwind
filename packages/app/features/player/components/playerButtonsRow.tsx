import { View, Pressable } from 'react-native'
import ShuffleIcon from 'app/ui/icons/shuffle'
import PrevIcon from 'app/ui/icons/skip-backward'
import NextIcon from 'app/ui/icons/skip-forward'
import PlayIcon from 'app/ui/icons/play'
import PauseIcon from 'app/ui/icons/pause'
import LoopIcon from 'app/ui/icons/repeat'
import { usePlayback } from 'app/hooks/usePlayback'
import { ActivityIndicator } from 'app/design/typography'

const style = {
  default: 'h-10 max-w-xs',
  large: 'h-20',
}

type Props = {
  size?: 'default' | 'large'
  className?: string
}

export function PlayerButtonsRow({ size = 'default', className }: Props) {
  const {
    playPause,
    skipForward,
    skipBackward,
    toggleLoop,
    shuffle,
    playbackState,
    looping,
    toggleShuffle,
  } = usePlayback()
  const sizeModificator = size === 'large' ? 6 : 0

  return (
    <View
      className={`flex w-full max-w-[18rem] flex-row items-center justify-evenly ${style[size]} ${className}`}
    >
      <Pressable onPress={toggleShuffle}>
        <ShuffleIcon
          className={shuffle ? 'text-blue-light' : 'text-gray-600'}
          size={14 + sizeModificator}
        />
      </Pressable>
      <Pressable onPress={skipBackward}>
        <PrevIcon className={'text-gray-600'} size={18 + sizeModificator} />
      </Pressable>
      {playbackState === 'LOADING' || playbackState === 'FALLBACK' ? (
        <ActivityIndicator />
      ) : (
        <Pressable onPress={playPause}>
          {playbackState === 'PLAYING' ? (
            <PauseIcon className="text-gray-600" size={22 + sizeModificator} />
          ) : (
            <PlayIcon className="text-gray-600" size={22 + sizeModificator} />
          )}
        </Pressable>
      )}
      <Pressable onPress={skipForward}>
        <NextIcon className="text-gray-600" size={18 + sizeModificator} />
      </Pressable>
      <Pressable onPress={toggleLoop}>
        <LoopIcon
          className={looping ? 'text-blue-light' : 'text-gray-600'}
          size={14 + sizeModificator}
        />
      </Pressable>
    </View>
  )
}
