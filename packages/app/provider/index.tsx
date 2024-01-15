import { SkyhitzApolloProvider } from './apollo'
import { RecoilRoot } from 'recoil'

import { SafeArea } from './safe-area'
import { SolitoImageProvider } from 'solito/image'
// hydration issues
import SkyhitzToastProvider from './toast'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SkyhitzApolloProvider>
      <SafeArea>
        <RecoilRoot>
          {/* <SkyhitzToastProvider> */}
          <SolitoImageProvider nextJsURL="https://skyhitz.io">
            {children}
          </SolitoImageProvider>
          {/* </SkyhitzToastProvider> */}
        </RecoilRoot>
      </SafeArea>
    </SkyhitzApolloProvider>
  )
}
