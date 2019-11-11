import * as fs from 'fs';
import {ReadableStreamBuffer} from 'stream-buffers';
import {PATH_TEST_FILE_IN} from './constants';
import {ExifBeGone} from '../src';

const reader: ReadableStreamBuffer = new ReadableStreamBuffer();

reader.put(fs.readFileSync(PATH_TEST_FILE_IN));
reader
    .pipe(new ExifBeGone())
    .pipe(fs.createWriteStream('testing/exampleResult.jpg'));
