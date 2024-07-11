import { View } from 'react-native'
import { Button } from 'app/design/button'
import { Entry, useBuyEntryMutation } from 'app/api/graphql'
import Dollar from 'app/ui/icons/dollar'
import { FormInputWithIcon } from 'app/ui/inputs/FormInputWithIcon'
import PieChartIcon from 'app/ui/icons/pie'
import { useCallback, useEffect, useState } from 'react'
import { useErrorReport } from 'app/hooks/useErrorReport'
import { ComponentAuthGuard } from 'app/utils/authGuard'
import { useToast } from 'app/provider/toast'
import { useSWRConfig } from 'swr'
import { getUserBidsUrl } from 'app/hooks/useUserBids'
import { useUserAtomState } from 'app/state/user'
import { H2, P } from 'app/design/typography'

type Props = {
  entry: Entry
}

const lumensToStroops = (lumens: number) => lumens * 10000000

const stroopsToLumens = (stroops: number) => stroops / 10000000

export function CreateBid({ entry }: Props) {
  const [amountToInvest, setAmountToInvest] = useState('')
  const [invest] = useBuyEntryMutation()

  const [equityToBuy, setEquityToBuy] = useState('')
  const reportError = useErrorReport()
  const toast = useToast()
  const [loading, setLoading] = useState<boolean>(false)
  const { mutate } = useSWRConfig()
  const { user } = useUserAtomState()

  const onSubmit = useCallback(async () => {
    try {
      setLoading(true)
      const { data } = await invest({
        variables: {
          id: entry.id!,
          amount: lumensToStroops(parseInt(amountToInvest, 10)),
        },
      })
      if (!data?.investEntry.success) {
        throw Error('Error during transaction creation.')
      }
      setLoading(false)
      setAmountToInvest('')
      setEquityToBuy('')
      toast.show('You have successfully invested', {
        type: 'success',
      })
      mutate(getUserBidsUrl(user!.publicKey))
    } catch (ex) {
      setLoading(false)
      reportError(ex)
    }
  }, [amountToInvest, equityToBuy, setLoading, toast, reportError])

  useEffect(() => {
    // fetch percentage of pool share from the server with amountToInvest

    const amountInStroops = lumensToStroops(parseInt(amountToInvest))

    if (!amountToInvest) {
      return
    }

    console.log(entry.tvl)
    if (entry.tvl === 0 || !entry?.tvl) {
      setEquityToBuy('100')
      return
    }

    const desiredPerscentage =
      (amountInStroops / (entry.tvl + amountInStroops)) * 100

    setEquityToBuy(desiredPerscentage.toString())
  }, [amountToInvest])

  const tvl = entry.tvl ? stroopsToLumens(entry.tvl) : 0

  return (
    <>
      <ComponentAuthGuard>
        <View className="border-grey-light mt-4 flex items-center rounded-lg border-[0.5px] p-4 md:items-start">
          <H2 className="mb-3 text-sm">TVL : {tvl} XLM</H2>
          <View className="mb-3 flex items-center md:flex-row">
            <FormInputWithIcon
              containerClassNames="border border-white rounded p-5 md:mr-2 mb-2 md:mb-0"
              icon={Dollar}
              value={amountToInvest}
              onChangeText={(text) => {
                if (text === '') {
                  setAmountToInvest('')
                } else {
                  const num = parseInt(text.replace(/[^0-9]/g, ''), 10)
                  setAmountToInvest(num.toString())
                }
              }}
              className="text-md ml-2 px-4 py-2 font-bold text-gray-600 focus:border-gray-600 focus-visible:outline-gray-600"
              placeholder="Amount (XLM)"
              keyboardType="numeric"
              maxLength={10}
            />
            <FormInputWithIcon
              containerClassNames="border border-white rounded p-5 md:ml-2"
              icon={PieChartIcon}
              value={equityToBuy}
              // onChangeText={(text) => {
              //   if (text === '') {
              //     setEquityToBuy('')
              //   } else {
              //     const num = parseInt(text.replace(/[^0-9]/g, ''), 10)
              //     if (num <= 100 && num >= 1) {
              //       setEquityToBuy(num.toString())
              //     }
              //   }
              // }}
              placeholder="Pool share %"
              keyboardType="numeric"
              maxLength={10}
              editable={false}
            />
          </View>
          <Button
            text="Invest"
            onPress={onSubmit}
            disabled={!amountToInvest || !equityToBuy || loading}
            loading={loading}
            className="w-full"
          />
        </View>
      </ComponentAuthGuard>
    </>
  )
}
