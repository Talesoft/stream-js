import { Buffer as BrowserBuffer } from 'buffer';

export interface Context {
    buffer: ArrayBuffer;
    offset: number;
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
