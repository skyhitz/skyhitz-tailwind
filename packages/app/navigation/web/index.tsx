import { View } from 'react-native'
import React from 'react'
import { useNextRouter } from 'solito/build/router/use-next-router'
import { DashboardNavigation } from 'app/ui/navigation/dashboardNavigation'

export function WebNavigation({ children }: { children: React.ReactNode }) {
  const router = useNextRouter()
  const route = router?.route
  if (route && route.includes('dashboard')) {
    return <DashboardNavigation>{children}</DashboardNavigation>
  }
  return <View className="flex flex-1">{children}</View>
}
