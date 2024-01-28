import { GestureResponderEvent, Pressable } from 'react-native'
import { ActivityIndicator, P } from 'app/design/typography'
import { IconProps } from 'app/types'
import { FormEvent, ReactElement } from 'react'
import { theme } from './tailwind/theme'

type Props = {
  loading?: boolean
  text: string
  onPress: (e?: GestureResponderEvent | FormEvent<HTMLFormElement>) => void
  size?: 'default' | 'large' | 'small'
  variant?: 'primary' | 'secondary' | 'white' | 'text'
  icon?: (_props: IconProps) => ReactElement
  iconProps?: IconProps
  disabled?: boolean
  className?: string
  onDisabledPress?: () => void
  useTouchable?: boolean
}

const textStyle = {
  default: 'text-sm',
  small: 'text-xs',
  large: 'text-base font-bold',
  primary: 'text-white',
  secondary: 'text-white',
  white: 'text-black',
  text: 'text-sm',
}

const containerStyle = {
  default: 'px-5 py-3 w-40',
  small: 'px-2 py-2 w-20',
  large: 'px-10 py-3 w-72',
  primary: 'bg-blue',
  secondary: 'bg-grey',
  white: 'bg-white',
  text: 'flex mx-auto mt-8',
}

const disabledStyle = {
  default: 'bg-grey-dark',
  large: 'bg-grey-dark',
  primary: 'bg-gray-700/20',
  secondary: 'bg-grey-dark',
  white: 'bg-grey-dark',
  text: 'text-white',
}

const Button = ({
  loading = false,
  text,
  onPress,
  size = 'default',
  variant = 'primary',
  icon,
  iconProps,
  disabled = false,
  className,
  onDisabledPress,
  useTouchable = false,
}: Props) => {
  const defaultIconProps = {
    color: disabled
      ? (theme as any)?.extend?.colors?.['grey']['DEFAULT']
      : (theme as any)?.extend?.colors?.['white']['DEFAULT'],
    size: 22,
  }

  return (
    <Pressable
      className={`flex-row items-center justify-center rounded-md ${
        containerStyle[size]
      } ${disabled ? disabledStyle[variant] : containerStyle[variant]} ${
        className ?? ''
      }`}
      onPress={(e) => {
        if (disabled && onDisabledPress) {
          onDisabledPress()
        } else if (!disabled) {
          onPress(e)
        }
      }}
    >
      {loading ? (
        <ActivityIndicator size="small" className="text-white" />
      ) : (
        <>
          <P
            className={`text-center font-semibold tracking-wider ${
              textStyle[size]
            } ${disabled ? 'text-white' : textStyle[variant]} ${
              icon ? 'mr-2' : ''
            }`}
          >
            {text}
          </P>
          {icon !== undefined && icon(iconProps ?? defaultIconProps)}
        </>
      )}
    </Pressable>
  )
}

export { Button }
