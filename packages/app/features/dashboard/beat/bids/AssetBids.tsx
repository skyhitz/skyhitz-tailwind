import { CollapsableView } from 'app/ui/CollapsableView'
import { View } from 'react-native'
import { ArrowsUpDownIcon } from 'app/ui/icons/arrows-up-down'
import { Entry, EntryHolder, useAssetBidsQuery } from 'app/api/graphql'
import { useRecoilValue } from 'recoil'
import { useUserAtomState } from 'app/state/user'
import { useMemo } from 'react'
import { ActiveBid } from './ActiveBid'

type Props = {
  entry: Entry
  holders?: EntryHolder[] | null
}

export function AssetBids({ entry, holders }: Props) {
  const { user } = useUserAtomState()
  const { data, refetch } = useAssetBidsQuery({
    variables: { assetCode: entry.code, assetIssuer: entry.issuer },
    skip: !user,
  })

  const isOwner = useMemo(() => {
    const isOwner = (holders ?? []).some(
      (holder) => holder.account === user?.publicKey,
    )
    return isOwner
  }, [holders, user])

  if (!isOwner || !data || data?.bids.length === 0) return null

  return (
    <CollapsableView headerText="Active Bids" icon={ArrowsUpDownIcon}>
      <View>
        {data.bids.map((offer, index) => (
          <ActiveBid
            key={offer.id}
            entry={entry}
            index={index}
            offer={offer}
            refetch={refetch}
          />
        ))}
      </View>
    </CollapsableView>
  )
}
