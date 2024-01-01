import { ComponentProps, forwardRef } from 'react'
import { Text, Platform, Linking } from 'react-native'

/**
 * You can use this pattern to create components with default styles
 */
export function P({
  className,
  ...rest
}: { className?: string } & ComponentProps<typeof Text>) {
  const defaultStyles = 'text-base text-black'
  return <Text className={`${defaultStyles} ${className}`} {...rest} />
}

/**
 * Components can have defaultProps and styles
 */
export function H1({
  className,
  ...rest
}: { className?: string } & ComponentProps<typeof Text>) {
  const defaultStyles = 'my-4 text-3xl font-extrabold'
  return (
    <Text
      className={`${defaultStyles} ${className}`}
      {...rest}
      accessibilityLevel={1}
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
      className={`text-blue-500 hover:underline ${className}`}
      {...props}
      {...nativeAProps}
      ref={ref}
    />
  )
})
