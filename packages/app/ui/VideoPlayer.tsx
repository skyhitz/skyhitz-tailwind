import { useEffect, useMemo, useState } from 'react'
import { Platform, ViewStyle, View } from 'react-native'
import { useRecoilValue } from 'recoil'
import { usePlayback } from 'app/hooks/usePlayback'
import { userAtom } from 'app/state/user'
import { imageUrlMedium } from 'app/utils/entry'
import { SolitoImage } from 'app/design/solito-image'
import { Video, ResizeMode } from 'app/design/video'

type Props = {
  style?: ViewStyle
  className?: string
  videoClassName?: string
}

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
  }, [resetPlayer])

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

  const posterUri = useMemo(() => {
    if (entry?.imageUrl) {
      return imageUrlMedium(entry.imageUrl)
    }
    return undefined
  }, [entry])

  return (
    <View className="items-center justify-center" style={[style]}>
      {posterUri && (
        <View className="absolute aspect-square max-h-[50vh] w-screen items-center justify-center  md:max-w-[3.5rem] md:rounded-md">
          <SolitoImage
            fill
            src={posterUri}
            // @ts-ignore
            className={'aspect-square md:rounded-md'}
            alt="player"
            contentFit="cover"
            sizes="(max-width: 768px) 100vw"
          />
        </View>
      )}

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
        videoClassName={`h-full w-full max-h-[50vh] md:max-w-[3.5rem] ${videoClassName}`}
        videoStyle={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
        }}
        className={`aspect-square max-h-[50vh] w-screen items-center justify-center  md:max-w-[3.5rem] md:rounded-md ${className}`}
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
