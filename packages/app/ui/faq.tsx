import { H2, P } from 'app/design/typography'
import { Pressable, View } from 'react-native'
import { AnimatePresence, MotiView } from 'moti'
import { useState } from 'react'
import { AnimateHeight } from './animate-height'

const faqs = [
  {
    question: 'On which network are you based?',
    answer:
      'We are based on Stellar, a network with multiple benefits like faster transaction speeds, lower fees, and a decentralized platform making it the perfect choice for minting and trading music assets. ',
  },
  {
    question: 'Do I need a wallet?',
    answer:
      'No, we will create an in-app Stellar wallet for you with your email.',
  },
  {
    question: 'Why do I only see 1 mint of every NFT?',
    answer:
      'We focus on indexing 1 mint of each of the most relevant, valuable, and expertly curated music NFTs, ensuring an unparalleled user experience centered on quality and exclusivity.',
  },
  {
    question: 'Can I use my phone? Or is it better to use a PC?',
    answer:
      'We recommend using a web browser like Chrome on a PC.  More mobile support will be coming in the near future.',
  },
  {
    question:
      'Can I simply enjoy and listen to music on the platform without purchasing NFTs?',
    answer:
      "Absolutely! Whether you're a collector wanting something unique or a music lover just seeking to explore and enjoy different sounds, our platform has something special for you.",
  },
]

export default function Faq() {
  const [openFaq, setOpenFaq] = useState(-1)

  const handleOnPress = (index: number) => {
    if (index === openFaq) {
      setOpenFaq(-1)
      return
    }
    setOpenFaq(index)
  }

  return (
    <View className="mx-auto w-full max-w-7xl px-6 pb-24 sm:pb-32 lg:px-8">
      <View className="mx-auto w-full divide-y divide-gray-900/10">
        <H2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
          Frequently asked questions
        </H2>
        <View className="mt-10 space-y-6 divide-y divide-gray-900/10">
          {faqs.map((faq, index) => {
            return (
              <View key={index} className="pt-6">
                <Pressable onPress={() => handleOnPress(index)}>
                  <View className="flex flex-row justify-between">
                    <P className="text-base font-semibold leading-7">
                      {faq.question}
                    </P>
                    <AnimatePresence exitBeforeEnter>
                      {openFaq === index && (
                        <MotiView
                          from={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ type: 'timing', duration: 250 }}
                          exit={{
                            opacity: 0,
                          }}
                          key="minus"
                        >
                          <P className="text-2xl leading-7 text-gray-600">-</P>
                        </MotiView>
                      )}
                      {openFaq !== index && (
                        <MotiView
                          from={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ type: 'timing', duration: 250 }}
                          exit={{
                            opacity: 0,
                          }}
                          key="plus"
                        >
                          <P className="text-2xl leading-7 text-gray-600">+</P>
                        </MotiView>
                      )}
                    </AnimatePresence>
                  </View>
                </Pressable>

                <AnimateHeight hide={openFaq !== index}>
                  <AnimatePresence>
                    {openFaq === index && (
                      <MotiView
                        from={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ type: 'timing', duration: 600 }}
                        exit={{
                          opacity: 0,
                        }}
                      >
                        <P className="text-base leading-7 text-gray-600">
                          {faq.answer}
                        </P>
                      </MotiView>
                    )}
                  </AnimatePresence>
                </AnimateHeight>
              </View>
            )
          })}
        </View>
      </View>
    </View>
  )
}
