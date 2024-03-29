"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const png_1 = require("./formats/png");
const parsers_1 = require("./parsers");
const { readFile } = fs_1.promises;
const path = process.argv[2];
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const buffer = yield readFile(path_1.resolve(process.cwd(), path));
        const pngData = parsers_1.parse(png_1.png)(buffer);
        console.log(pngData);
    });
}
main().catch(err => console.log(err.stack));
