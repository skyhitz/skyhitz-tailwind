import { ComponentProps, forwardRef } from 'react'
import { Text, Platform, Linking, Pressable } from 'react-native'

/**
 * You can use this pattern to create components with default styles
 */
export function P({
  className,
  ...rest
}: { className?: string } & ComponentProps<typeof Text>) {
  const defaultStyles = 'text-base text-gray-600'
  return <Text className={`${defaultStyles} ${className}`} {...rest} />
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
      accessibilityLevel={1}
      accessibilityRole="header"
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
      accessibilityLevel={2}
      accessibilityRole="header"
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
      accessibilityLevel={3}
      accessibilityRole="header"
    ></Text>
  )
}

/**
 * This is a more advanced component with custom styles and per-platform functionality
 */
export interface AProps extends ComponentProps<typeof Text> {
  href?: string
  target?: '_blank'
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
      accessibilityRole="link"
      className={`text-blue-500 ${className} cursor-pointer`}
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
