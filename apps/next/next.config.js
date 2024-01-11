const { withExpo } = require('@expo/next-adapter')

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/.well-known/apple-app-site-association',
        destination: '/api/.well-known/apple-app-site-association',
        permanent: false,
      },
    ]
  },
  // reanimated (and thus, Moti) doesn't work with strict mode currently...
  // https://github.com/nandorojo/moti/issues/224
  // https://github.com/necolas/react-native-web/pull/2330
  // https://github.com/nandorojo/moti/issues/224
  // once that gets fixed, set this back to true
  reactStrictMode: false,
  transpilePackages: [
    'react-native',
    'react-native-web',
    'expo-linking',
    'expo-modules-core',
    'solito',
    'moti',
    'app',
    'react-native-reanimated',
    'react-native-gesture-handler',
    'nativewind',
    'react-native-css-interop',
    'react-native-svg',
    'react-native-safe-area-context',
    'react-native-htmlview',
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tailwindui.com',
        port: '',
        pathname: '/img/**',
      },
      {
        protocol: 'https',
        hostname: 'ipfs.skyhitz.io',
        port: '',
        pathname: '/ipfs/**',
      },
    ],
  },
}

require('dotenv').config({
  path: '../../.env',
})

module.exports = withExpo(nextConfig)
