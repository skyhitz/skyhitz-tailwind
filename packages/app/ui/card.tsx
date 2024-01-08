import { A, H3, P } from 'app/design/typography'
import { View } from 'react-native'
import { SolitoImage } from 'solito/image'

export default function Card({
  imageUrl = '/img/landing-3.png',
  dateTime = 'Jan 5, 2023',
  category = 'Business',
  description = 'We are proud to anounce that we reached an historical revenue, great news for the music industry',
  title = 'Skyhitz reaches 20M MRR',
}) {
  return (
    <A href="/blog">
      <View className="flex shrink flex-col items-start justify-between rounded-xl shadow-lg">
        <View className="relative w-full">
          <View className="aspect-[3/2] w-full object-cover">
            <SolitoImage
              src={imageUrl}
              alt=""
              fill
              contentFit="cover"
              style={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
            />
          </View>
        </View>
        <View className="max-w-xl px-6 py-8">
          <View className="group relative">
            <H3 className="text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
              <View className="absolute inset-0" />
              {title}
            </H3>
            <View className="bg-blue-brand/20 relative z-10 mt-5 w-min rounded-full px-3 py-1  hover:bg-gray-100">
              <P className="font-inter text-xs font-medium text-gray-600">
                {category}
              </P>
            </View>
            <P className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
              {description}
            </P>
          </View>
          <View className="mt-5 flex items-start gap-4">
            <P className="text-xs font-bold text-gray-700">{dateTime}</P>
          </View>
        </View>
      </View>
    </A>
  )
}
