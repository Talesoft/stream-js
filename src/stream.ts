import { Buffer as BrowserBuffer } from 'buffer';

export interface Context {
    buffer: ArrayBuffer;
    offset: number;
}

export type Value = number | string | BigInt | Value[] | ArrayBuffer;
export type ValueLengthTuple<V = Value> = readonly [V, number];

export type ReadFunction<V = Value> = (context: Context) => ValueLengthTuple<V>;
export type ParseFunction<T> = (context: ParserContext<T>) => ParserContext<T>;

export interface ParserContext<T> extends Context {
    values: Partial<T>;
}

export enum SeekOrigin {
    CURRENT = 'current',
    SET = 'set',
    END = 'end',
}

export enum Endian {
    LITTLE = 'le',
    BIG = 'be',
}

export const apply = <T, V = T>(fn: (value: V) => T, value: V) => fn(value);

export const isNodeBuffer = (buffer: ArrayBuffer | Buffer): buffer is Buffer =>
    typeof module !== 'undefined' && typeof Buffer !== 'undefined' && buffer instanceof Buffer;

export const isBrowserBuffer = (buffer: ArrayBuffer | Buffer): buffer is Buffer =>
    buffer instanceof BrowserBuffer;

export const isBuffer = (buffer: ArrayBuffer | Buffer): buffer is Buffer =>
    isNodeBuffer(buffer) || isBrowserBuffer(buffer);

export const isArrayBuffer = (buffer: ArrayBuffer | Buffer): buffer is ArrayBuffer =>
    buffer instanceof ArrayBuffer;

export const createContext = (buffer: ArrayBuffer, offset: number = 0): Context => ({ buffer, offset });
export const createParserContext = <T>(buffer: ArrayBuffer, offset: number = 0): ParserContext<T> => ({
    ...createContext(buffer),
    offset,
    values: {},
});

export const reduceBuffer = <T>(fn: ParseFunction<T>, buffer: ArrayBuffer, offset: number = 0) =>
    fn(createParserContext(buffer, offset)).values;

export const getLength = ({ buffer }: Context) => buffer.byteLength;
export const getDataLength = <V = Value>(tuple: ValueLengthTuple<V>) => tuple[1];
export const getData = <V = Value>(tuple: ValueLengthTuple<V>) => tuple[0];

export const seek = (offset: number, origin: SeekOrigin = SeekOrigin.CURRENT) =>
    ({ buffer, offset: currentOffset }: Context) => ({
        buffer,
        offset:
            origin === SeekOrigin.END ? buffer.byteLength - offset :
            origin === SeekOrigin.SET ? offset :
            currentOffset + offset,
    });

export const slice = (length: number) =>
    ({ buffer, offset }: Context) =>
        createContext(buffer.slice(offset, offset + length));

export const readBytes = (length: number) =>
    ({ buffer, offset }: Context) => [
        buffer.slice(offset, offset + length),
        length,
    ] as const;

export const readInt8 = ({ buffer, offset }: Context) => [
    isBuffer(buffer)
        ? buffer.readInt8(offset)
        : new DataView(buffer, offset, Int8Array.BYTES_PER_ELEMENT).getInt8(offset),
    Int8Array.BYTES_PER_ELEMENT,
] as const;

export const readUint8 = ({ buffer, offset }: Context) => [
    isBuffer(buffer)
        ? buffer.readUInt8(offset)
        : new DataView(buffer, offset, Uint8Array.BYTES_PER_ELEMENT).getUint8(offset),
    Uint8Array.BYTES_PER_ELEMENT,
] as const;

export const readInt16 = (endian: Endian) =>
    ({ buffer, offset }: Context) => [
        isBuffer(buffer)
            ? (endian === Endian.LITTLE ? buffer.readInt16LE(offset) : buffer.readInt16BE(offset))
            : new DataView(buffer, offset, Int16Array.BYTES_PER_ELEMENT).getInt16(offset, endian === Endian.LITTLE),
        Int16Array.BYTES_PER_ELEMENT,
    ] as const;
export const readInt16Le = readInt16(Endian.LITTLE);
export const readInt16Be = readInt16(Endian.BIG);

export const readUint16 = (endian: Endian) =>
    ({ buffer, offset }: Context) => [
        isBuffer(buffer)
            ? (endian === Endian.LITTLE ? buffer.readUInt16LE(offset) : buffer.readUInt16BE(offset))
            : new DataView(buffer, offset, Uint16Array.BYTES_PER_ELEMENT).getUint16(offset, endian === Endian.LITTLE),
        Uint16Array.BYTES_PER_ELEMENT,
    ] as const;
export const readUint16Le = readUint16(Endian.LITTLE);
export const readUint16Be = readUint16(Endian.BIG);

