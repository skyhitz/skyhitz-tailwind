import { footer, homeContent, keywords } from 'app/constants/content'
import { Config } from 'app/config'
import { Post } from 'app/types'
import { Entry, PublicUser } from 'app/api/graphql'
import { formattedISODate } from 'app/utils'
import { imageUrlMedium } from 'app/utils/entry'

export default function JsonLdScript({
  landing,
  chart,
  blog,
  post,
  entry,
  collector,
}: {
  landing?: boolean
  chart?: Entry[]
  blog?: Post[]
  post?: Post
  entry?: Entry
  collector?: PublicUser
}) {
  let jsonLd

  if (landing) {
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'OnlineBusiness',
      name: 'Skyhitz',
      legalName: footer.companyName,
      logo: {
        '@type': 'ImageObject',
        url: 'https://skyhitz.io/icon.png',
      },
      description: homeContent.header.desc,
      url: Config.APP_URL,
      '@id': `${Config.APP_URL}#mission`,
      areaServed: 'Worldwide',
      award: 'Stellar Community Fund',
      sameAs: [
        'https://www.facebook.com/skyhitzio',
        'https://instagram.com/skyhitz',
        'https://www.youtube.com/@skyhitzio',
        'https://www.linkedin.com/company/skyhitz',
        'https://www.tiktok.com/@skyhitz',
        'https://twitter.com/skyhitz',
        'https://communityfund.stellar.org/project/skyhitz',
      ],
      founder: {
        '@type': 'Person',
        name: 'Alejo Mendoza',
      },
      email: 'support@skyhitz.io',
      keywords: keywords,
      knowsAbout: 'Music NFTs',
    }
  }

  if (chart) {
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: chart.map((entry, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          url: `http://skyhitz.io/dashboard/beat/${entry.id}`,
          name: entry.artist ? `${entry.artist} ${entry.title}` : entry.title,
          image: imageUrlMedium(entry.imageUrl),
          ...(entry.description ? { description: entry.description } : {}),
          category: 'Music NFTs',
        },
      })),
    }
  }

  if (blog) {
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: blog.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'BlogPosting',
          headline: post.title,
          image: post.imageUrl,
          url: `https://skyhitz.io/blog/${post.slug}`,
          genre: post.tag,
          keywords: keywords,
          publisher: footer.companyName,
          datePublished: formattedISODate(post.publishedAtTimestamp),
          dateCreated: formattedISODate(post.publishedAtTimestamp),
          dateModified: formattedISODate(post.publishedAtTimestamp),
          description: post.content
            .replace(/<\/?[^>]+(>|$)/g, '')
            .split('. ', 1)[0],
          articleBody: post.content.replace(/<\/?[^>]+(>|$)/g, ''),
          author: {
            '@type': 'Person',
            name: 'Alejo Mendoza',
          },
          email: 'support@skyhitz.io',
        },
      })),
    }
  }

  if (post) {
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      image: post.imageUrl,
      url: `https://skyhitz.io/blog/${post.slug}`,
      genre: post.tag,
      keywords: keywords,
      publisher: footer.companyName,
      datePublished: formattedISODate(post.publishedAtTimestamp),
      dateCreated: formattedISODate(post.publishedAtTimestamp),
      dateModified: formattedISODate(post.publishedAtTimestamp),
      description: post.content
        .replace(/<\/?[^>]+(>|$)/g, '')
        .split('. ', 1)[0],
      articleBody: post.content.replace(/<\/?[^>]+(>|$)/g, ''),
      author: {
        '@type': 'Person',
        name: 'Alejo Mendoza',
      },
      email: 'support@skyhitz.io',
    }
  }

  if (entry) {
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      url: `http://skyhitz.io/dashboard/beat/${entry.id}`,
      name: entry.artist ? `${entry.artist} ${entry.title}` : entry.title,
      image: imageUrlMedium(entry.imageUrl),
      ...(entry.description ? { description: entry.description } : {}),
      category: 'Music NFTs',
    }
  }

  // some users have timestamps in strings
  if (collector) {
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      dateCreated: formattedISODate(
        parseInt(collector.publishedAtTimestamp as any),
      ),
      dateModified: formattedISODate(
        parseInt(collector.publishedAtTimestamp as any),
      ),
      mainEntity: {
        '@type': 'Person',
        name: collector.displayName,
        alternateName: collector.username,
        identifier: collector.id,
        ...(collector.description
          ? { description: collector.description }
          : {}),
        ...(collector.avatarUrl
          ? { image: imageUrlMedium(collector.avatarUrl) }
          : {}),
      },
    }
  }

  if (!jsonLd) return null

  return (
    <script
      type="application/ld+json"
      id="jsonld"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
