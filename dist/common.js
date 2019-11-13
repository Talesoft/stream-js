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
