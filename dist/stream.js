"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const buffer_1 = require("buffer");
var SeekOrigin;
(function (SeekOrigin) {
    SeekOrigin["CURRENT"] = "current";
    SeekOrigin["SET"] = "set";
    SeekOrigin["END"] = "end";
})(SeekOrigin = exports.SeekOrigin || (exports.SeekOrigin = {}));
var Endian;
(function (Endian) {
    Endian["LITTLE"] = "le";
    Endian["BIG"] = "be";
})(Endian = exports.Endian || (exports.Endian = {}));
exports.apply = (fn, value) => fn(value);
exports.isNodeBuffer = (buffer) => typeof module !== 'undefined' && typeof Buffer !== 'undefined' && buffer instanceof Buffer;
exports.isBrowserBuffer = (buffer) => buffer instanceof buffer_1.Buffer;
exports.isBuffer = (buffer) => exports.isNodeBuffer(buffer) || exports.isBrowserBuffer(buffer);
exports.isArrayBuffer = (buffer) => buffer instanceof ArrayBuffer;
exports.createContext = (buffer, offset = 0) => ({ buffer, offset });
exports.createParserContext = (buffer, offset = 0) => (Object.assign(Object.assign({}, exports.createContext(buffer)), { offset, values: {} }));
exports.reduceBuffer = (fn, buffer, offset = 0) => fn(exports.createParserContext(buffer, offset)).values;
exports.getLength = ({ buffer }) => buffer.byteLength;
exports.getDataLength = (tuple) => tuple[1];
exports.getData = (tuple) => tuple[0];
exports.seek = (offset, origin = SeekOrigin.CURRENT) => ({ buffer, offset: currentOffset }) => ({
    buffer,
    offset: origin === SeekOrigin.END ? buffer.byteLength - offset :
        origin === SeekOrigin.SET ? offset :
            currentOffset + offset,
});
exports.slice = (length) => ({ buffer, offset }) => exports.createContext(buffer.slice(offset, offset + length));
exports.readBytes = (length) => ({ buffer, offset }) => [
    buffer.slice(offset, offset + length),
    length,
];
exports.readInt8 = ({ buffer, offset }) => [
    exports.isBuffer(buffer)
        ? buffer.readInt8(offset)
        : new DataView(buffer, offset, Int8Array.BYTES_PER_ELEMENT).getInt8(offset),
    Int8Array.BYTES_PER_ELEMENT,
];
exports.readUint8 = ({ buffer, offset }) => [
    exports.isBuffer(buffer)
        ? buffer.readUInt8(offset)
        : new DataView(buffer, offset, Uint8Array.BYTES_PER_ELEMENT).getUint8(offset),
    Uint8Array.BYTES_PER_ELEMENT,
];
exports.readInt16 = (endian) => ({ buffer, offset }) => [
    exports.isBuffer(buffer)
        ? (endian === Endian.LITTLE ? buffer.readInt16LE(offset) : buffer.readInt16BE(offset))
        : new DataView(buffer, offset, Int16Array.BYTES_PER_ELEMENT).getInt16(offset, endian === Endian.LITTLE),
    Int16Array.BYTES_PER_ELEMENT,
];
exports.readInt16Le = exports.readInt16(Endian.LITTLE);
exports.readInt16Be = exports.readInt16(Endian.BIG);
exports.readUint16 = (endian) => ({ buffer, offset }) => [
    exports.isBuffer(buffer)
        ? (endian === Endian.LITTLE ? buffer.readUInt16LE(offset) : buffer.readUInt16BE(offset))
        : new DataView(buffer, offset, Uint16Array.BYTES_PER_ELEMENT).getUint16(offset, endian === Endian.LITTLE),
    Uint16Array.BYTES_PER_ELEMENT,
];
exports.readUint16Le = exports.readUint16(Endian.LITTLE);
exports.readUint16Be = exports.readUint16(Endian.BIG);
exports.readInt32 = (endian) => ({ buffer, offset }) => [
    exports.isBuffer(buffer)
        ? (endian === Endian.LITTLE ? buffer.readInt32LE(offset) : buffer.readInt32BE(offset))
        : new DataView(buffer, offset, Int32Array.BYTES_PER_ELEMENT).getInt32(offset, endian === Endian.LITTLE),
    Int32Array.BYTES_PER_ELEMENT,
];
exports.readInt32Le = exports.readInt32(Endian.LITTLE);
exports.readInt32Be = exports.readInt32(Endian.BIG);
exports.readUint32 = (endian) => ({ buffer, offset }) => [
    exports.isBuffer(buffer)
        ? (endian === Endian.LITTLE ? buffer.readUInt32LE(offset) : buffer.readUInt32BE(offset))
        : new DataView(buffer, offset, Uint32Array.BYTES_PER_ELEMENT).getUint32(offset, endian === Endian.LITTLE),
    Uint32Array.BYTES_PER_ELEMENT,
];
exports.readUint32Le = exports.readUint32(Endian.LITTLE);
exports.readUint32Be = exports.readUint32(Endian.BIG);
exports.readBigInt64 = (endian) => ({ buffer, offset }) => [
    exports.isBuffer(buffer)
        ? (endian === Endian.LITTLE ? buffer.readBigInt64LE(offset) : buffer.readBigInt64BE(offset))
        : new DataView(buffer, offset, BigInt64Array.BYTES_PER_ELEMENT)
            .getBigInt64(offset, endian === Endian.LITTLE),
    BigInt64Array.BYTES_PER_ELEMENT,
];
exports.readBigInt64Le = exports.readBigInt64(Endian.LITTLE);
exports.readBigInt64Be = exports.readBigInt64(Endian.BIG);
exports.readBigUint64 = (endian) => ({ buffer, offset }) => [
    exports.isBuffer(buffer)
        ? (endian === Endian.LITTLE ? buffer.readBigUInt64LE(offset) : buffer.readBigUInt64BE(offset))
        : new DataView(buffer, offset, BigUint64Array.BYTES_PER_ELEMENT)
            .getBigUint64(offset, endian === Endian.LITTLE),
    BigUint64Array.BYTES_PER_ELEMENT,
];
exports.readBigUint64Le = exports.readInt32(Endian.LITTLE);
exports.readBigUint64Be = exports.readInt32(Endian.BIG);
exports.readFloat32 = (endian) => ({ buffer, offset }) => [
    exports.isBuffer(buffer)
        ? (endian === Endian.LITTLE ? buffer.readFloatLE(offset) : buffer.readFloatBE(offset))
        : new DataView(buffer, offset, Float32Array.BYTES_PER_ELEMENT).getFloat32(offset, endian === Endian.LITTLE),
    Float32Array.BYTES_PER_ELEMENT,
];
exports.readFloat32Le = exports.readInt32(Endian.LITTLE);
exports.readFloat32Be = exports.readInt32(Endian.BIG);
exports.readFloat64 = (endian) => ({ buffer, offset }) => [
    exports.isBuffer(buffer)
        ? (endian === Endian.LITTLE ? buffer.readDoubleLE(offset) : buffer.readDoubleBE(offset))
        : new DataView(buffer, offset, Float64Array.BYTES_PER_ELEMENT).getFloat64(offset, endian === Endian.LITTLE),
    Float64Array.BYTES_PER_ELEMENT,
];
exports.readFloat64Le = exports.readInt32(Endian.LITTLE);
exports.readFloat64Be = exports.readInt32(Endian.BIG);
exports.readFixedString = (encoding, length) => ({ buffer, offset }) => [
    exports.isBuffer(buffer)
        ? buffer.slice(offset, offset + length).toString(encoding)
        : new TextDecoder(encoding).decode(buffer.slice(offset, offset + length)),
    length,
];
// TODO: readStringWithLengthPrefix()
// TODO: readNullTerminatedString
exports.applyValue = (prop, [value, length]) => (context) => (Object.assign(Object.assign({}, context), { offset: context.offset + length, values: Object.assign(Object.assign({}, context.values), { [prop]: value }) }));
exports.mergeContextValueArray = (prop, parentContext) => (context) => (Object.assign(Object.assign({}, context), { values: Object.assign(Object.assign({}, parentContext.values), { [prop]: typeof parentContext.values[prop] === 'undefined'
            || !Array.isArray(parentContext.values[prop])
            ? [context.values]
            : [...parentContext.values[prop], context.values] }) }));
