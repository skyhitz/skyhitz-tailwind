import { SkyhitzApolloProvider } from './apollo'
import { RecoilRoot } from 'recoil'

import { SafeArea } from './safe-area'
import { SolitoImageProvider } from 'solito/image'
import { PlaybackProvider } from 'app/provider/playback'

// hydration issues
import SkyhitzToastProvider from './toast'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SkyhitzApolloProvider>
      <SafeArea>
        <RecoilRoot>
          {/* <SkyhitzToastProvider> */}

          <PlaybackProvider>
            <SolitoImageProvider nextJsURL="https://skyhitz.io">
              {children}
            </SolitoImageProvider>
          </PlaybackProvider>

          {/* </SkyhitzToastProvider> */}
        </RecoilRoot>
      </SafeArea>
    </SkyhitzApolloProvider>
  )
}
