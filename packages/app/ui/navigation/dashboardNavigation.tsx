import { useMemo } from 'react'
import { View } from 'react-native'
import Navbar from 'app/ui/navbar'
import { MobileTabBarWrapper } from './mobileTabBarWrapper'
import { useRecoilValue } from 'recoil'
import { userAtom } from 'app/state/user'
import { ClientOnly } from '../client-only'
import { usePathname } from 'solito/navigation'
import DashboardTabBar from './dashboardTabBar'

export function DashboardNavigation({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const route = pathname || ''
  const currentTabName = useMemo(() => route.split('/').at(-1) || '', [route])
  const user = useRecoilValue(userAtom)

  return (
    <View className="flex h-[calc(100dvh)] flex-1 overflow-hidden">
      <Navbar className="hidden md:flex" />

      <View className="flex flex-1 flex-row">
        <ClientOnly>
          {!!user && (
            <DashboardTabBar
              className="hidden md:flex"
              currentTabName={currentTabName}
              column
            />
          )}
        </ClientOnly>
        {children}
      </View>

      <ClientOnly>
        {user && <MobileTabBarWrapper currentTabName={currentTabName} />}
      </ClientOnly>
    </View>
  )
}
