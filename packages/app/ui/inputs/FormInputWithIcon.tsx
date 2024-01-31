import { ReactElement } from 'react'
import { Text, View, TextInputProps, TextInput } from 'react-native'
import { IconProps } from 'app/types'
import { theme } from 'app/design/tailwind/theme'

type Props = {
  icon: (_props: IconProps) => ReactElement
  iconProps?: IconProps
  containerClassNames?: string
  error?: string
}

const defaultIconProps = {
  color: (theme as any)?.colors?.['white']['DEFAULT'],
  size: 22,
}

export function FormInputWithIcon({
  style,
  containerClassNames = '',
  placeholderTextColor,
  icon,
  iconProps,
  error,
  ...rest
}: TextInputProps & Props) {
  return (
    <View className={`flex py-5 ${containerClassNames}`}>
      <View className="flex w-full flex-row items-center">
        {icon(iconProps ?? defaultIconProps)}
        <TextInput
          className="ml-4 grow text-gray-600 outline-none"
          style={[style]}
          placeholderTextColor={
            placeholderTextColor ?? (theme as any)?.colors?.['white']['DEFAULT']
          }
          {...rest}
        />
      </View>
      {error !== undefined && <Text className="text-red mt-3">{error}</Text>}
    </View>
  )
}
