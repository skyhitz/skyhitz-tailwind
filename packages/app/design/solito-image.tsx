import { remapProps } from 'nativewind'
import { SolitoImage as Image } from 'solito/image'

remapProps(Image, { className: 'style' })

export const SolitoImage = Image
