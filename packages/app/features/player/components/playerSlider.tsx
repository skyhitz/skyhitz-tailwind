import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { usePlayback } from 'app/hooks/usePlayback'
import { any, equals } from 'ramda'
import { Slider } from 'app/ui/SkyhitzSlider'

export function PlayerSlider({ className }: { className?: string }) {
  const { startSeeking, onSeekCompleted, duration, position, playbackState } =
    usePlayback()
  const [seekPosition, setSeekPosition] = useState<number>(position)
  const songTime = duration / 1000
  const currentTime =
    playbackState === 'SEEKING' ? seekPosition / 1000 : position / 1000

  return (
    <View
      className={`flex w-full max-w-lg flex-row items-center justify-between ${className}`}
    >
      <Text className="mr-3 mt-0.5 w-10 text-right text-[.65rem] text-gray-600">
        {Math.floor(currentTime / 60)}:
        {Math.floor(currentTime % 60)
          .toString()
          .padStart(2, '0')}
      </Text>

      <View
        className="flex-1"
        pointerEvents={
          any(equals(playbackState), ['LOADING', 'IDLE', 'ERROR', 'FALLBACK'])
            ? 'none'
            : 'auto'
        }
      >
        <Slider
          onValueChange={(val) => setSeekPosition(val * duration)}
          onSlidingStart={startSeeking}
          onSlidingComplete={(val) => {
            onSeekCompleted(val * duration)
          }}
          progress={position / duration}
        />
      </View>

      <Text className="ml-3 mt-0.5 w-10 text-[.65rem] text-gray-600">
        {Math.floor(songTime / 60)}:
        {Math.floor(songTime % 60)
          .toString()
          .padStart(2, '0')}
      </Text>
    </View>
  )
}
