import { Context, Endian, isBuffer } from './common'

export type ReadFunction<V = Value> = (context: Context) => ValueLengthTuple<V>

export type Value = number | string | BigInt | Value[] | ArrayBuffer
export type ValueLengthTuple<V = Value> = readonly [V, number]

export const readBytes = (length: number) => ({ buffer, offset }: Context): ValueLengthTuple<ArrayBuffer> =>
    [buffer.slice(offset, offset + length), length] as const

export const readInt8 = ({ buffer, offset }: Context) =>
    [
        isBuffer(buffer)
            ? buffer.readInt8(offset)
            : new DataView(buffer, offset, Int8Array.BYTES_PER_ELEMENT).getInt8(offset),
        Int8Array.BYTES_PER_ELEMENT,
    ] as const

export const readUint8 = ({ buffer, offset }: Context) =>
    [
        isBuffer(buffer)
            ? buffer.readUInt8(offset)
            : new DataView(buffer, offset, Uint8Array.BYTES_PER_ELEMENT).getUint8(offset),
        Uint8Array.BYTES_PER_ELEMENT,
    ] as const

export const readInt16 = (endian: Endian) => ({ buffer, offset }: Context) =>
    [
        isBuffer(buffer)
            ? endian === Endian.LITTLE
                ? buffer.readInt16LE(offset)
                : buffer.readInt16BE(offset)
            : new DataView(buffer, offset, Int16Array.BYTES_PER_ELEMENT).getInt16(offset, endian === Endian.LITTLE),
        Int16Array.BYTES_PER_ELEMENT,
    ] as const
export const readInt16Le = readInt16(Endian.LITTLE)
export const readInt16Be = readInt16(Endian.BIG)

export const readUint16 = (endian: Endian) => ({ buffer, offset }: Context) =>
    [
        isBuffer(buffer)
            ? endian === Endian.LITTLE
                ? buffer.readUInt16LE(offset)
                : buffer.readUInt16BE(offset)
            : new DataView(buffer, offset, Uint16Array.BYTES_PER_ELEMENT).getUint16(offset, endian === Endian.LITTLE),
        Uint16Array.BYTES_PER_ELEMENT,
    ] as const
export const readUint16Le = readUint16(Endian.LITTLE)
export const readUint16Be = readUint16(Endian.BIG)

export const readInt32 = (endian: Endian) => ({ buffer, offset }: Context) =>
    [
        isBuffer(buffer)
            ? endian === Endian.LITTLE
                ? buffer.readInt32LE(offset)
                : buffer.readInt32BE(offset)
            : new DataView(buffer, offset, Int32Array.BYTES_PER_ELEMENT).getInt32(offset, endian === Endian.LITTLE),
        Int32Array.BYTES_PER_ELEMENT,
    ] as const
export const readInt32Le = readInt32(Endian.LITTLE)
export const readInt32Be = readInt32(Endian.BIG)

export const readUint32 = (endian: Endian) => ({ buffer, offset }: Context) =>
    [
        isBuffer(buffer)
            ? endian === Endian.LITTLE
                ? buffer.readUInt32LE(offset)
                : buffer.readUInt32BE(offset)
            : new DataView(buffer, offset, Uint32Array.BYTES_PER_ELEMENT).getUint32(offset, endian === Endian.LITTLE),
        Uint32Array.BYTES_PER_ELEMENT,
    ] as const
export const readUint32Le = readUint32(Endian.LITTLE)
export const readUint32Be = readUint32(Endian.BIG)

export const readBigInt64 = (endian: Endian) => ({ buffer, offset }: Context) =>
    [
        isBuffer(buffer)
            ? endian === Endian.LITTLE
                ? buffer.readBigInt64LE(offset)
                : buffer.readBigInt64BE(offset)
            : new DataView(buffer, offset, BigInt64Array.BYTES_PER_ELEMENT).getBigInt64(
                  offset,
                  endian === Endian.LITTLE,
              ),
        BigInt64Array.BYTES_PER_ELEMENT,
    ] as const
export const readBigInt64Le = readBigInt64(Endian.LITTLE)
export const readBigInt64Be = readBigInt64(Endian.BIG)

export const readBigUint64 = (endian: Endian) => ({ buffer, offset }: Context) =>
    [
        isBuffer(buffer)
            ? endian === Endian.LITTLE
                ? buffer.readBigUInt64LE(offset)
                : buffer.readBigUInt64BE(offset)
            : new DataView(buffer, offset, BigUint64Array.BYTES_PER_ELEMENT).getBigUint64(
                  offset,
                  endian === Endian.LITTLE,
              ),
        BigUint64Array.BYTES_PER_ELEMENT,
    ] as const
export const readBigUint64Le = readInt32(Endian.LITTLE)
export const readBigUint64Be = readInt32(Endian.BIG)

export const readFloat32 = (endian: Endian) => ({ buffer, offset }: Context) =>
    [
        isBuffer(buffer)
            ? endian === Endian.LITTLE
                ? buffer.readFloatLE(offset)
                : buffer.readFloatBE(offset)
            : new DataView(buffer, offset, Float32Array.BYTES_PER_ELEMENT).getFloat32(offset, endian === Endian.LITTLE),
        Float32Array.BYTES_PER_ELEMENT,
    ] as const
export const readFloat32Le = readInt32(Endian.LITTLE)
export const readFloat32Be = readInt32(Endian.BIG)

export const readFloat64 = (endian: Endian) => ({ buffer, offset }: Context) =>
    [
        isBuffer(buffer)
            ? endian === Endian.LITTLE
                ? buffer.readDoubleLE(offset)
                : buffer.readDoubleBE(offset)
            : new DataView(buffer, offset, Float64Array.BYTES_PER_ELEMENT).getFloat64(offset, endian === Endian.LITTLE),
        Float64Array.BYTES_PER_ELEMENT,
    ] as const
export const readFloat64Le = readFloat64(Endian.LITTLE)
export const readFloat64Be = readFloat64(Endian.BIG)

export const readFixedString = (encoding: string) => (length: number) => ({ buffer, offset }: Context) =>
    [
        isBuffer(buffer)
            ? buffer.slice(offset, offset + length).toString(encoding)
            : new TextDecoder(encoding).decode(buffer.slice(offset, offset + length)),
        length,
    ] as const

// TODO: readStringWithLengthPrefix()
// TODO: readNullTerminatedString
