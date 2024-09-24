import path from "node:path";
import fs from "node:fs"
import { log } from "node:console";
import { Transform } from 'node:stream';
const __dirname = import.meta.dirname;
const pathToFolder = path.join(__dirname, "files");
const pathToFile = path.join(pathToFolder, "info.txt");
const readStream = fs.createReadStream(pathToFile, { encoding: 'utf-8' });

readStream.on('data', (chunk) => {
    const letters = chunk.split('');
    letters.forEach((char, index) => {
        setTimeout(() => {
            process.stdout.write(char);
        }, index * 100)
    });
});

readStream
    .pipe(new Transform({
        transform(chunk) {
            this.push(chunk.toString().toUpperCase());
        }
    })).on('data', (chunk) => {log(chunk.toString());})