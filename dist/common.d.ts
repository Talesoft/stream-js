/// <reference types="node" />
export interface Context {
    buffer: ArrayBuffer;
    offset: number;
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
