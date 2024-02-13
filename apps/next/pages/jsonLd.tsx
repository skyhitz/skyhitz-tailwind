import { footer, homeContent, keywords } from 'app/constants/content'
import { Config } from 'app/config'
import Script from 'next/script'

export default function JsonLdScript() {
  const jsonLd = {
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
  return (
    <script
      type="application/ld+json"
      id="jsonld"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
