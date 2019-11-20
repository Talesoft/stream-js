import { bytes, fixedAsciiString, repeat, repeatToEnd, sequence, skip, uint32Be, uint8, use, when } from '../parsers'

export interface PngChunkBase {
    length: number
    crc: number
}

export interface PngRgbValue {
    red: number
    green: number
    blue: number
}

export interface PngHeader extends PngChunkBase {
    type: 'ihdr'
    width: number
    height: number
    bitDepth: number
    colorType: number
    compressionMethod: number
    filterMethod: number
    interlaceMethod: number
}

export interface PngImageData extends PngChunkBase {
    type: 'idat'
}

export interface PngPhysicalDimensions extends PngChunkBase {
    type: 'phys'
    x: number
    y: number
    unit: number
}

export interface PngPalette extends PngChunkBase {
    type: 'plte'
    entries: PngRgbValue[]
}

export interface PngGenericChunk extends PngChunkBase {
    type: string
    data: ArrayBuffer[]
}

export type PngChunk = PngHeader | PngGenericChunk

export interface Png {
    bitCheck: number
    magicHeader: string
    chunks: PngChunk[]
}

export const pngRgbValue = sequence<PngRgbValue>(uint8('red'), uint8('green'), uint8('blue'))

export const pngHeader = sequence<PngHeader>(
    uint32Be('width'),
    uint32Be('height'),
    uint8('bitDepth'),
    uint8('colorType'),
    uint8('compressionMethod'),
    uint8('filterMethod'),
    uint8('interlaceMethod'),
)

export const pngPalette = use<PngPalette>(({ length }) => repeat(length / 3)(pngRgbValue)('entries'))
export const pngPhysicalDimensions = sequence<PngPhysicalDimensions>(uint32Be('x'), uint32Be('y'), uint8('unit'))

export const pngGenericChunk = bytes<PngGenericChunk>('data')

export const pngChunk = sequence<PngChunk>(
    uint32Be('length'),
    fixedAsciiString(4)('type'),
    use(
        ({ type, length }: PngChunk) =>
            when(type.toLowerCase())({
                ihdr: pngHeader,
                plte: pngPalette,
                phys: pngPhysicalDimensions,
            }) ?? pngGenericChunk(length),
    ),
    uint32Be('crc'),
)

export const png = sequence<Png>(
    uint8('bitCheck'),
    fixedAsciiString(3)('magicHeader'),
    skip(4),
    repeatToEnd(pngChunk)('chunks'),
)
