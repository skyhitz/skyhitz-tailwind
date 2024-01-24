import {
  Pressable,
  SafeAreaView,
  Text,
  View,
  ViewStyle,
  Platform,
} from 'react-native'
import ChevronDown from 'app/ui/icons/chevron-down'
import { LikesList } from './components/likesList'
import { PlayerButtonsRow } from './components/playerButtonsRow'
import { PlayerSlider } from './components/playerSlider'
import { VideoPlayer } from 'app/ui/VideoPlayer'
import { usePlayback } from 'app/hooks/usePlayback'
import { BuyNowBtn } from 'app/ui/buttons/BuyNowBtn'
import { cssInterop } from 'nativewind'
import { MotiView } from 'moti'

type Props = {
  onTogglePress: () => void
  animatedStyle: any
}

cssInterop(MotiView, { className: 'style' })

export function FullScreenPlayer({ onTogglePress, animatedStyle }: Props) {
  const { playbackState, entry } = usePlayback()

  return (
    <MotiView style={[animatedStyle]} className="absolute w-full">
      <SafeAreaView className="flex h-full items-center px-4">
        <Pressable
          className="flex w-full flex-row items-center py-4"
          onPress={onTogglePress}
          hitSlop={10}
        >
          <ChevronDown className="text-gray-600" size={24} />
        </Pressable>
        <View className="w-full items-center justify-between gap-y-8">
          <VideoPlayer maxHeight={200} />

          {playbackState === 'ERROR' || !entry ? (
            <View>
              <Text className="text-red">Something went wrong. Try again.</Text>
            </View>
          ) : (
            <>
              <PlayerSlider />
              <View className="flex-1 items-center justify-center">
                <Text
                  className="text-center text-sm font-bold text-gray-600"
                  ellipsizeMode="tail"
                  numberOfLines={1}
                >
                  {entry?.title}
                </Text>
                <Text
                  className="text-center text-base text-gray-600"
                  ellipsizeMode="tail"
                  numberOfLines={1}
                >
                  {entry?.artist}
                </Text>
              </View>
              <BuyNowBtn entry={entry!} />
              <PlayerButtonsRow size="large" />
              {entry && (
                <LikesList
                  entry={entry}
                  showLikeButton
                  useAndroidHorizontalList={Platform.OS === 'android'}
                />
              )}
            </>
          )}
        </View>
      </SafeAreaView>
    </MotiView>
  )
}
