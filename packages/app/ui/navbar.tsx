import { P } from 'app/design/typography'
import { SkyhitzLogo } from './logo'
import { userAtom } from 'app/state/user'
import { useRecoilValue } from 'recoil'
import { Text, View } from 'react-native'
import { MotiLink as TextLink } from 'solito/moti/app'
import { ClientOnly } from './client-only'

const Navbar = ({ className }: { className?: string }) => {
  const user = useRecoilValue(userAtom)

  return (
    <View
      className={`w-full flex-row flex-wrap items-center justify-center p-3 sm:justify-between ${className}`}
    >
      <View className="flex sm:flex-row">
        <TextLink href="/">
          <View className="flex flex-row items-center justify-start">
            <View className="flex min-h-[2.25rem] flex-row items-center">
              <SkyhitzLogo id="navbar" />
              <Text className="font-raleway pl-4 text-lg tracking-[12px] text-gray-600">
                SKYHITZ
              </Text>
            </View>
          </View>
        </TextLink>
        <ClientOnly>
          {user ? null : (
            <View className="ml-8 hidden flex-row items-center sm:flex">
              <TextLink href="/dashboard/chart">
                <P className="mr-4 text-sm">Chart</P>
              </TextLink>
              <TextLink href="/dashboard/search">
                <P className="mr-4 text-sm">Search</P>
              </TextLink>
            </View>
          )}
        </ClientOnly>
      </View>
      <ClientOnly>
        {user ? null : (
          <View className="hidden flex-row items-center justify-end sm:flex">
            <TextLink href="/sign-in">
              <P className="font-raleway tracking-0.5 mr-4 text-sm font-bold">
                Log in
              </P>
            </TextLink>

            <View className="bg-blue rounded-full px-3">
              <TextLink href="/sign-up">
                <P className="font-raleway tracking-0.5 p-2 text-sm font-bold text-white">
                  Sign Up
                </P>
              </TextLink>
            </View>
          </View>
        )}
      </ClientOnly>
    </View>
  )
}

export default Navbar