export const readInt32 = (endian: Endian) =>
    ({ buffer, offset }: Context) => [
        isBuffer(buffer)
            ? (endian === Endian.LITTLE ? buffer.readInt32LE(offset) : buffer.readInt32BE(offset))
            : new DataView(buffer, offset, Int32Array.BYTES_PER_ELEMENT).getInt32(offset, endian === Endian.LITTLE),
        Int32Array.BYTES_PER_ELEMENT,
    ] as const;
export const readInt32Le = readInt32(Endian.LITTLE);
export const readInt32Be = readInt32(Endian.BIG);

export const readUint32 = (endian: Endian) =>
    ({ buffer, offset }: Context) => [
        isBuffer(buffer)
            ? (endian === Endian.LITTLE ? buffer.readUInt32LE(offset) : buffer.readUInt32BE(offset))
            : new DataView(buffer, offset, Uint32Array.BYTES_PER_ELEMENT).getUint32(offset, endian === Endian.LITTLE),
        Uint32Array.BYTES_PER_ELEMENT,
    ] as const;
export const readUint32Le = readUint32(Endian.LITTLE);
export const readUint32Be = readUint32(Endian.BIG);

export const readBigInt64 = (endian: Endian) =>
    ({ buffer, offset }: Context) => [
        isBuffer(buffer)
            ? (endian === Endian.LITTLE ? buffer.readBigInt64LE(offset) : buffer.readBigInt64BE(offset))
            : new DataView(buffer, offset, BigInt64Array.BYTES_PER_ELEMENT)
                .getBigInt64(offset, endian === Endian.LITTLE),
        BigInt64Array.BYTES_PER_ELEMENT,
    ] as const;
export const readBigInt64Le = readBigInt64(Endian.LITTLE);
export const readBigInt64Be = readBigInt64(Endian.BIG);

export const readBigUint64 = (endian: Endian) =>
    ({ buffer, offset }: Context) => [
        isBuffer(buffer)
            ? (endian === Endian.LITTLE ? buffer.readBigUInt64LE(offset) : buffer.readBigUInt64BE(offset))
            : new DataView(buffer, offset, BigUint64Array.BYTES_PER_ELEMENT)
                .getBigUint64(offset, endian === Endian.LITTLE),
        BigUint64Array.BYTES_PER_ELEMENT,
    ] as const;
export const readBigUint64Le = readInt32(Endian.LITTLE);
export const readBigUint64Be = readInt32(Endian.BIG);

export const readFloat32 = (endian: Endian) =>
    ({ buffer, offset }: Context) => [
        isBuffer(buffer)
            ? (endian === Endian.LITTLE ? buffer.readFloatLE(offset) : buffer.readFloatBE(offset))
            : new DataView(buffer, offset, Float32Array.BYTES_PER_ELEMENT).getFloat32(offset, endian === Endian.LITTLE),
        Float32Array.BYTES_PER_ELEMENT,
    ] as const;
export const readFloat32Le = readInt32(Endian.LITTLE);
export const readFloat32Be = readInt32(Endian.BIG);

export const readFloat64 = (endian: Endian) =>
    ({ buffer, offset }: Context) => [
        isBuffer(buffer)
            ? (endian === Endian.LITTLE ? buffer.readDoubleLE(offset) : buffer.readDoubleBE(offset))
            : new DataView(buffer, offset, Float64Array.BYTES_PER_ELEMENT).getFloat64(offset, endian === Endian.LITTLE),
        Float64Array.BYTES_PER_ELEMENT,
    ] as const;
export const readFloat64Le = readInt32(Endian.LITTLE);
export const readFloat64Be = readInt32(Endian.BIG);

export const readFixedString = (encoding: string, length: number) =>
    ({ buffer, offset }: Context) => [
        isBuffer(buffer)
            ? buffer.slice(offset, offset + length).toString(encoding)
            : new TextDecoder(encoding).decode(buffer.slice(offset, offset + length)),
        length,
    ] as const;

// TODO: readStringWithLengthPrefix()
// TODO: readNullTerminatedString

export const applyValue = <T, K extends keyof T = keyof T>(prop: K, [value, length]: ValueLengthTuple<T[K]>) =>
    (context: ParserContext<T>): ParserContext<T> => ({
        ...context,
        offset: context.offset + length,
        values: {
            ...context.values,
            [prop]: value,
        },
    });

export const mergeContextValueArray = <T, V = T, K extends keyof T = keyof T>(
    prop: K,
    parentContext: ParserContext<T>,
) => (context: ParserContext<V>): ParserContext<T> => ({
    ...context,
    values: {
        ...parentContext.values,
        [prop]: typeof parentContext.values[prop] === 'undefined'
            || !Array.isArray(parentContext.values[prop])
            ? [context.values]
            : [...parentContext.values[prop] as any, context.values],
    },
});

export const readValue = <T, K extends keyof T = keyof T>(prop: K, fn: ReadFunction<T[K]>) =>
    (context: ParserContext<T>): ParserContext<T> =>
        applyValue(prop, fn(context))(context);

