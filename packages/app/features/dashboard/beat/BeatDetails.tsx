import { CollapsableView } from 'app/ui/CollapsableView'
import { View } from 'react-native'
import { Config } from 'app/config'
import { ReactElement } from 'react'
import { StellarExpertLink } from 'app/ui/links/StellarExpertLink'
import { Details as DetailsIcon } from 'app/ui/icons/details'
import { getAssetId } from 'app/utils/stellar'
import { P } from 'app/design/typography'

type Props = {
  issuer: string
  code: string
}

export function Details({ issuer, code }: Props) {
  const Row = ({
    label,
    trailingWidget,
    value = '',
  }: {
    label: string
    trailingWidget?: ReactElement
    value?: string
  }) => {
    const defaultTrailingWidget = <P className="shrink text-sm">{value}</P>

    return (
      <View className="my-2 flex-row items-center justify-center">
        <P className="mr-2 min-w-max flex-1 grow text-sm text-gray-600">
          {label}
        </P>
        {trailingWidget ?? defaultTrailingWidget}
      </View>
    )
  }
  return (
    <CollapsableView headerText="Details" icon={DetailsIcon}>
      <View className="p-5">
        <Row
          label="Issuer:"
          trailingWidget={
            <StellarExpertLink
              id={issuer}
              path="account"
              className="shrink"
              align="end"
            />
          }
        />
        <Row
          label="Asset code:"
          trailingWidget={
            <StellarExpertLink
              id={getAssetId(code, issuer)}
              text={code}
              path="asset"
              className="grow-1"
              align="end"
            />
          }
        />
        <Row label="Chain:" value={Config.CHAIN_ID} />
      </View>
    </CollapsableView>
  )
}
