import Slider from '@react-native-community/slider'
import { theme } from 'app/design/tailwind/theme'

type Props = {
  minimumValue: number
  maximumValue: number
  value: number
  onSlidingStart?: () => void
  onValueChange?: (newValue: number) => void
  onSlidingComplete?: (newValue: number) => void
}

export function SkyhitzSlider(props: Props) {
  return (
    <Slider
      style={{ flex: 1 }}
      minimumTrackTintColor={theme?.extend?.colors?.['blue']['brand']}
      maximumTrackTintColor={theme?.extend?.colors?.['white']['DEFAULT']}
      thumbTintColor={theme?.extend?.colors?.['white']['DEFAULT']}
      // @ts-ignore
      thumbSize={12}
      {...props}
    />
  )
}
