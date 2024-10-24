import { Entry, UserCollectionDocument } from 'app/api/graphql'
import { Button } from 'app/design/button'

import { ComponentAuthGuard } from 'app/utils/authGuard'
import { useEntryOffer, getEntryOfferUrl } from 'app/hooks/useEntryOffer'
import { useState } from 'react'
import { PaymentConfirmationModal } from 'app/ui/modal/PaymentConfirmationModal'
import { useApolloClient } from '@apollo/client'
import { prepend } from 'ramda'
import { useRecoilValue } from 'recoil'
import { userAtom } from 'app/state/user'
import { useSWRConfig } from 'swr'
import { Platform } from 'react-native'

type Props = {
  entry: Entry
  size?: 'default' | 'small' | 'large'
}

export function BuyNowBtn({ entry, size = 'default' }: Props) {
  const price = useEntryOffer(entry.code, entry.issuer)
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const { cache } = useApolloClient()
  const user = useRecoilValue(userAtom)
  const { mutate } = useSWRConfig()

  if (!price || Platform.OS === 'ios') {
    return null
  }

  return (
    <ComponentAuthGuard linkToAuth>
      <Button
        text="Invest"
        className="flex-row-reverse"
        onPress={() => {
          if (!user) return
          setModalVisible(true)
        }}
        useTouchable
        size={'small'}
      />
      <PaymentConfirmationModal
        visible={modalVisible}
        entry={entry}
        price={price.price}
        initialEquityForSale={price.amount}
        hideModal={(success: boolean) => {
          setModalVisible(false)
          if (success) {
            mutate(getEntryOfferUrl(entry.code, entry.issuer))

            cache.updateQuery(
              {
                query: UserCollectionDocument,
                variables: { userId: user?.id },
                overwrite: true,
              },
              (cachedData) => ({
                userEntries: prepend(entry, cachedData?.userEntries ?? []),
              }),
            )
          }
        }}
      />
    </ComponentAuthGuard>
  )
}
