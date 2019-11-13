export interface PngChunkBase {
    length: number;
    crc: number;
}
export interface PngRgbValue {
    red: number;
    green: number;
    blue: number;
}
export interface PngHeader extends PngChunkBase {
    type: 'ihdr';
    width: number;
    height: number;
    bitDepth: number;
    colorType: number;
    compressionMethod: number;
    filterMethod: number;
    interlaceMethod: number;
}
export interface PngPhysicalDimensions extends PngChunkBase {
    type: 'phys';
    x: number;
    y: number;
    unit: number;
}
export interface PngPalette extends PngChunkBase {
    type: 'plte';
    entries: PngRgbValue[];
}
export interface PngGenericChunk extends PngChunkBase {
    type: string;
    data: ArrayBuffer[];
}
export declare type PngChunk = PngHeader | PngGenericChunk;
export interface Png {
    bitCheck: number;
    magicHeader: string;
    chunks: PngChunk[];
}
export declare const pngRgbValue: (context: import("../parsers").ParserContext<PngRgbValue>) => import("../parsers").ParserContext<PngRgbValue>;
export declare const pngHeader: (context: import("../parsers").ParserContext<PngHeader>) => import("../parsers").ParserContext<PngHeader>;
export declare const pngPalette: (context: import("../parsers").ParserContext<PngPalette>) => import("../parsers").ParserContext<PngPalette>;
export declare const pngPhysicalDimensions: (context: import("../parsers").ParserContext<PngPhysicalDimensions>) => import("../parsers").ParserContext<PngPhysicalDimensions>;
export declare const pngGenericChunk: (length: number) => (context: import("../parsers").ParserContext<PngGenericChunk>) => import("../parsers").ParserContext<PngGenericChunk>;
export declare const pngChunk: (context: import("../parsers").ParserContext<PngChunk>) => import("../parsers").ParserContext<PngChunk>;
export declare const png: (context: import("../parsers").ParserContext<Png>) => import("../parsers").ParserContext<Png>;
