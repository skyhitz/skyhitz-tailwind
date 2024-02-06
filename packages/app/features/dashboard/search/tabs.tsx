import { P } from 'app/design/typography'
import { Pressable, View } from 'react-native'

export type Tabs = 'MFTs' | 'Collectors'

type TabBarProps = {
  selected: Tabs
  onTabClick?: (tab: Tabs) => void
}

export function TabBar({ onTabClick, selected }: TabBarProps) {
  return (
    <View className="flex w-full flex-row">
      <Pressable className="grow py-4" onPress={() => onTabClick?.('MFTs')}>
        <P
          className={`${
            selected === 'MFTs' ? 'text-gray-600' : 'text-neutral-500'
          } mx-auto text-sm`}
        >
          MFTs
        </P>
      </Pressable>
      <Pressable
        className="grow py-4"
        onPress={() => onTabClick?.('Collectors')}
      >
        <P
          className={`${
            selected === 'Collectors' ? 'text-gray-600' : 'text-neutral-500'
          } mx-auto text-sm`}
        >
          Collectors
        </P>
      </Pressable>
    </View>
  )
}
