import { promises } from 'fs';
import { resolve } from 'path';
import { parsePng } from './formats/png';
import { reduceBuffer } from './stream';

const { readFile } = promises;

const path = process.argv[2];

async function main() {
    const buffer = await readFile(resolve(process.cwd(), path));
    const pngData = reduceBuffer(parsePng, buffer);
    console.log(pngData);
}

main().catch(err => console.log(err.stack));