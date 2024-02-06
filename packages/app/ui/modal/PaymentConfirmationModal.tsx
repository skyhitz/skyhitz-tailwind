import { Pressable, View, Modal } from 'react-native'
import { Button } from 'app/design/button'
import X from 'app/ui/icons/x'
import {
  Entry,
  useBuyEntryMutation,
  BuyEntryMutation,
  useUserCreditsQuery,
} from 'app/api/graphql'
import { imageUrlSmall } from 'app/utils/entry'
import { Line } from 'app/ui/orSeparator'
// import { useWalletConnectClient } from 'app/provider/WalletConnect'
import { useState } from 'react'
import { useToast } from 'app/provider/toast'
import { useErrorReport } from 'app/hooks/useErrorReport'
import { Slider } from 'app/ui/SkyhitzSlider'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SolitoImage } from 'solito/image'
import { P } from 'app/design/typography'
// import { WalletConnectModal } from "app/ui/modal/WalletConnectModal";

type Props = {
  visible: boolean
  hideModal: (success: boolean) => void
  price: number
  initialEquityForSale: number
  entry: Entry
}
export function PaymentConfirmationModal({
  visible,
  hideModal,
  price,
  initialEquityForSale,
  entry,
}: Props) {
  const { data: credits } = useUserCreditsQuery()
  const [buy] = useBuyEntryMutation()
  //   const { signAndSubmitXdr, session, connect } = useWalletConnectClient()
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string | undefined>()
  const [equityForSale, setEquityForSale] =
    useState<number>(initialEquityForSale)
  //   const [walletConnectModalVisible, setWalletConnectModalVisible] =
  //     useState<boolean>(false)
  //   const [uri, setUri] = useState<string>('')
  const toast = useToast()
  const reportError = useErrorReport()

  const onMutationCompleted = async (data: BuyEntryMutation) => {
    if (data?.buyEntry?.success) {
      if (data.buyEntry.submitted) {
        setLoading(false)
        hideModal(true)
        toast.show('You have successfully bought an NFT', {
          type: 'success',
        })
      } else if (data.buyEntry.xdr) {
        // setMessage('Sign and submit transaction in your wallet')
        // const xdr = data.buyEntry.xdr
        // try {
        //   let currentSession = session
        //   if (!currentSession) {
        //     currentSession = await connect((newUri) => {
        //       setUri(newUri)
        //       setWalletConnectModalVisible(true)
        //     })
        //   }
        //   const response = await signAndSubmitXdr(xdr, currentSession)
        //   setMessage(undefined)
        //   setLoading(false)
        //   const { status } = response as { status: string }
        //   if (status === 'success') {
        //     hideModal(true)
        //     toast.show('You have successfully bought an NFT', {
        //       type: 'success',
        //     })
        //   } else {
        //     hideModal(false)
        //     reportError(
        //       Error(
        //         'Something went wrong during signing and submitting transaction in your wallet.',
        //       ),
        //     )
        //   }
        // } catch (ex) {
        //   hideModal(false)
        //   reportError(ex)
        // }
      }
    }
  }

  return (
    <>
      <Modal visible={visible} transparent>
        <Pressable
          onPress={() => hideModal(false)}
          className="bg-blue-field/70 flex w-full flex-1 items-center justify-center p-4"
        >
          <Pressable
            onPress={() => {}}
            className="bg-blue-field flex w-full max-w-lg items-center p-4"
          >
            <Pressable
              className="absolute right-2 top-2 "
              onPress={() => hideModal(false)}
            >
              <X className="text-white" />
            </Pressable>
            <P className="text-lg font-bold">Confirm payment</P>
            <View className="my-4 flex-row items-center">
              <SolitoImage
                width={40}
                height={40}
                src={imageUrlSmall(entry.imageUrl)}
                alt={entry.title}
              />
              <P className="ml-2">
                {entry.title}-{entry.artist}
              </P>
            </View>
            <Line />
            <P className="my-2 text-sm">
              Current Balance: {credits?.userCredits?.toFixed(2) ?? '0.00'} XLM
            </P>
            <P className="my-2 text-sm">
              Price: {(price * equityForSale).toFixed(2)} XLM
            </P>
            <P className="my-2 text-sm">
              Equity for sale: {(equityForSale * 100).toFixed()}%
            </P>
            <P className="my-2 text-sm">Network fee: 0.01 XLM</P>
            <GestureHandlerRootView
              style={{ flexDirection: 'row', width: '100%' }}
            >
              <Slider
                progress={initialEquityForSale}
                key={entry.id}
                onValueChange={(value: number) => {
                  setEquityForSale(parseFloat(value.toFixed(2)))
                }}
              />
            </GestureHandlerRootView>
            <P className="my-2 text-sm">
              Stellar collects a network fee per transaction. It depends on the
              number of operations in the transaction and the current network
              traffic. It is safe to assume that in the worst case you will be
              charged 0.01 XLM.
            </P>
            <Line />

            {message && (
              <P className="min-h-5 my-4 w-full text-center text-sm">
                {message}
              </P>
            )}
            <Button
              className="mt-4"
              text="Confirm"
              onPress={async () => {
                setLoading(true)
                try {
                  await buy({
                    variables: {
                      id: entry.id,
                      amount: equityForSale,
                      price,
                    },
                    onCompleted: onMutationCompleted,
                  })
                } catch (ex) {
                  setLoading(false)
                  hideModal(false)
                  reportError(ex)
                }
              }}
              disabled={
                price * equityForSale >= (credits?.userCredits ?? 0) || loading
              }
              loading={loading}
            />
          </Pressable>
        </Pressable>
      </Modal>
      {/* <WalletConnectModal
        visible={walletConnectModalVisible}
        close={() => setWalletConnectModalVisible(false)}
        uri={uri}
      /> */}
    </>
  )
}
