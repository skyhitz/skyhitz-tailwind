import 'raf/polyfill'
import 'setimmediate'

import { Provider } from 'app/provider'
import Head from 'next/head'

import '../global.css'
import { WebNavigation } from 'app/navigation/web'

import { AppProps } from 'next/app'

import { Inter, Raleway, Unbounded } from 'next/font/google'
import { imageUrlMedium, videoSrc } from 'app/utils/entry'
import { Config } from 'app/config'
import {
  combinedTitle,
  header,
  keywords,
  siteTitle,
  socialDesc,
} from 'app/constants/content'
import JsonLdScript from 'app/seo/jsonLd'
import { Entry, PublicUser } from 'app/api/graphql'
import { Post } from 'app/types'

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

function canonicalHref({
  entry,
  collector,
  post,
  chart,
  blog,
  search,
}: {
  entry: Entry
  collector: PublicUser
  post: Post
  chart: any
  blog: any
  search: any
}) {
  let href = Config.APP_URL

  if (entry) {
    href = `${href}/dashboard/beat/${entry.id}`
  }

  if (post) {
    href = `${href}/blog/${post.slug}`
  }

  if (collector) {
    href = `${href}/dashboard/collector/${collector.id}`
  }

  if (chart) {
    href = `${href}/dashboard/chart`
  }

  if (blog) {
    href = `${href}/blog`
  }

  if (search) {
    href = `${href}/dashboard/search`
  }

  return href
}

function MyApp({ Component, pageProps }: AppProps) {
  const entry = pageProps.entry
  const collector = pageProps.collector
  const post = pageProps.post
  const landing = pageProps.landing
  const chart = pageProps.chart
  const blog = pageProps.blog
  const search = pageProps.search

  return (
    <>
      <Head>
        <meta name="keywords" content={keywords} />
        {entry ? (
          <>
            <title>{entry.title}</title>
            <meta name="title" content={entry.title} />
            <meta name="description" content={entry.description} />
            <meta name="twitter:card" content="player" />
            <meta property="og:title" content={`${entry.title}`} />
            <meta property="twitter:title" content={`${entry.title}`} />
            <meta property="og:description" content={`${entry.description}`} />
            <meta property="og:type" content="website" />
            <meta
              property="twitter:image"
              content={`${imageUrlMedium(entry.imageUrl)}`}
            />
            <meta
              property="og:image"
              content={`${imageUrlMedium(entry.imageUrl)}`}
            />
            <meta
              property="twitter:player"
              content={`${videoSrc(entry.videoUrl)}`}
            />
            <meta property="twitter:player:width" content="480" />
            <meta property="twitter:player:height" content="480" />
            <meta property="og:video" content={`${videoSrc(entry.videoUrl)}`} />
            <meta property="og:video:type" content="video/mp4." />
            <meta property="og:video:width" content="480" />
            <meta property="og:video:height" content="480" />
            <meta
              property="og:url"
              content={`${Config.APP_URL}/dashboard/beat/${entry.id}`}
            />
          </>
        ) : collector ? (
          <>
            <title>{collector.username}</title>
            <meta name="title" content={collector.username} />
            <meta name="description" content={collector.description} />
            <meta name="twitter:card" content="summary" />
            <meta property="og:title" content={collector.username} />
            <meta property="og:description" content={collector.description} />
            <meta property="og:type" content="website" />
            <meta
              property="og:image"
              content={imageUrlMedium(collector.avatarUrl)}
            />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:width" content="480" />
            <meta property="og:image:height" content="480" />
            <meta
              property="og:url"
              content={`${Config.APP_URL}/dashboard/collector/${collector.id}`}
            />
          </>
        ) : post ? (
          <>
            <title>{post.title}</title>
            <meta name="title" content={post.title} />
            <meta
              name="description"
              content={
                post.content.replace(/<\/?[^>]+(>|$)/g, '').split('. ', 1)[0]
              }
            />
            <meta name="twitter:card" content="summary" />
            <meta property="og:title" content={post.title} />
            <meta property="og:description" content={post.content} />
            <meta property="og:type" content="website" />
            <meta property="og:image" content={post.imageUrl} />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:width" content="480" />
            <meta property="og:image:height" content="480" />
            <meta
              property="og:url"
              content={`${Config.APP_URL}/blog/${post.slug}`}
            />
          </>
        ) : (
          <>
            <title>{combinedTitle}</title>
            <meta name="title" content={siteTitle} />
            <meta name="description" content={header.desc.split('. ', 1)[0]} />
            <meta name="twitter:card" content="summary" />
            <meta property="og:title" content="Skyhitz" />
            <meta property="og:description" content={socialDesc} />
            <meta property="og:type" content="website" />
            <meta
              property="og:image"
              content={`${Config.APP_URL}/skyhitz.png`}
            />
            <meta property="og:url" key="og:url" content={Config.APP_URL} />
          </>
        )}

        <meta name="twitter:site" content="@skyhitz" />
        <meta property="fb:app_id" content="564403243666491" />
        <meta property="og:site_name" content="Skyhitz" />
        <meta
          name="p:domain_verify"
          content="418ab0845b3db4cf3f4c9efe8ad0f80e"
        />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#000" />

        <link
          rel="canonical"
          href={canonicalHref({ chart, blog, post, entry, collector, search })}
        />
        <link rel="icon" href="/icon.png" />
        <JsonLdScript
          landing={landing}
          chart={chart}
          blog={blog}
          post={post}
          entry={entry}
          collector={collector}
        />
      </Head>

      <main
        className={`${inter.variable} ${raleway.variable}  ${unbounded.variable} font-sans text-gray-600`}
      >
        <Provider>
          <WebNavigation>
            <Component {...pageProps} />
          </WebNavigation>
        </Provider>
      </main>
    </>
  )
}

export default MyApp
