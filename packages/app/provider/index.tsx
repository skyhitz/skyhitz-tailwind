import { SafeArea } from './safe-area'
import { SolitoImageProvider } from 'solito/image'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SafeArea>
      <SolitoImageProvider nextJsURL="https://skyhitz.io">
        {children}
      </SolitoImageProvider>
    </SafeArea>
  )
}
