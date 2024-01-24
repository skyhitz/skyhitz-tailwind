import { View } from 'react-native'
import Navbar from 'app/ui/navbar'
import DashboardTabBar from 'app/ui/navigation/dashboardTabBar'
import React, { useMemo } from 'react'
import { PlayerBar } from 'app/features/player/playerBar'
import { MobileTabBarWrapper } from './mobileTabBarWrapper'
import { useRecoilValue } from 'recoil'
import { userAtom } from 'app/state/user'
import { useNextRouter } from 'solito/build/router/use-next-router'

export function DashboardNavigation({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useNextRouter()
  const route = router?.route || ''
  const currentTabName = useMemo(() => route.split('/').at(-1) || '', [route])
  const user = useRecoilValue(userAtom)

  return (
    <View className="flex h-screen overflow-hidden">
      <Navbar />
      <View className="flex flex-1 flex-row">
        {!!user && (
          <DashboardTabBar
            className="md:hidden"
            currentTabName={currentTabName}
            column
          />
        )}
        {children}
      </View>
      {/* <PlayerBar className="hidden md:flex" /> */}

      {/* <View className="flex md:hidden"> */}
      <MobileTabBarWrapper currentTabName={currentTabName} />
      {/* </View> */}
    </View>
  )
}
