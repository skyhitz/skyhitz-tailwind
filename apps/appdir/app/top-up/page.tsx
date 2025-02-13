'use client'

import { View } from 'react-native'
import CheckoutForm from 'app/ui/payments/checkout-form'

export default function Page() {
  return (
    <View className="App mx-auto flex h-screen w-full items-center justify-center">
      <CheckoutForm />
    </View>
  )
}
