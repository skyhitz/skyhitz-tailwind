import { Text, View } from 'react-native'
import { Entry } from 'app/api/graphql'
import { useEntryOffer } from 'app/hooks/useEntryOffer'
import { BuyNowBtn } from 'app/ui/buttons/BuyNowBtn'
import Dollar from 'app/ui/icons/dollar'
import useUSDPrice from 'app/hooks/useUSDPrice'
import { CreateBid } from './bids/CreateBid'
import { Platform } from 'react-native'

type Props = {
  entry: Entry
}

export function PriceContainer({ entry }: Props) {
  const offer = useEntryOffer(entry.code, entry.issuer)
  const usd = useUSDPrice(offer.price * offer.amount)

  if (!offer.price) {
    if (Platform.OS === 'ios') return null
    return <CreateBid entry={entry} />
  }

  return (
    <View className="border-grey-light mt-4 flex rounded-lg border-[0.5px] p-4">
      <Text className="text-grey-light mb-3 text-sm">
        Current price ( {(100 * offer.amount).toFixed(0)}% of the asset )
      </Text>
      <View className="mb-3 flex flex-row items-end">
        <Dollar size={30} className="text-white" />
        <Text className="ml-3 text-3xl text-white">
          {(offer.price * offer.amount).toFixed()} XLM
        </Text>
        <Text className="text-grey-light ml-3 text-base">
          ${usd.toFixed(2)}
        </Text>
      </View>
      <BuyNowBtn entry={entry} />
    </View>
  )
}
