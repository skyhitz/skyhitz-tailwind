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
import { MotiView } from 'app/design/moti'

type Props = {
  onTogglePress: () => void
  animatedStyle: any
}

export function FullScreenPlayer({ onTogglePress, animatedStyle }: Props) {
  const { playbackState, entry } = usePlayback()

  return (
    <MotiView
      style={[animatedStyle]}
      className="absolute z-[1] w-full opacity-0 md:z-10 md:flex md:py-2 md:!opacity-100"
    >
      <SafeAreaView className="flex h-full items-center px-4">
        <Pressable
          className="flex w-full flex-row items-center py-4 md:hidden"
          onPress={onTogglePress}
          hitSlop={10}
        >
          <ChevronDown className="text-gray-600" size={24} />
        </Pressable>
        <View className="w-full items-center justify-between gap-y-8 md:flex-row">
          <VideoPlayer />

          {playbackState === 'ERROR' || !entry ? (
            <View>
              <Text className="text-red">Something went wrong. Try again.</Text>
            </View>
          ) : (
            <>
              <PlayerSlider className="md:hidden" />
              <View className="flex-1 items-center justify-center md:max-w-[200px] md:items-start md:px-4">
                <Text
                  className="text-center text-sm font-bold text-gray-600"
                  ellipsizeMode="tail"
                  numberOfLines={1}
                >
                  {entry?.title}
                </Text>
                <Text
                  className="text-center text-base text-gray-600 md:text-xs"
                  ellipsizeMode="tail"
                  numberOfLines={1}
                >
                  {entry?.artist}
                </Text>
              </View>
              <View className="md:hidden">
                <BuyNowBtn entry={entry!} />
              </View>
              <PlayerButtonsRow size="large" className="md:hidden" />
              <View className="hidden grow items-center justify-evenly pb-1 md:flex">
                <PlayerButtonsRow />
                <PlayerSlider />
              </View>
              <View className="hidden h-full w-64 lg:flex" />
              {entry && (
                <LikesList
                  entry={entry}
                  showLikeButton
                  useAndroidHorizontalList={Platform.OS === 'android'}
                  classname="md:hidden"
                />
              )}
            </>
          )}
        </View>
      </SafeAreaView>
    </MotiView>
  )
}
