import { Text, View } from 'react-native'
import { Button } from 'app/design/button'
import { Entry, useCreateBidMutation } from 'app/api/graphql'
import Dollar from 'app/ui/icons/dollar'
import { FormInputWithIcon } from 'app/ui/inputs/FormInputWithIcon'
import PieChartIcon from 'app/ui/icons/pie'
import { useCallback, useState } from 'react'
import { useErrorReport } from 'app/hooks/useErrorReport'
import { ComponentAuthGuard } from 'app/utils/authGuard'
import { useToast } from 'app/provider/toast'
// import { useWalletConnectClient } from "app/provider/WalletConnect";
// import { WalletConnectModal } from "app/ui/modal/WalletConnectModal";
import { useSWRConfig } from 'swr'
import { getUserBidsUrl } from 'app/hooks/useUserBids'
import { useRecoilValue } from 'recoil'
import { userAtom } from 'app/state/user'
import { P } from 'app/design/typography'

type Props = {
  entry: Entry
}

export function CreateBid({ entry }: Props) {
  const [proposedPrice, setProposedPrice] = useState('')
  const [createOffer] = useCreateBidMutation()
  const [equityToBuy, setEquityToBuy] = useState('')
  const reportError = useErrorReport()
  const toast = useToast()
  const [loading, setLoading] = useState<boolean>(false)
  //   const { signAndSubmitXdr, session, connect } = useWalletConnectClient();
  //   const [walletConnectModalVisible, setWalletConnectModalVisible] =
  //     useState<boolean>(false);
  //   const [uri, setUri] = useState<string>("");
  const { mutate } = useSWRConfig()
  const user = useRecoilValue(userAtom)

  const onSubmit = useCallback(async () => {
    try {
      setLoading(true)
      const { data } = await createOffer({
        variables: {
          id: entry.id!,
          price: parseInt(proposedPrice, 10),
          equityToBuy: parseFloat(equityToBuy) / 100,
        },
      })
      if (!data?.createBid.success) {
        throw Error('Error during transaction creation.')
      }
      //   if (!data?.createBid.submitted) {
      //     const xdr = data.createBid.xdr!;

      //     let currentSession = session;
      //     if (!currentSession) {
      //       currentSession = await connect((newUri) => {
      //         setUri(newUri);
      //         setWalletConnectModalVisible(true);
      //       });
      //     }
      //     const response = await signAndSubmitXdr(xdr, currentSession);

      //     const { status } = response as { status: string };
      //     if (status !== "success") {
      //       throw Error("Error during signing transaction in your wallet");
      //     }
      //   }
      setLoading(false)
      setProposedPrice('')
      setEquityToBuy('')
      toast.show('You have successfully created a bid', {
        type: 'success',
      })
      mutate(getUserBidsUrl(user!.publicKey))
    } catch (ex) {
      setLoading(false)
      reportError(ex)
    }
  }, [
    proposedPrice,
    equityToBuy,
    setLoading,
    // session,
    // connect,
    // signAndSubmitXdr,
    // setUri,
    // setWalletConnectModalVisible,
    toast,
    reportError,
  ])

  return (
    <>
      <ComponentAuthGuard>
        <View className="border-grey-light mt-4 flex items-center rounded-lg border-[0.5px] p-4 md:items-start">
          <P className="mb-3 text-sm">Create a bid for this asset</P>
          <View className="mb-3 flex items-center md:flex-row">
            <FormInputWithIcon
              containerClassNames="border border-white rounded p-5 md:mr-2 mb-2 md:mb-0"
              icon={Dollar}
              value={proposedPrice}
              onChangeText={(text) => {
                if (text === '') {
                  setProposedPrice('')
                } else {
                  const num = parseInt(text.replace(/[^0-9]/g, ''), 10)
                  setProposedPrice(num.toString())
                }
              }}
              placeholder="Price (XLM)"
              keyboardType="numeric"
              maxLength={10}
            />
            <FormInputWithIcon
              containerClassNames="border border-white rounded p-5 md:ml-2"
              icon={PieChartIcon}
              value={equityToBuy}
              onChangeText={(text) => {
                if (text === '') {
                  setEquityToBuy('')
                } else {
                  const num = parseInt(text.replace(/[^0-9]/g, ''), 10)
                  if (num <= 100 && num >= 1) {
                    setEquityToBuy(num.toString())
                  }
                }
              }}
              placeholder="Equity To Buy (1-100)%"
              keyboardType="numeric"
              maxLength={10}
            />
          </View>
          <Button
            text="Submit offer"
            onPress={onSubmit}
            disabled={!proposedPrice || !equityToBuy || loading}
            loading={loading}
          />
        </View>
      </ComponentAuthGuard>
      {/* <WalletConnectModal
        visible={walletConnectModalVisible}
        close={() => setWalletConnectModalVisible(false)}
        uri={uri}
      /> */}
    </>
  )
}
