"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("../stream");
exports.parsePngIhdrChunk = stream_1.parse(stream_1.uint32Be('width'), stream_1.uint32Be('height'), stream_1.uint8('bitDepth'), stream_1.uint8('colorType'), stream_1.uint8('compressionMethod'), stream_1.uint8('filterMethod'), stream_1.uint8('interlaceMethod'));
exports.parsePngGenericChunk = (length) => stream_1.bytes('data', length);
exports.parsePngChunk = stream_1.parse(stream_1.uint32Be('length'), stream_1.fixedAsciiString('type', 4), stream_1.use(({ type, length }) => {
    var _a, _b;
    return (_b = (_a = {
        IDAT: exports.parsePngIhdrChunk,
    }) === null || _a === void 0 ? void 0 : _a[type], (_b !== null && _b !== void 0 ? _b : exports.parsePngGenericChunk(length)));
}), stream_1.uint32Be('crc'));
const bitCheck = stream_1.uint8('bitCheck');
exports.parsePng = stream_1.parse(bitCheck, stream_1.fixedAsciiString('magicHeader', 3), stream_1.skip(4), stream_1.repeatToEnd('chunks', exports.parsePngChunk));
