import { View } from 'react-native'
import { P } from 'app/design/typography'
import Dollar from 'app/ui/icons/dollar'
import { useEntryOffer } from 'app/hooks/useEntryOffer'
// import { BuyNowBtn } from 'app/ui/buttons/BuyNowBtn'
import { Entry } from 'app/api/graphql'
import { useRecoilValue } from 'recoil'
import { useUserAtomState } from 'app/state/user'

type PriceProps = {
  entry: Entry
  className?: string
  hovered?: boolean
}

export default function Price({ className, entry, hovered }: PriceProps) {
  const offer = useEntryOffer(entry.code, entry.issuer)
  const { user } = useUserAtomState()

  if (!offer.price) {
    return null
  }

  const kFormatter = (num: number) => {
    return Math.abs(num) > 999
      ? (Math.sign(num) * (Math.abs(num) / 1000)).toFixed(1) + 'k'
      : Math.sign(num) * Math.abs(num)
  }

  return (
    <>
      {/* <View className={`${className} hidden sm:block`}>
        <BuyNowBtn entry={entry} />
      </View> */}

      <View className={`flex flex-row items-center ${className}`}>
        <Dollar size={16} className="text-gray" />
        <P className="ml-1 text-sm">
          {kFormatter(offer.price * offer.amount)}
          {/* for */} {/* {(offer.amount * 100).toFixed()}% */}
        </P>
      </View>
    </>
  )
}
