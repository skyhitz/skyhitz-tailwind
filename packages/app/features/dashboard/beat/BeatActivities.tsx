import { Text, View } from 'react-native'
import { CollapsableView } from 'app/ui/CollapsableView'
import { EntryActivity } from 'app/api/graphql'
import { ArrowsUpDownIcon } from 'app/ui/icons/arrows-up-down'
import { LinkWithLabel } from 'app/ui/links/LinkWithLabel'

export function BeatActivity({
  activity,
  index,
}: {
  activity: EntryActivity
  index: number
}) {
  const date = new Date(activity.ts * 1000)

  const AssetTransfered = () => {
    if (activity?.accounts?.length !== 2) {
      return (
        <Text className="my-1 text-sm md:my-0">Unsupported activity type</Text>
      )
    }
    const sender = activity.accounts[0]!
    const receiver = activity.accounts[1]!
    return (
      <View className="flex md:flex-row md:flex-wrap md:items-center">
        <LinkWithLabel type="account" id={sender} />
        <Text className="my-1 text-sm md:my-0">Transfered Asset to</Text>
        <LinkWithLabel type="account" id={receiver} />
      </View>
    )
  }

  const Offer = ({ type = 'sell' }: { type: 'buy' | 'sell' }) => {
    const amount = type === 'buy' ? activity.amount : activity.sourceAmount

    if (
      activity?.accounts?.length !== 1 ||
      !amount ||
      !activity.price?.n ||
      !activity.price?.d ||
      activity.assets?.length !== 2
    ) {
      return (
        <Text className="my-1 text-sm md:my-0">Unsupported activity type</Text>
      )
    }
    const account = activity.accounts[0]!
    if (amount === '0') {
      return (
        <View className="flex md:flex-row md:flex-wrap md:items-center">
          <LinkWithLabel type="account" id={account} />
          <Text className="my-1 text-sm md:my-0">Cancelled offer</Text>
        </View>
      )
    }

    const price = (parseFloat(amount) * activity.price.n) / activity.price.d

    const buyAsset = activity.assets[type === 'buy' ? 1 : 0]!
    const sellAsset = activity.assets[type === 'buy' ? 0 : 1]!

    return (
      <View className="flex md:flex-row md:flex-wrap md:items-center">
        <LinkWithLabel type="account" id={account} />
        <Text className="my-1 text-sm md:my-0">
          Created a {type} offer {amount}
        </Text>
        <LinkWithLabel type="asset" id={buyAsset} />
        <Text className="my-1 text-sm md:my-0">for {price}</Text>
        <LinkWithLabel type="asset" id={sellAsset} />
      </View>
    )
  }

  const EstablishedTrustline = () => {
    if (activity?.accounts?.length !== 1 || activity.assets?.length !== 1) {
      return (
        <Text className="my-1 text-sm md:my-0">Unsupported activity type</Text>
      )
    }
    const account = activity.accounts[0]!
    const asset = activity.assets[0]!

    return (
      <View className="flex md:flex-row md:flex-wrap md:items-center">
        <LinkWithLabel type="account" id={account} />
        <Text className="my-1 text-sm md:my-0">Established trustline to</Text>
        <LinkWithLabel type="asset" id={asset} />
      </View>
    )
  }

  const Transfer = () => {
    if (
      activity?.accounts?.length !== 2 ||
      !activity.sourceAmount ||
      !activity.amount ||
      activity.assets?.length !== 2
    ) {
      return (
        <Text className="my-1 text-sm md:my-0">Unsupported activity type</Text>
      )
    }
    const buyer = activity.accounts[0]!

    const buyAsset = activity.assets[1]!
    const sellAsset = activity.assets[0]!

    return (
      <View className="flex md:flex-row md:flex-wrap md:items-center">
        <LinkWithLabel type="account" id={buyer} />
        <Text className="my-1 text-sm md:my-0">
          Transfered {activity.sourceAmount}
        </Text>
        <LinkWithLabel type="asset" id={sellAsset} />
        <Text className="my-1 text-sm md:my-0">
          in exchange for {activity.amount}
        </Text>
        <LinkWithLabel type="asset" id={buyAsset} />
      </View>
    )
  }

  const CenterWidget = () => {
    switch (activity.type) {
      case 0:
        return <Text>Account Created</Text>
      case 1:
        return <AssetTransfered />
      case 2:
        return <Transfer />
      case 3:
        return <Offer type="sell" />
      case 6:
        return <EstablishedTrustline />
      case 12:
        return <Offer type="buy" />
      case 13:
        return <Transfer />
      default:
        return (
          <Text className="my-1 text-sm md:my-0">
            Unsupported activity type
          </Text>
        )
    }
  }

  const bgColor = index % 2 === 1 ? 'bg-blue-dark' : 'bg-blue-transparent'
  return (
    <View className={`px-5 py-3 md:flex-row md:items-center ${bgColor}`}>
      <LinkWithLabel type="tx" id={activity.tx} className="w-30" />

      <View className="my-2 md:mx-2 md:my-0 md:flex-1">
        <CenterWidget />
      </View>
      <Text className="text-grey my-2 text-sm md:my-0">
        {date.toLocaleDateString('en-us')}
      </Text>
    </View>
  )
}

export function Activity({ activities }: { activities: EntryActivity[] }) {
  return (
    <CollapsableView headerText="Activity" icon={ArrowsUpDownIcon}>
      <View>
        {activities?.map((item, index) => (
          <BeatActivity key={item.id} activity={item} index={index} />
        )) ?? <Text>No activity</Text>}
      </View>
    </CollapsableView>
  )
}
