import {TransformOptions} from 'stream';
import * as fs from "fs";
import {ExifBeGone} from './index';

export class Exif {

  public static remove(pathIn: string, pathOut: string, options?: TransformOptions): void {
    fs.createReadStream(pathIn)
        .pipe(new ExifBeGone(options))
        .pipe(fs.createWriteStream(pathOut));
  }
}
