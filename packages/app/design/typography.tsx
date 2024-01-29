import { ComponentProps, forwardRef } from 'react'
import {
  Text,
  Platform,
  Linking,
  Pressable,
  ActivityIndicator as NativeActivityIndicator,
  Role,
} from 'react-native'
import { theme } from './tailwind/theme'

/**
 * You can use this pattern to create components with default styles
 */
export function P({
  className,
  ...rest
}: { className?: string } & ComponentProps<typeof Text>) {
  const defaultStyles = 'text-base text-gray-600'
  return (
    <Text
      className={`${defaultStyles} ${className}`}
      {...rest}
      role={'paragraph' as Role}
    />
  )
}

/**
 * Components can have defaultProps and styles
 */
export function H1({
  className,
  ...rest
}: { className?: string } & ComponentProps<typeof Text>) {
  const defaultStyles = 'my-4 text-3xl font-extrabold font-unbounded'
  return (
    <Text
      className={`${defaultStyles} ${className}`}
      {...rest}
      aria-level={1}
      role="heading"
    ></Text>
  )
}

export function H2({
  className,
  ...rest
}: { className?: string } & ComponentProps<typeof Text>) {
  const defaultStyles = 'font-extrabold font-unbounded'
  return (
    <Text
      className={`${defaultStyles} ${className}`}
      {...rest}
      aria-level={2}
      role="heading"
    ></Text>
  )
}

export function H3({
  className,
  ...rest
}: { className?: string } & ComponentProps<typeof Text>) {
  const defaultStyles = 'font-extrabold font-unbounded'
  return (
    <Text
      className={`${defaultStyles} ${className}`}
      {...rest}
      aria-level={3}
      role="heading"
    ></Text>
  )
}

/**
 * This is a more advanced component with custom styles and per-platform functionality
 */
export interface AProps extends ComponentProps<typeof Text> {
  href?: string
  target?: '_blank'
  variant?: string
}

export const A = forwardRef<Text, AProps>(function A(
  { className = '', href, target, ...props },
  ref,
) {
  const nativeAProps = Platform.select<Partial<AProps>>({
    web: {
      href,
      target,
      hrefAttrs: {
        rel: 'noreferrer',
        target,
      },
    },
    default: {
      onPress: (event) => {
        props.onPress && props.onPress(event)
        if (Platform.OS !== 'web' && href !== undefined) {
          Linking.openURL(href)
        }
      },
    },
  })

  return (
    <Text
      role="link"
      className={
        props.variant === 'primary'
          ? `bg-blue-brand hover:bg-blue-brand focus-visible:outline-blue-brand w-fit rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${className}`
          : `text-blue-brand cursor-pointer ${className}`
      }
      {...props}
      {...nativeAProps}
      ref={ref}
    />
  )
})

export function Button({
  className,
  ...rest
}: { className?: string } & ComponentProps<typeof Text>) {
  const defaultStyles = 'text-sm font-semibold text-white'
  return (
    <Pressable
      {...rest}
      className="bg-blue-brand hover:bg-blue-brand focus-visible:outline-blue-brand w-fit rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <Text className={`${defaultStyles} ${className}`} {...rest} />
    </Pressable>
  )
}

export function ActivityIndicator({
  className,
  grey,
  ...rest
}: { className?: string; grey?: boolean } & ComponentProps<
  typeof NativeActivityIndicator
>) {
  return (
    <NativeActivityIndicator
      color={
        grey
          ? (theme as any)?.extend?.colors?.['grey']['DEFAULT']
          : (theme as any)?.extend?.colors?.['blue']['brand']
      }
      {...rest}
    />
  )
}
