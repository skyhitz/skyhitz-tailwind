import { P } from 'app/design/typography'
import { SkyhitzLogo } from './logo'
// import { userAtom } from 'app/state/user'
// import { useRecoilValue } from 'recoil'
import { Text, View } from 'react-native'
import { MotiLink as TextLink } from 'solito/moti'

const Navbar = () => {
  //   const user = useRecoilValue(userAtom)

  const user = null

  return (
    <View className="w-full flex-row flex-wrap items-center justify-center p-3 sm:justify-between">
      <View className="flex sm:flex-row">
        <TextLink href="/">
          <View className="flex flex-row items-center justify-start">
            <View className="flex flex-row items-center">
              <SkyhitzLogo />
              <Text className="font-raleway pl-4 text-lg tracking-[12px]">
                SKYHITZ
              </Text>
            </View>
          </View>
        </TextLink>
        {user ? null : (
          <View className="ml-8 hidden flex-row items-center sm:flex">
            <TextLink href="/dashboard/chart">
              <Text className="mr-4 text-sm">Chart</Text>
            </TextLink>
            <TextLink href="/dashboard/search">
              <Text className="mr-4 text-sm">Search</Text>
            </TextLink>
          </View>
        )}
      </View>

      {user ? null : (
        <View className="hidden flex-row items-center justify-end sm:flex">
          <TextLink href="/sign-in">
            <P className="font-raleway tracking-0.5 mr-4 text-sm font-bold">
              Log in
            </P>
          </TextLink>

          <View className="rounded-full bg-white px-3">
            <TextLink href="/sign-up">
              <P className="font-raleway tracking-0.5 p-2 text-sm font-bold text-black">
                Sign Up
              </P>
            </TextLink>
          </View>
        </View>
      )}
    </View>
  )
}

export default Navbar
