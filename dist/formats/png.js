"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parsers_1 = require("../parsers");
exports.pngRgbValue = parsers_1.sequence(parsers_1.uint8('red'), parsers_1.uint8('green'), parsers_1.uint8('blue'));
exports.pngHeader = parsers_1.sequence(parsers_1.uint32Be('width'), parsers_1.uint32Be('height'), parsers_1.uint8('bitDepth'), parsers_1.uint8('colorType'), parsers_1.uint8('compressionMethod'), parsers_1.uint8('filterMethod'), parsers_1.uint8('interlaceMethod'));
exports.pngPalette = parsers_1.use(({ length }) => parsers_1.repeat(length / 3)(exports.pngRgbValue)('entries'));
exports.pngPhysicalDimensions = parsers_1.sequence(parsers_1.uint32Be('x'), parsers_1.uint32Be('y'), parsers_1.uint8('unit'));
exports.pngGenericChunk = parsers_1.bytes('data');
exports.pngChunk = parsers_1.sequence(parsers_1.uint32Be('length'), parsers_1.fixedAsciiString(4)('type'), parsers_1.use(({ type, length }) => { var _a; return _a = parsers_1.when(type.toLowerCase())({
    ihdr: exports.pngHeader,
    plte: exports.pngPalette,
    phys: exports.pngPhysicalDimensions,
}), (_a !== null && _a !== void 0 ? _a : exports.pngGenericChunk(length)); }), parsers_1.uint32Be('crc'));
exports.png = parsers_1.sequence(parsers_1.uint8('bitCheck'), parsers_1.fixedAsciiString(3)('magicHeader'), parsers_1.skip(4), parsers_1.repeatToEnd(exports.pngChunk)('chunks'));
