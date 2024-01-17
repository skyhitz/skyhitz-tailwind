import { Pressable } from 'react-native'
import Like from 'app/ui/icons/like'
import { Entry, useLikeEntryMutation, useUserLikesQuery } from 'app/api/graphql'
import useLikeCache from 'app/hooks/useLikeCache'
import { ErrorType } from 'app/types'
import { any } from 'ramda'
import { isSome } from 'app/utils'
import { useToast } from 'react-native-toast-notifications'
import { ComponentAuthGuard } from 'app/utils/authGuard'
import { theme } from 'app/design/tailwind/theme'

type Props = {
  size: number
  className?: string
  entry: Entry
}

function LikeButton({ size, className, entry }: Props) {
  const [likeEntry] = useLikeEntryMutation()
  const toast = useToast()
  const { data: userLikesData } = useUserLikesQuery()
  const { addLikeToCache, removeLikeFromCache } = useLikeCache()
  const active = any(
    (item) => isSome(item) && item.id === entry.id,
    userLikesData?.userLikes ?? [],
  )

  const update = async () => {
    active ? removeLikeFromCache(entry) : addLikeToCache(entry)
    try {
      await likeEntry({ variables: { id: entry.id, like: !active } })
    } catch (e) {
      active ? addLikeToCache(entry) : removeLikeFromCache(entry)

      const err = e as Partial<ErrorType>
      toast.show(err?.message ?? 'Unknown error', { type: 'danger' })
    }
  }

  return (
    <Pressable className={className} onPress={update}>
      <Like
        className={active ? 'text-blue-brand' : 'text-gray-600'}
        size={size}
        fill={active}
      />
    </Pressable>
  )
}

export default function LikeBtn(props: Props) {
  return (
    <ComponentAuthGuard linkToAuth>
      <LikeButton {...props} />
    </ComponentAuthGuard>
  )
}
