import {
    apply,
    Context,
    createContext,
    Endian,
} from './common';
import {
    readBigInt64,
    readBigUint64,
    readBytes,
    readFixedString,
    readFloat32,
    readFloat64,
    ReadFunction,
    readInt16,
    readInt32,
    readInt8,
    readUint16,
    readUint32,
    readUint8,
    ValueLengthTuple,
} from './readers';

export interface ParserContext<T> extends Context {
    values: Partial<T>;
}

export type ParseFunction<T> = (context: ParserContext<T>) => ParserContext<T>;

export const createParserContext = <T>(buffer: ArrayBuffer, offset: number = 0): ParserContext<T> => ({
    ...createContext(buffer),
    offset,
    values: {},
});

export const parse = <T>(fn: ParseFunction<T>) =>
    (buffer: ArrayBuffer, offset: number = 0) =>
        fn(createParserContext(buffer, offset)).values;

export const applyValue = <T, K extends keyof T = keyof T>([value, length]: ValueLengthTuple<T[K]>) =>
    (prop: K) =>
        (context: ParserContext<T>): ParserContext<T> => ({
            ...context,
            offset: context.offset + length,
            values: {
                ...context.values,
                [prop]: value,
            },
        });

export const applyArrayValue = <T, V = T>(prop: keyof T) =>
    (parentContext: ParserContext<T>) =>
        (context: ParserContext<V>): ParserContext<T> => ({
            ...context,
            values: {
                ...parentContext.values,
                [prop]: typeof parentContext.values[prop] === 'undefined'
                    || !Array.isArray(parentContext.values[prop])
                    ? [context.values]
                    : [...parentContext.values[prop] as any, context.values],
            },
        });

export const readValue = (fn: ReadFunction<any>) =>
    <T>(prop: keyof T) =>
        (context: ParserContext<T>): ParserContext<T> =>
            applyValue<T>(fn(context))(prop)(context);

export const bytes = <T>(prop: keyof T) =>
    (length: number) =>
        readValue(readBytes(length))(prop);

export const int8 = readValue(readInt8);
export const uint8 = readValue(readUint8);

export const int16 = (endian: Endian) => readValue(readInt16(endian));
export const int16Le = int16(Endian.LITTLE);
export const int16Be = int16(Endian.BIG);

export const uint16 = (endian: Endian) => readValue(readUint16(endian));
export const uit16Le = uint16(Endian.LITTLE);
export const uit16Be = uint16(Endian.BIG);

export const int32 = (endian: Endian) => readValue(readInt32(endian));
export const int32Le = int32(Endian.LITTLE);
export const int32Be = int32(Endian.BIG);

export const uint32 = (endian: Endian) => readValue(readUint32(endian));
export const uint32Le = uint32(Endian.LITTLE);
export const uint32Be = uint32(Endian.BIG);

export const bigInt64 =  (endian: Endian) => readValue(readBigInt64(endian));
export const bigInt64Le = bigInt64(Endian.LITTLE);
export const bigInt64Be = bigInt64(Endian.BIG);

export const bigUint64 = (endian: Endian) => readValue(readBigUint64(endian));
export const bigUint64Le = bigUint64(Endian.LITTLE);
export const bigUint64Be = bigUint64(Endian.BIG);

export const float32 = (endian: Endian) => readValue(readFloat32(endian));
export const float32Le = float32(Endian.LITTLE);
export const float32Be = float32(Endian.BIG);

export const float64 = (endian: Endian) => readValue(readFloat64(endian));
export const float64Le = float64(Endian.LITTLE);
export const float64Be = float64(Endian.BIG);

export const fixedString = (encoding: string) =>
    (length: number) =>
        readValue(readFixedString(encoding)(length));

export const fixedAsciiString = fixedString('ascii');
export const fixedUtf8String = fixedString('utf8');

export const skip = <T>(length: number) =>
    (context: ParserContext<T>): ParserContext<T> => ({
        ...context,
        offset: context.offset + length,
    });

export const sequence = <T>(...fns: Array<ParseFunction<T>>) =>
    (context: ParserContext<T>): ParserContext<T> =>
        fns.reduce((ctx, fn) => fn(ctx), context);

export const push = <V>(fn: ParseFunction<V>) =>
    <T>(prop: keyof T) =>
        (ctx: ParserContext<T>): ParserContext<T> => apply(
            applyArrayValue<T, V>(prop)(ctx),
            fn({ ...ctx as any as ParserContext<V>, values: {} as Partial<V> }),
        );

export const repeat = (length: number) =>
    <V>(fn: ParseFunction<V>) =>
        <T>(prop: keyof T) =>
            sequence(...Array.from({ length }, () => push(fn)(prop)));

export const repeatToEnd = <V>(fn: ParseFunction<V>) =>
    <T>(prop: keyof T): ParseFunction<T> =>
        sequence(
            push(fn)(prop),
            ctx => ctx.offset < ctx.buffer.byteLength ? repeatToEnd<V>(fn)(prop)(ctx) : ctx,
        );

export const clear = <T>(context: ParserContext<T>): ParserContext<T> => ({ ...context, values: {} });

export const use = <T>(handler: (values: T) => ParseFunction<T>) =>
    (context: ParserContext<T>): ParserContext<T> =>
        handler(context.values as T)(context);

export const when = <V extends string | number | symbol>(value: V) =>
    <T>(cases: { [K in V]: ParseFunction<any> }): ParseFunction<T> | undefined =>
        cases?.[value];

export const log = <T>(handler: (context: ParserContext<T>) => string) =>
    (context: ParserContext<T>): ParserContext<T> => {
        console.log(handler(context));
        return context;
    };

export const logProp = <T>(prop: keyof T) =>
    log<T>(ctx => `${prop}: ${ctx.values[prop]} [${ctx.offset}]`);
