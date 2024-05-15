'use client'
import { useBeatParam } from 'app/hooks/param/useBeatParam'
import { Entry, useEntryDetailsQuery } from 'app/api/graphql'
import { ScrollView, View } from 'react-native'
import { Activity } from './BeatActivities'
import { Details } from './BeatDetails'
import { imageUrlMedium } from 'app/utils/entry'
import { BeatSummaryColumn } from './BeatSummaryColumn'
import { useGetEntry } from 'app/hooks/algolia/useGetEntry'
import * as assert from 'assert'
import { ReactNode, useEffect } from 'react'
import BeatPageSkeleton from 'app/ui/skeletons/BeatPageSkeleton'
import { Owners } from './BeatOwners'
import { useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'
import { SkeletonContainer } from 'app/ui/skeletons/SkeletonContainer'
import { SolitoImage } from 'app/design/solito-image'

type Props = {
  entry?: Entry
  children?: ReactNode
}

export default function BeatScreen(props: Props) {
  const id = useBeatParam()
  assert.ok(id !== undefined)
  const getEntryResult = useGetEntry({ id, skip: props.entry !== undefined })
  const { data } = useEntryDetailsQuery({
    variables: { id: id! },
    skip: !id,
  })

  const x = useSharedValue(-0.2)

  useEffect(() => {
    x.value = withRepeat(withTiming(1.2, { duration: 1000 }), -1)
  }, [x])

  const entry = props.entry ?? getEntryResult.entry
  const details = data?.entry

  if (!entry) {
    return <BeatPageSkeleton />
  }

  const Content = () => {
    return (
      <View className="w-full">
        <View className="hidden md:flex">
          <View className="w-full flex-row">
            <View className="mr-4 flex flex-1 items-center">
              <View className="relative aspect-square w-full rounded-md">
                <SolitoImage
                  src={imageUrlMedium(entry.imageUrl)}
                  fill
                  alt={entry.title}
                  style={{ borderRadius: 12 }}
                  sizes="(max-width: 768px) 100vw"
                  priority
                  contentFit="cover"
                />
              </View>

              <Details code={entry.code} issuer={entry.issuer} />
              {details?.holders && <Owners holders={details.holders} />}
            </View>
            <BeatSummaryColumn entry={entry} holders={details?.holders} />
          </View>
          {!details && (
            <SkeletonContainer
              sharedValue={x}
              className="h-50 mt-5 w-full rounded-lg"
            />
          )}
          {details?.history && <Activity activities={details.history} />}
        </View>
        <View className="md:hidden">
          <View className="max-w-125 max-h-125 mb-3 aspect-square w-full">
            <SolitoImage
              src={imageUrlMedium(entry.imageUrl)}
              fill
              alt={entry.title}
              style={{ borderRadius: 12 }}
              sizes="(max-width: 768px) 100vw"
              priority
              contentFit="cover"
            />
          </View>
          <BeatSummaryColumn entry={entry} holders={details?.holders} />
          <Details code={entry.code} issuer={entry.issuer} />
          {!details && (
            <SkeletonContainer
              sharedValue={x}
              className="mt-5 h-20 w-full rounded-lg"
            />
          )}
          {details?.holders && <Owners holders={details.holders} />}

          {details?.history && <Activity activities={details.history} />}
        </View>
      </View>
    )
  }

  return (
    <View className="flex flex-1">
      <ScrollView contentContainerClassName="flex min-h-full items-start w-full max-w-screen-xl mx-auto p-4">
        <Content />
      </ScrollView>
    </View>
  )
}
