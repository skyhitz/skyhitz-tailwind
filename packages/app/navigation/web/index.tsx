'use client'
import { View } from 'react-native'
import React from 'react'
import { usePathname } from 'solito/navigation'
import { DashboardNavigation } from 'app/ui/navigation/dashboardNavigation'

export function WebNavigation({ children }: { children: React.ReactNode }) {
  // const pathname = usePathname()
  // if (
  //   pathname &&
  //   (pathname.includes('profile') ||
  //     pathname.includes('chart') ||
  //     pathname.includes('search') ||
  //     pathname.includes('beat'))
  // ) {
  return <DashboardNavigation>{children}</DashboardNavigation>
  // }
  // return <View className="flex flex-1">{children}</View>
}
