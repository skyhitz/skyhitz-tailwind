import 'raf/polyfill'
import 'setimmediate'

import { Provider } from 'app/provider'
import Head from 'next/head'

import '../global.css'
import { AppProps } from 'next/app'

import { Inter, Raleway, Unbounded } from 'next/font/google'

const inter = Inter({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const raleway = Raleway({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
})

const unbounded = Unbounded({
  weight: ['600'],
  subsets: ['latin'],
  variable: '--font-unbounded',
  display: 'swap',
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Skyhitz</title>
        <meta
          name="description"
          content="Expo + Next.js with Solito. By Fernando Rojo."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider>
        <main
          className={`${inter.variable} ${raleway.variable}  ${unbounded.variable} font-sans`}
        >
          <Component {...pageProps} />
        </main>
      </Provider>
    </>
  )
}

export default MyApp
