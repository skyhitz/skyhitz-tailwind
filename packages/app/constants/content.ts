import Wallet from 'app/ui/icons/wallet'
import Discover from 'app/ui/icons/discover'
import Collect from 'app/ui/icons/collect'
import Chart from 'app/ui/icons/chart'

export const siteTitle = 'Skyhitz - Music NFT marketplace'

export const keywords =
  'music nfts, music nft, nft music, nft for music, nft music meaning, nft and music, music nft marketplace, sell music nft, blockchain technology, non custodial, music blockchain, MFTs, music ownership, on-chain music, music creators, exclusive music nfts, download music nfts, stream music nfts, blockchain music, collect, music nft platform'

export const socialDesc =
  'Collect, stream and trade valuable music NFTs with the best music nft platform!'
export const header = {
  title: 'Join the future of music nfts',
  desc: 'The ultimate destination for music fans, collectors, and creators, offering a novel way to stream and experience music nfts like never before. We are a music blockchain platform that enables fans to discover, stream and collect unique creations through a decentralized framework.',
}
export const combinedTitle = `Skyhitz - ${header.title}`
const cta = {
  title: 'Redefine music ownership and accessibility',
  subtitle: 'Our Mission',
  desc: 'We envision a future where artists have full control over their creations, fans have direct and transparent access to the best music nft platform, and the nft music industry is reshaped through the innovative use of Ai and blockchain technology.',
  cta: 'Explore Music',
}
const featured = {
  title: 'Embrace the fusion of music and technology',
  subtitle: 'Enjoy our features',
  imgUrl: '/img/landing-2.jpg',
  features: [
    {
      name: 'Music wallet setup made easy',
      desc: 'Set up your digital wallet using email for a non custodial experience, ensuring seamless and secure transactions.',
      icon: Wallet,
    },
    {
      name: 'Discover the best music nft collections',
      desc: 'Dive into a variety of exceptional music collections available on our platform.',
      icon: Discover,
    },
    {
      name: 'Collect your favorite music NFTs',
      desc: 'Purchase fractions of your favorite music pieces for an affordable price, or own the entire masterpiece if you desire.',
      icon: Collect,
    },
    {
      name: 'Interactive Top Chart',
      desc: 'Discover and influence trending creations - where user interactions like buying, streaming, and liking propel tracks up the charts.',
      icon: Chart,
    },
  ],
}

const faq = {
  title: 'Frequently asked questions',
  faqs: [
    {
      question: 'On which network are you based?',
      answer:
        'We are based on Stellar, a network with multiple benefits like faster transaction speeds, lower fees, and a decentralized network making it the perfect choice for trading high valuable music assets.',
    },
    {
      question: 'Do I need a wallet?',
      answer:
        'No, we will create an in-app Stellar wallet for you with your email.',
    },
    {
      question: 'Why do I only see 1 mint of every MFT (Music NFT)?',
      answer:
        'We focus on indexing 1 mint of each of the most relevant, valuable, and expertly curated music NFTs, ensuring an unparalleled user experience centered on quality and exclusivity. This will enable us to provide liquidity to the asset, helping us find its true market value.',
    },
    {
      question: 'Can I use my phone? Or is it better to use a PC?',
      answer:
        'Yes, you can use both! We recommend using a web browser like Chrome or Safari on all of your devices.  Full mobile native support will be coming in the near future.',
    },
    {
      question:
        'Can I simply enjoy and listen to music on the platform without purchasing MFTs (Music NFTs)?',
      answer:
        "Absolutely! Whether you're a collector wanting something unique or a music lover just seeking to explore and enjoy different sounds, our platform has something special for you.",
    },
  ],
}

export const footer = {
  companyName: 'Skyhitz, Inc',
  sections: [
    {
      title: 'Explore',
      links: [
        { name: 'Music', href: '/dashboard/search' },
        { name: 'Trending', href: '/dashboard/chart' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'FAQ', href: '#faq' },
        { name: 'Contact', href: 'mailto:support@skyhitz.io' },
        { name: 'Terms', href: '/terms' },
        { name: 'Privacy', href: '/privacy' },
      ],
    },
    {
      title: 'Connect',
      links: [
        { name: 'Blog', href: '/blog' },
        { name: 'X', href: 'https://x.com/skyhitz' },
        { name: 'Instagram', href: 'https://instagram.com/skyhitz' },
        { name: 'Discord', href: 'https://discord.com/invite/2C3HzsPEuZ' },
      ],
    },
  ],
}

export const homeContent = {
  header,
  cta,
  featured,
  faq,
}
