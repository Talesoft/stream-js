import { bytes, fixedAsciiString, parse, repeatToEnd, skip, uint8, use, uint32Be } from "../stream";

export interface PngChunkDataBase {
    length: number;
    crc: number;
}

export interface PngIhdrChunkData extends PngChunkDataBase {
    type: 'IDAT';
    width: number;
    height: number;
    bitDepth: number;
    colorType: number;
    compressionMethod: number;
    filterMethod: number;
    interlaceMethod: number;
}

export interface PngGenericChunkData extends PngChunkDataBase {
    type: string;
    data: ArrayBuffer[];
}

export type PngChunkData = PngIhdrChunkData | PngGenericChunkData;

export interface PngData {
    bitCheck: number;
    magicHeader: string;
    chunks: PngChunkData[];
}

export const parsePngIhdrChunk = parse<PngIhdrChunkData>(
    uint32Be('width'),
    uint32Be('height'),
    uint8('bitDepth'),
    uint8('colorType'),
    uint8('compressionMethod'),
    uint8('filterMethod'),
    uint8('interlaceMethod'),
);

export const parsePngGenericChunk = (length: number) => bytes('data', length);

export const parsePngChunk = parse<PngChunkData>(
    uint32Be('length'),
    fixedAsciiString('type', 4),
    use(({ type, length }) => ({
        IDAT: parsePngIhdrChunk,
    } as any)?.[type] ?? parsePngGenericChunk(length)),
    uint32Be('crc'),
);

const bitCheck = uint8('bitCheck');

export const parsePng = parse<PngData>(
    bitCheck,
    fixedAsciiString('magicHeader', 3),
    skip(4),
    repeatToEnd('chunks', parsePngChunk),
);
