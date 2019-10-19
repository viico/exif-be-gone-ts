import {ExifBeGone} from './index';
import * as fs from 'fs';
import {ReadableStreamBuffer} from 'stream-buffers';

const reader: ReadableStreamBuffer = new ReadableStreamBuffer();

reader.put(fs.readFileSync('./Canon_40D.jpg'));
reader
    .pipe(new ExifBeGone())
    .pipe(fs.createWriteStream('out.jpg'));
