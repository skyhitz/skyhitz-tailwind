import { Text, View } from 'react-native'
import { useRecoilValue } from 'recoil'
import { userAtom } from 'app/state/user'
import * as assert from 'assert'
import { useUserBids } from 'app/hooks/useUserBids'
import { FlashList as FlatList } from '@shopify/flash-list'
import { BidListEntry } from './BidListEntry'
import { CollectionSkeleton } from 'app/ui/skeletons/CollectionSkeleton'
import { P } from 'app/design/typography'

export function BidsScreen() {
  const user = useRecoilValue(userAtom)
  assert.ok(user)
  const { bids, loading, refetch } = useUserBids(user.publicKey)

  return (
    <View className="w-full flex-1">
      <P className="web:flex font-unbounded mb-4 ml-8 hidden text-lg font-bold">
        Your bids
      </P>
      <View className="mx-auto w-full max-w-6xl flex-1">
        {loading && <CollectionSkeleton duplicates={3} />}
        {!loading && (
          <FlatList
            keyExtractor={(item) => item.id!}
            data={bids}
            renderItem={({ item }) => (
              <BidListEntry entry={item} refetchBids={refetch} />
            )}
            ListEmptyComponent={
              <View className="mt-8 flex flex-1 items-center justify-center">
                <Text>You don&apos;t have any active bids</Text>
              </View>
            }
          />
        )}
      </View>
    </View>
  )
}
