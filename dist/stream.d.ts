/// <reference types="node" />
export interface Context {
    buffer: ArrayBuffer;
    offset: number;
}
export declare type Value = number | string | BigInt | Value[] | ArrayBuffer;
export declare type ValueLengthTuple<V = Value> = readonly [V, number];
export declare type ReadFunction<V = Value> = (context: Context) => ValueLengthTuple<V>;
export declare type ParseFunction<T> = (context: ParserContext<T>) => ParserContext<T>;
export interface ParserContext<T> extends Context {
    values: Partial<T>;
}
export declare enum SeekOrigin {
    CURRENT = "current",
    SET = "set",
    END = "end"
}
export declare enum Endian {
    LITTLE = "le",
    BIG = "be"
}
export declare const apply: <T, V = T>(fn: (value: V) => T, value: V) => T;
export declare const isNodeBuffer: (buffer: ArrayBuffer | Buffer) => buffer is Buffer;
export declare const isBrowserBuffer: (buffer: ArrayBuffer | Buffer) => buffer is Buffer;
export declare const isBuffer: (buffer: ArrayBuffer | Buffer) => buffer is Buffer;
export declare const isArrayBuffer: (buffer: ArrayBuffer | Buffer) => buffer is ArrayBuffer;
export declare const createContext: (buffer: ArrayBuffer, offset?: number) => Context;
export declare const createParserContext: <T>(buffer: ArrayBuffer, offset?: number) => ParserContext<T>;
export declare const reduceBuffer: <T>(fn: ParseFunction<T>, buffer: ArrayBuffer, offset?: number) => Partial<T>;
export declare const getLength: ({ buffer }: Context) => number;
export declare const getDataLength: <V = Value>(tuple: ValueLengthTuple<V>) => number;
export declare const getData: <V = Value>(tuple: ValueLengthTuple<V>) => V;
export declare const seek: (offset: number, origin?: SeekOrigin) => ({ buffer, offset: currentOffset }: Context) => {
    buffer: ArrayBuffer;
    offset: number;
};
export declare const slice: (length: number) => ({ buffer, offset }: Context) => Context;
export declare const readBytes: (length: number) => ({ buffer, offset }: Context) => readonly [ArrayBuffer, number];
export declare const readInt8: ({ buffer, offset }: Context) => readonly [number, number];
export declare const readUint8: ({ buffer, offset }: Context) => readonly [number, number];
export declare const readInt16: (endian: Endian) => ({ buffer, offset }: Context) => readonly [number, number];
export declare const readInt16Le: ({ buffer, offset }: Context) => readonly [number, number];
export declare const readInt16Be: ({ buffer, offset }: Context) => readonly [number, number];
export declare const readUint16: (endian: Endian) => ({ buffer, offset }: Context) => readonly [number, number];
export declare const readUint16Le: ({ buffer, offset }: Context) => readonly [number, number];
export declare const readUint16Be: ({ buffer, offset }: Context) => readonly [number, number];
export declare const readInt32: (endian: Endian) => ({ buffer, offset }: Context) => readonly [number, number];
export declare const readInt32Le: ({ buffer, offset }: Context) => readonly [number, number];
export declare const readInt32Be: ({ buffer, offset }: Context) => readonly [number, number];
export declare const readUint32: (endian: Endian) => ({ buffer, offset }: Context) => readonly [number, number];
export declare const readUint32Le: ({ buffer, offset }: Context) => readonly [number, number];
export declare const readUint32Be: ({ buffer, offset }: Context) => readonly [number, number];
export declare const readBigInt64: (endian: Endian) => ({ buffer, offset }: Context) => readonly [bigint, number];
export declare const readBigInt64Le: ({ buffer, offset }: Context) => readonly [bigint, number];
export declare const readBigInt64Be: ({ buffer, offset }: Context) => readonly [bigint, number];
export declare const readBigUint64: (endian: Endian) => ({ buffer, offset }: Context) => readonly [bigint, number];
export declare const readBigUint64Le: ({ buffer, offset }: Context) => readonly [number, number];
export declare const readBigUint64Be: ({ buffer, offset }: Context) => readonly [number, number];
export declare const readFloat32: (endian: Endian) => ({ buffer, offset }: Context) => readonly [number, number];
export declare const readFloat32Le: ({ buffer, offset }: Context) => readonly [number, number];
export declare const readFloat32Be: ({ buffer, offset }: Context) => readonly [number, number];
export declare const readFloat64: (endian: Endian) => ({ buffer, offset }: Context) => readonly [number, number];
export declare const readFloat64Le: ({ buffer, offset }: Context) => readonly [number, number];
export declare const readFloat64Be: ({ buffer, offset }: Context) => readonly [number, number];
export declare const readFixedString: (encoding: string, length: number) => ({ buffer, offset }: Context) => readonly [string, number];
export declare const applyValue: <T, K extends keyof T = keyof T>(prop: K, [value, length]: ValueLengthTuple<T[K]>) => (context: ParserContext<T>) => ParserContext<T>;
export declare const mergeContextValueArray: <T, V = T, K extends keyof T = keyof T>(prop: K, parentContext: ParserContext<T>) => (context: ParserContext<V>) => ParserContext<T>;
export declare const readValue: <T, K extends keyof T = keyof T>(prop: K, fn: ReadFunction<T[K]>) => (context: ParserContext<T>) => ParserContext<T>;
export declare const bytes: <T>(prop: keyof T, length: number) => (context: ParserContext<T>) => ParserContext<T>;
export declare const int8: <T>(prop: keyof T) => (context: ParserContext<T>) => ParserContext<T>;
export declare const uint8: <T>(prop: keyof T) => (context: ParserContext<T>) => ParserContext<T>;
export declare const int16: <T>(prop: keyof T, endian: Endian) => (context: ParserContext<T>) => ParserContext<T>;
export declare const int16Le: <T>(prop: keyof T) => (context: ParserContext<T>) => ParserContext<T>;
export declare const int16Be: <T>(prop: keyof T) => (context: ParserContext<T>) => ParserContext<T>;
export declare const uint16: <T>(prop: keyof T, endian: Endian) => (context: ParserContext<T>) => ParserContext<T>;
export declare const uint16Le: <T>(prop: keyof T) => (context: ParserContext<T>) => ParserContext<T>;
export declare const uint16Be: <T>(prop: keyof T) => (context: ParserContext<T>) => ParserContext<T>;
export declare const int32: <T>(prop: keyof T, endian: Endian) => (context: ParserContext<T>) => ParserContext<T>;
export declare const int32Le: <T>(prop: keyof T) => (context: ParserContext<T>) => ParserContext<T>;
export declare const int32Be: <T>(prop: keyof T) => (context: ParserContext<T>) => ParserContext<T>;
export declare const uint32: <T>(prop: keyof T, endian: Endian) => (context: ParserContext<T>) => ParserContext<T>;
export declare const uint32Le: <T>(prop: keyof T) => (context: ParserContext<T>) => ParserContext<T>;
export declare const uint32Be: <T>(prop: keyof T) => (context: ParserContext<T>) => ParserContext<T>;
export declare const bigInt64: <T>(prop: keyof T, endian: Endian) => (context: ParserContext<T>) => ParserContext<T>;
export declare const bigInt64Le: <T>(prop: keyof T) => (context: ParserContext<T>) => ParserContext<T>;
export declare const bigInt64Be: <T>(prop: keyof T) => (context: ParserContext<T>) => ParserContext<T>;
export declare const bigUint64: <T>(prop: keyof T, endian: Endian) => (context: ParserContext<T>) => ParserContext<T>;
export declare const bigUint64Le: <T>(prop: keyof T) => (context: ParserContext<T>) => ParserContext<T>;
export declare const bigUint64Be: <T>(prop: keyof T) => (context: ParserContext<T>) => ParserContext<T>;
export declare const float32: <T>(prop: keyof T, endian: Endian) => (context: ParserContext<T>) => ParserContext<T>;
export declare const float32Le: <T>(prop: keyof T) => (context: ParserContext<T>) => ParserContext<T>;
export declare const float32Be: <T>(prop: keyof T) => (context: ParserContext<T>) => ParserContext<T>;
export declare const float64: <T>(prop: keyof T, endian: Endian) => (context: ParserContext<T>) => ParserContext<T>;
export declare const float64Le: <T>(prop: keyof T) => (context: ParserContext<T>) => ParserContext<T>;
export declare const float64Be: <T>(prop: keyof T) => (context: ParserContext<T>) => ParserContext<T>;
export declare const fixedString: <T>(prop: keyof T, encoding: string, length: number) => (context: ParserContext<T>) => ParserContext<T>;
export declare const fixedAsciiString: <T>(prop: keyof T, length: number) => (context: ParserContext<T>) => ParserContext<T>;
export declare const fixedUtf8String: <T>(prop: keyof T, length: number) => (context: ParserContext<T>) => ParserContext<T>;
export declare const skip: <T>(length: number) => (context: ParserContext<T>) => ParserContext<T>;
export declare const parse: <T>(...fns: ParseFunction<T>[]) => (context: ParserContext<T>) => ParserContext<T>;
export declare const push: <T, V = T>(prop: keyof T, fn: ParseFunction<V>) => (ctx: ParserContext<T>) => ParserContext<T>;
export declare const repeat: <T>(prop: keyof T, fn: ParseFunction<T>, length: number) => (context: ParserContext<T>) => ParserContext<T>;
export declare const repeatToEnd: <T, V = T>(prop: keyof T, fn: ParseFunction<V>) => ParseFunction<T>;
export declare const clear: <T>(context: ParserContext<T>) => ParserContext<T>;
export declare const use: <T>(handler: (values: T) => ParseFunction<T>) => (context: ParserContext<T>) => ParserContext<T>;
export declare const when: <T, V extends string | number | symbol>(value: V, cases: { [K in V]: ParseFunction<T>; }, defaultCase: ParseFunction<T>) => ParseFunction<T>;
