"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("./stream");
const parseChunk = stream_1.parse(stream_1.uint32('length'), stream_1.fixedAsciiString('type', 4), stream_1.use(({ length }) => stream_1.bytes('data', length)), stream_1.uint32('crc'));
// @ts-ignore
const parsePng = stream_1.parse(stream_1.uint8('bitCheck'), stream_1.fixedAsciiString('magicHeader', 3), stream_1.skip(4), stream_1.repeatToEnd('chunks', parseChunk));