export const bytes = <T>(prop: keyof T, length: number) => readValue<T>(prop, readBytes(length) as any);

export const int8 = <T>(prop: keyof T) => readValue<T>(prop, readInt8 as any);

export const uint8 = <T>(prop: keyof T) => readValue<T>(prop, readUint8 as any);

export const int16 = <T>(prop: keyof T, endian: Endian) => readValue<T>(prop, readInt16(endian) as any);
export const int16Le = <T>(prop: keyof T) => int16(prop, Endian.LITTLE);
export const int16Be = <T>(prop: keyof T) => int16(prop, Endian.BIG);

export const uint16 = <T>(prop: keyof T, endian: Endian) =>
    readValue<T>(prop, readUint16(endian) as any);
export const uint16Le = <T>(prop: keyof T) => uint16(prop, Endian.LITTLE);
export const uint16Be = <T>(prop: keyof T) => uint16(prop, Endian.BIG);

export const int32 = <T>(prop: keyof T, endian: Endian) => readValue<T>(prop, readInt32(endian) as any);
export const int32Le = <T>(prop: keyof T) => int32(prop, Endian.LITTLE);
export const int32Be = <T>(prop: keyof T) => int32(prop, Endian.BIG);

export const uint32 = <T>(prop: keyof T, endian: Endian) =>
    readValue<T>(prop, readUint32(endian) as any);
export const uint32Le = <T>(prop: keyof T) => uint32(prop, Endian.LITTLE);
export const uint32Be = <T>(prop: keyof T) => uint32(prop, Endian.BIG);

export const bigInt64 = <T>(prop: keyof T, endian: Endian) =>
    readValue<T>(prop, readBigInt64(endian) as any);
export const bigInt64Le = <T>(prop: keyof T) => bigInt64(prop, Endian.LITTLE);
export const bigInt64Be = <T>(prop: keyof T) => bigInt64(prop, Endian.BIG);

export const bigUint64 = <T>(prop: keyof T, endian: Endian) =>
    readValue<T>(prop, readBigUint64(endian) as any);
export const bigUint64Le = <T>(prop: keyof T) => bigUint64(prop, Endian.LITTLE);
export const bigUint64Be = <T>(prop: keyof T) => bigUint64(prop, Endian.BIG);

export const float32 = <T>(prop: keyof T, endian: Endian) =>
    readValue<T>(prop, readFloat32(endian) as any);
export const float32Le = <T>(prop: keyof T) => float32(prop, Endian.LITTLE);
export const float32Be = <T>(prop: keyof T) => float32(prop, Endian.BIG);

export const float64 = <T>(prop: keyof T, endian: Endian) =>
    readValue<T>(prop, readFloat64(endian) as any);
export const float64Le = <T>(prop: keyof T) => float64(prop, Endian.LITTLE);
export const float64Be = <T>(prop: keyof T) => float64(prop, Endian.BIG);

export const fixedString = <T>(prop: keyof T, encoding: string, length: number) =>
    readValue<T>(prop, readFixedString(encoding, length) as any);

export const fixedAsciiString = <T>(prop: keyof T, length: number) => fixedString(prop, 'ascii', length);
export const fixedUtf8String = <T>(prop: keyof T, length: number) => fixedString(prop, 'utf8', length);

export const skip = <T>(length: number) =>
    (context: ParserContext<T>): ParserContext<T> => ({
        ...context,
        offset: context.offset + length,
    });

export const parse = <T>(...fns: Array<ParseFunction<T>>) =>
    (context: ParserContext<T>): ParserContext<T> =>
        fns.reduce((ctx, fn) => fn(ctx), context);

export const push = <T, V = T>(prop: keyof T, fn: ParseFunction<V>) =>
    (ctx: ParserContext<T>): ParserContext<T> => apply(
        mergeContextValueArray<T, V>(prop, ctx),
        fn({ ...ctx as any as ParserContext<V>, values: {} as Partial<V> }),
    );

export const repeat = <T>(prop: keyof T, fn: ParseFunction<T>, length: number) =>
    parse(...Array.from(
        { length },
        () => push(prop, fn),
    ));

export const repeatToEnd = <T, V = T>(prop: keyof T, fn: ParseFunction<V>): ParseFunction<T> =>
    parse(push(prop, fn),  ctx => ctx.offset < ctx.buffer.byteLength ? repeatToEnd(prop, fn)(ctx) : ctx);

export const clear = <T>(context: ParserContext<T>): ParserContext<T> => ({
    ...context,
    values: {},
});

export const use = <T>(handler: (values: T) => ParseFunction<T>) =>
    (context: ParserContext<T>): ParserContext<T> =>
        handler(context.values as T)(context);

export const when = <T, V extends string | number | symbol>(
    value: V,
    cases: { [K in V]: ParseFunction<T> },
    defaultCase: ParseFunction<T>,
) => cases?.[value] ?? defaultCase;
