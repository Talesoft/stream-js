import { promises } from 'fs';
import { resolve } from 'path';
import { png } from './formats/png';
import { parse } from './parsers';

const { readFile } = promises;

const path = process.argv[2];

async function main() {
    const buffer = await readFile(resolve(process.cwd(), path));
    const pngData = parse(png)(buffer);
    console.log(pngData);
}

main().catch(err => console.log(err.stack));