exports.readValue = (prop, fn) => (context) => exports.applyValue(prop, fn(context))(context);
exports.bytes = (prop, length) => exports.readValue(prop, exports.readBytes(length));
exports.int8 = (prop) => exports.readValue(prop, exports.readInt8);
exports.uint8 = (prop) => exports.readValue(prop, exports.readUint8);
exports.int16 = (prop, endian) => exports.readValue(prop, exports.readInt16(endian));
exports.int16Le = (prop) => exports.int16(prop, Endian.LITTLE);
exports.int16Be = (prop) => exports.int16(prop, Endian.BIG);
exports.uint16 = (prop, endian) => exports.readValue(prop, exports.readUint16(endian));
exports.uint16Le = (prop) => exports.uint16(prop, Endian.LITTLE);
exports.uint16Be = (prop) => exports.uint16(prop, Endian.BIG);
exports.int32 = (prop, endian) => exports.readValue(prop, exports.readInt32(endian));
exports.int32Le = (prop) => exports.int32(prop, Endian.LITTLE);
exports.int32Be = (prop) => exports.int32(prop, Endian.BIG);
exports.uint32 = (prop, endian) => exports.readValue(prop, exports.readUint32(endian));
exports.uint32Le = (prop) => exports.uint32(prop, Endian.LITTLE);
exports.uint32Be = (prop) => exports.uint32(prop, Endian.BIG);
exports.bigInt64 = (prop, endian) => exports.readValue(prop, exports.readBigInt64(endian));
exports.bigInt64Le = (prop) => exports.bigInt64(prop, Endian.LITTLE);
exports.bigInt64Be = (prop) => exports.bigInt64(prop, Endian.BIG);
exports.bigUint64 = (prop, endian) => exports.readValue(prop, exports.readBigUint64(endian));
exports.bigUint64Le = (prop) => exports.bigUint64(prop, Endian.LITTLE);
exports.bigUint64Be = (prop) => exports.bigUint64(prop, Endian.BIG);
exports.float32 = (prop, endian) => exports.readValue(prop, exports.readFloat32(endian));
exports.float32Le = (prop) => exports.float32(prop, Endian.LITTLE);
exports.float32Be = (prop) => exports.float32(prop, Endian.BIG);
exports.float64 = (prop, endian) => exports.readValue(prop, exports.readFloat64(endian));
exports.float64Le = (prop) => exports.float64(prop, Endian.LITTLE);
exports.float64Be = (prop) => exports.float64(prop, Endian.BIG);
exports.fixedString = (prop, encoding, length) => exports.readValue(prop, exports.readFixedString(encoding, length));
exports.fixedAsciiString = (prop, length) => exports.fixedString(prop, 'ascii', length);
exports.fixedUtf8String = (prop, length) => exports.fixedString(prop, 'utf8', length);
exports.skip = (length) => (context) => (Object.assign(Object.assign({}, context), { offset: context.offset + length }));
exports.parse = (...fns) => (context) => fns.reduce((ctx, fn) => fn(ctx), context);
exports.push = (prop, fn) => (ctx) => exports.apply(exports.mergeContextValueArray(prop, ctx), fn(Object.assign(Object.assign({}, ctx), { values: {} })));
exports.repeat = (prop, fn, length) => exports.parse(...Array.from({ length }, () => exports.push(prop, fn)));
exports.repeatToEnd = (prop, fn) => exports.parse(exports.push(prop, fn), ctx => ctx.offset < ctx.buffer.byteLength ? exports.repeatToEnd(prop, fn)(ctx) : ctx);
exports.clear = (context) => (Object.assign(Object.assign({}, context), { values: {} }));
exports.use = (handler) => (context) => handler(context.values)(context);
exports.when = (value, cases, defaultCase) => { var _a, _b; return _b = (_a = cases) === null || _a === void 0 ? void 0 : _a[value], (_b !== null && _b !== void 0 ? _b : defaultCase); };
