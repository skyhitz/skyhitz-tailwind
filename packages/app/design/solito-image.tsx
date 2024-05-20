import { remapProps } from 'nativewind'
import { SolitoImage as Image } from 'solito/image'

remapProps(Image, { className: 'style' })

const normalizeSrc = (src) => {
  return src.startsWith('/') ? src.slice(1) : src
}

function cloudflareLoader({ src, width, quality }) {
  const params = [`width=${width}`]
  if (quality) {
    params.push(`quality=${quality}`)
  }
  const paramsString = params.join(',')
  const path = `/cdn-cgi/image/${paramsString}/${normalizeSrc(src)}`
  return __DEV__ ? src : path
}

export const SolitoImage = (props) => (
  <Image
    {...props}
    loader={cloudflareLoader}
    // unoptimized={__DEV__ ? true : props.unoptimized}
  />
)
