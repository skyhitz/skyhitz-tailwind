import { imageSrc } from 'app/utils/entry'
import { UserAvatar } from 'app/ui/userAvatar'
import Twitter from 'app/ui/icons/twitter'
import Instagram from 'app/ui/icons/instagram'
import { Linking, Pressable, View } from 'react-native'
import { ShareButton } from 'app/ui/buttons/ShareButton'
import { SolitoImage } from 'app/design/solito-image'

type Props = {
  background: string
  avatar: string
  displayName: string
  twitter?: string
  instagram?: string
  profileUrl?: string
}
export function ProfileHeader({
  background,
  avatar,
  displayName,
  twitter,
  instagram,
  profileUrl,
}: Props) {
  return (
    <View className="h-50 md:h-70 w-full">
      {background ? (
        <SolitoImage
          src={imageSrc(background)}
          // @ts-ignore
          className="h-40 w-full md:h-60"
          contentFit="cover"
          fill
        />
      ) : (
        <View className="h-40 w-full bg-gray-200 md:h-60" />
      )}

      <View className="absolute bottom-0 left-5 flex-row items-end md:left-20">
        <UserAvatar
          avatarUrl={avatar}
          displayName={displayName}
          size="xlarge"
        />
      </View>
      <View className="-bottom-4 flex flex-row-reverse items-center">
        {!!twitter && (
          <Pressable
            className="ml-3 mr-3"
            onPress={() => Linking.openURL(`https://twitter.com/${twitter}`)}
          >
            <Twitter size={20} className="text-white" />
          </Pressable>
        )}
        {!!instagram && (
          <Pressable
            className="ml-3 mr-3"
            onPress={() =>
              Linking.openURL(`https://instagram.com/${instagram}`)
            }
          >
            <Instagram size={20} className="text-white" />
          </Pressable>
        )}
        {!!profileUrl && (
          <View className="mr-3">
            <ShareButton url={profileUrl} title="Share profile" />
          </View>
        )}
      </View>
    </View>
  )
}
