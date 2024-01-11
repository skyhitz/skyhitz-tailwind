import { SkyhitzApolloProvider } from './apollo'
import { RecoilRoot } from 'recoil'

import { SafeArea } from './safe-area'
import { SolitoImageProvider } from 'solito/image'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SkyhitzApolloProvider>
      <SafeArea>
        <RecoilRoot>
          <SolitoImageProvider nextJsURL="https://skyhitz.io">
            {children}
          </SolitoImageProvider>
        </RecoilRoot>
      </SafeArea>
    </SkyhitzApolloProvider>
  )
}
