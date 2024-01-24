import DashboardTabBar from 'app/ui/navigation/dashboardTabBar'
import { useCallback, useEffect, useMemo } from 'react'
import { MiniPlayerBar } from 'app/features/player/miniPlayerBar'
import { FullScreenPlayer } from 'app/features/player/fullScreenPlayer'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  withDecay,
  withTiming,
} from 'react-native-reanimated'
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler'
import { Platform, View, useWindowDimensions } from 'react-native'
import { usePlayback } from 'app/hooks/usePlayback'
import { useSafeArea } from 'app/provider/safe-area/use-safe-area'

const fullAnimationDuration = 400

export function MobileTabBarWrapper({
  currentTabName,
  className,
}: {
  currentTabName: string
  className?: string
}) {
  const insets = useSafeArea()
  const { playbackState } = usePlayback()
  const { height } = useWindowDimensions()

  const tabBarHeight = useMemo(() => {
    let height = 54 + insets.bottom
    if (playbackState !== 'IDLE' && playbackState !== 'ERROR') {
      height = height + 40
    }
    return height
  }, [insets, playbackState]) // 52 + 2 border + 40 miniplayer

  const maxHeight = useMemo(() => height + insets.top, [insets])

  const y = useSharedValue(tabBarHeight)
  const dragStart = useSharedValue(tabBarHeight)

  useEffect(() => {
    y.value = tabBarHeight
  }, [tabBarHeight])

  const gestureHandler = useMemo(
    () =>
      Gesture.Pan()
        .enabled(Platform.OS !== 'web')
        .onStart((_) => {
          dragStart.value = y.value
        })
        .onUpdate((event) => {
          y.value = Math.min(
            maxHeight,
            Math.max(tabBarHeight, dragStart.value - event.translationY),
          )
        })
        .onEnd((event) => {
          const minVelocity =
            (maxHeight - tabBarHeight) / (fullAnimationDuration / 1000)
          const threshold = (maxHeight - tabBarHeight) / 2
          let velocity = y.value > threshold ? minVelocity : -minVelocity
          if (event.velocityY > 0) {
            velocity = Math.min(-minVelocity, -event.velocityY)
          } else if (event.velocityY < 0) {
            velocity = Math.max(minVelocity, -event.velocityY)
          }
          y.value = withDecay({
            velocity,
            deceleration: 1,
            clamp: [tabBarHeight, maxHeight],
          })
        }),
    [tabBarHeight, maxHeight],
  )

  const draggableStyle = useAnimatedStyle(() => {
    return {
      height: y.value,
    }
  }, [y])

  const playerBarStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      y.value,
      [tabBarHeight, maxHeight / 3],
      [1, 0],
      Extrapolation.CLAMP,
    )
    return {
      opacity,
      zIndex: y.value === tabBarHeight ? 10 : -1,
    }
  }, [tabBarHeight, maxHeight, y])

  const tabBarStyle = useAnimatedStyle(() => {
    const translation = interpolate(
      y.value,
      [tabBarHeight, maxHeight],
      [0, tabBarHeight],
      Extrapolation.CLAMP,
    )

    return {
      transform: [
        {
          translateY: translation,
        },
      ],
    }
  }, [tabBarHeight, maxHeight, y])

  const fullScreenPlayerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      y.value,
      [tabBarHeight, maxHeight / 3],
      [0, 1],
      Extrapolation.CLAMP,
    )
    return {
      opacity,
      zIndex: y.value === maxHeight ? 10 : 1,
    }
  }, [tabBarHeight, maxHeight, y])

  const onExpand = useCallback(() => {
    y.value = withTiming(maxHeight, { duration: fullAnimationDuration })
  }, [y, maxHeight])

  const onHide = useCallback(() => {
    y.value = withTiming(tabBarHeight, { duration: fullAnimationDuration })
  }, [y, tabBarHeight])

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={gestureHandler}>
        <Animated.View
          style={[
            { justifyContent: 'space-between', display: 'flex' },
            draggableStyle,
          ]}
        >
          <View>
            <MiniPlayerBar
              onTogglePress={onExpand}
              animatedStyle={playerBarStyle}
            />
            <FullScreenPlayer
              onTogglePress={onHide}
              animatedStyle={fullScreenPlayerStyle}
            />
          </View>

          <Animated.View style={[{ zIndex: 10 }, tabBarStyle]}>
            <DashboardTabBar currentTabName={currentTabName} />
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  )
}
