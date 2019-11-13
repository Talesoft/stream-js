"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
exports.readBytes = (length) => ({ buffer, offset }) => [
    buffer.slice(offset, offset + length),
    length,
];
exports.readInt8 = ({ buffer, offset }) => [
    common_1.isBuffer(buffer)
        ? buffer.readInt8(offset)
        : new DataView(buffer, offset, Int8Array.BYTES_PER_ELEMENT).getInt8(offset),
    Int8Array.BYTES_PER_ELEMENT,
];
exports.readUint8 = ({ buffer, offset }) => [
    common_1.isBuffer(buffer)
        ? buffer.readUInt8(offset)
        : new DataView(buffer, offset, Uint8Array.BYTES_PER_ELEMENT).getUint8(offset),
    Uint8Array.BYTES_PER_ELEMENT,
];
exports.readInt16 = (endian) => ({ buffer, offset }) => [
    common_1.isBuffer(buffer)
        ? (endian === common_1.Endian.LITTLE ? buffer.readInt16LE(offset) : buffer.readInt16BE(offset))
        : new DataView(buffer, offset, Int16Array.BYTES_PER_ELEMENT).getInt16(offset, endian === common_1.Endian.LITTLE),
    Int16Array.BYTES_PER_ELEMENT,
];
exports.readInt16Le = exports.readInt16(common_1.Endian.LITTLE);
exports.readInt16Be = exports.readInt16(common_1.Endian.BIG);
exports.readUint16 = (endian) => ({ buffer, offset }) => [
    common_1.isBuffer(buffer)
        ? (endian === common_1.Endian.LITTLE ? buffer.readUInt16LE(offset) : buffer.readUInt16BE(offset))
        : new DataView(buffer, offset, Uint16Array.BYTES_PER_ELEMENT).getUint16(offset, endian === common_1.Endian.LITTLE),
    Uint16Array.BYTES_PER_ELEMENT,
];
exports.readUint16Le = exports.readUint16(common_1.Endian.LITTLE);
exports.readUint16Be = exports.readUint16(common_1.Endian.BIG);
exports.readInt32 = (endian) => ({ buffer, offset }) => [
    common_1.isBuffer(buffer)
        ? (endian === common_1.Endian.LITTLE ? buffer.readInt32LE(offset) : buffer.readInt32BE(offset))
        : new DataView(buffer, offset, Int32Array.BYTES_PER_ELEMENT).getInt32(offset, endian === common_1.Endian.LITTLE),
    Int32Array.BYTES_PER_ELEMENT,
];
exports.readInt32Le = exports.readInt32(common_1.Endian.LITTLE);
exports.readInt32Be = exports.readInt32(common_1.Endian.BIG);
exports.readUint32 = (endian) => ({ buffer, offset }) => [
    common_1.isBuffer(buffer)
        ? (endian === common_1.Endian.LITTLE ? buffer.readUInt32LE(offset) : buffer.readUInt32BE(offset))
        : new DataView(buffer, offset, Uint32Array.BYTES_PER_ELEMENT).getUint32(offset, endian === common_1.Endian.LITTLE),
    Uint32Array.BYTES_PER_ELEMENT,
];
exports.readUint32Le = exports.readUint32(common_1.Endian.LITTLE);
exports.readUint32Be = exports.readUint32(common_1.Endian.BIG);
exports.readBigInt64 = (endian) => ({ buffer, offset }) => [
    common_1.isBuffer(buffer)
        ? (endian === common_1.Endian.LITTLE ? buffer.readBigInt64LE(offset) : buffer.readBigInt64BE(offset))
        : new DataView(buffer, offset, BigInt64Array.BYTES_PER_ELEMENT)
            .getBigInt64(offset, endian === common_1.Endian.LITTLE),
    BigInt64Array.BYTES_PER_ELEMENT,
];
exports.readBigInt64Le = exports.readBigInt64(common_1.Endian.LITTLE);
exports.readBigInt64Be = exports.readBigInt64(common_1.Endian.BIG);
exports.readBigUint64 = (endian) => ({ buffer, offset }) => [
    common_1.isBuffer(buffer)
        ? (endian === common_1.Endian.LITTLE ? buffer.readBigUInt64LE(offset) : buffer.readBigUInt64BE(offset))
        : new DataView(buffer, offset, BigUint64Array.BYTES_PER_ELEMENT)
            .getBigUint64(offset, endian === common_1.Endian.LITTLE),
    BigUint64Array.BYTES_PER_ELEMENT,
];
exports.readBigUint64Le = exports.readInt32(common_1.Endian.LITTLE);
exports.readBigUint64Be = exports.readInt32(common_1.Endian.BIG);
exports.readFloat32 = (endian) => ({ buffer, offset }) => [
    common_1.isBuffer(buffer)
        ? (endian === common_1.Endian.LITTLE ? buffer.readFloatLE(offset) : buffer.readFloatBE(offset))
        : new DataView(buffer, offset, Float32Array.BYTES_PER_ELEMENT).getFloat32(offset, endian === common_1.Endian.LITTLE),
    Float32Array.BYTES_PER_ELEMENT,
];
exports.readFloat32Le = exports.readInt32(common_1.Endian.LITTLE);
exports.readFloat32Be = exports.readInt32(common_1.Endian.BIG);
exports.readFloat64 = (endian) => ({ buffer, offset }) => [
    common_1.isBuffer(buffer)
        ? (endian === common_1.Endian.LITTLE ? buffer.readDoubleLE(offset) : buffer.readDoubleBE(offset))
        : new DataView(buffer, offset, Float64Array.BYTES_PER_ELEMENT).getFloat64(offset, endian === common_1.Endian.LITTLE),
    Float64Array.BYTES_PER_ELEMENT,
];
exports.readFloat64Le = exports.readInt32(common_1.Endian.LITTLE);
exports.readFloat64Be = exports.readInt32(common_1.Endian.BIG);
exports.readFixedString = (encoding) => (length) => ({ buffer, offset }) => [
    common_1.isBuffer(buffer)
        ? buffer.slice(offset, offset + length).toString(encoding)
        : new TextDecoder(encoding).decode(buffer.slice(offset, offset + length)),
    length,
];
// TODO: readStringWithLengthPrefix()
// TODO: readNullTerminatedString
