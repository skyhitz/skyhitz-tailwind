import { Text, View } from 'react-native'
import { Entry } from 'app/api/graphql'
import { useEntryOffer } from 'app/hooks/useEntryOffer'
import { BuyNowBtn } from 'app/ui/buttons/BuyNowBtn'
import Dollar from 'app/ui/icons/dollar'
import useUSDPrice from 'app/hooks/useUSDPrice'
import { CreateBid } from './bids/CreateBid'
import { Platform } from 'react-native'
import { P } from 'app/design/typography'

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
      <P className="mb-3 text-sm">Equity: {(100 * offer.amount).toFixed(0)}%</P>
      <View className="mb-3 flex flex-row items-end">
        <Dollar size={24} />
        <P className="ml-3 font-bold">
          {(offer.price * offer.amount).toFixed()} XLM
        </P>
        <P className="ml-3 text-base font-bold">(${usd.toFixed(2)})</P>
      </View>
      <BuyNowBtn entry={entry} />
    </View>
  )
}
