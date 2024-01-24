import { View } from 'react-native'
import { P } from 'app/design/typography'
import Dollar from 'app/ui/icons/dollar'
import { useEntryOffer } from 'app/hooks/useEntryOffer'
import { BuyNowBtn } from 'app/ui/buttons/BuyNowBtn'
import { Entry } from 'app/api/graphql'
import { useRecoilValue } from 'recoil'
import { userAtom } from 'app/state/user'

type PriceProps = {
  entry: Entry
  className?: string
  hovered?: boolean
}

export default function Price({ className, entry, hovered }: PriceProps) {
  const offer = useEntryOffer(entry.code, entry.issuer)
  const user = useRecoilValue(userAtom)

  if (!offer.price) {
    return null
  }

  if (hovered && user) {
    return (
      <View className={`${className}`}>
        <BuyNowBtn entry={entry} />
      </View>
    )
  } else
    return (
      <View className={`flex flex-row items-center ${className}`}>
        <Dollar size={16} className="text-gray" />
        <P className="ml-1 text-sm">
          {(offer.price * offer.amount).toFixed()} for{' '}
          {(offer.amount * 100).toFixed()}%
        </P>
      </View>
    )
}