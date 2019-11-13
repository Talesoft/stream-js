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
export declare type PngChunkData = PngIhdrChunkData | PngGenericChunkData;
export interface PngData {
    bitCheck: number;
    magicHeader: string;
    chunks: PngChunkData[];
}
export declare const parsePngIhdrChunk: (context: import("../stream").ParserContext<PngIhdrChunkData>) => import("../stream").ParserContext<PngIhdrChunkData>;
export declare const parsePngGenericChunk: (length: number) => (context: import("../stream").ParserContext<{
    data: any;
}>) => import("../stream").ParserContext<{
    data: any;
}>;
export declare const parsePngChunk: (context: import("../stream").ParserContext<PngChunkData>) => import("../stream").ParserContext<PngChunkData>;
export declare const parsePng: (context: import("../stream").ParserContext<PngData>) => import("../stream").ParserContext<PngData>;
