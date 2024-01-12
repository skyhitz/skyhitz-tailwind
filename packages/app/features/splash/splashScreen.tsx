import { View } from 'react-native'
import { ActivityIndicator } from 'app/design/typography'

export function SplashScreen() {
  return (
    <View className="bg-blue-dark flex h-full w-full flex-1 items-center justify-center">
      <ActivityIndicator />
    </View>
  )
}
