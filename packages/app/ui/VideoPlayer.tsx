import { ResizeMode, Video } from 'expo-av'
import { useEffect, useMemo, useState } from 'react'
import {
  Platform,
  ViewStyle,
  View,
  useWindowDimensions,
  PixelRatio,
} from 'react-native'
import { useRecoilValue } from 'recoil'
import { usePlayback } from 'app/hooks/usePlayback'
import { userAtom } from 'app/state/user'
import { min } from 'ramda'
import { SolitoImage } from 'solito/image'
import { imageUrlMedium, imageUrlSmall } from 'app/utils/entry'
import { cssInterop, remapProps } from 'nativewind'

type Props = {
  style?: ViewStyle
  className?: string
  videoClassName?: string
}

cssInterop(Video, {
  className: 'style',
  videoClassName: 'videoStyle',
})

export function VideoPlayer({ style, className, videoClassName }: Props) {
  const user = useRecoilValue(userAtom)
  const [aspectRatio, setAspectRatio] = useState<number>(0)
  const {
    onReadyForDisplay,
    playEntry,
    entry,
    playbackUri,
    playback,
    setPlayback,
    playbackState,
    onPlaybackStatusUpdate,
    onError,
    resetPlayer,
  } = usePlayback()

  const getVideoUri = () => {
    // we need to provide correct uri only for web
    // on native we can change uri using loadAsync
    if (Platform.OS === 'web' && entry) {
      return { uri: playbackUri }
    }
    return undefined
  }

  useEffect(() => {
    return () => {
      // resets player when component is unmounted
      resetPlayer()
    }
  }, [])

  useEffect(() => {
    // play the last played entry
    if (playback && playbackState === 'IDLE' && user?.lastPlayedEntry) {
      playEntry(user.lastPlayedEntry, [user.lastPlayedEntry], false)
    }
  }, [playback, user, playEntry, playbackState])

  useEffect(() => {
    if (playbackState === 'LOADING' || playbackState === 'FALLBACK') {
      setAspectRatio(0)
    }
  }, [playbackState])

  return (
    <View className="items-center justify-center" style={[style]}>
      {/* {posterUri && (
        <SolitoImage
          width={posterSize}
          height={posterSize}
          src={posterUri}
          style={{
            borderRadius: fixedSize ? 6 : 0,
            aspectRatio: 1 / 1,
          }}
          alt="player"
          contentFit="cover"
        />
      )} */}
      <Video
        source={getVideoUri()}
        ref={(ref) => {
          if (ref && !playback) {
            setPlayback(ref)
          }
        }}
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        resizeMode={ResizeMode.COVER}
        // @ts-ignore
        videoClassName={`h-full w-full max-h-[50vh]  ${
          videoClassName ? videoClassName : 'md:max-w-[3.5rem]'
        }`}
        videoStyle={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
        }}
        className={`aspect-square max-h-[50vh] w-screen items-center justify-center  md:rounded-md ${
          className ? className : 'md:max-w-[3.5rem]'
        }`}
        onReadyForDisplay={(event: any) => {
          let videoAspectRatio = 0
          if (event.naturalSize) {
            const { width, height } = event.naturalSize
            if (width && height) {
              videoAspectRatio = width / height
            }
          } else if (event?.target) {
            const { videoHeight, videoWidth } = event.target
            if (videoHeight && videoWidth) {
              videoAspectRatio = videoWidth / videoHeight
            }
          }
          setAspectRatio(videoAspectRatio)

          onReadyForDisplay()
        }}
        onError={onError}
      />
    </View>
  )
}
