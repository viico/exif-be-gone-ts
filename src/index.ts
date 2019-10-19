import {Transform, TransformCallback, TransformOptions} from 'stream';

const app1Marker: Buffer = Buffer.from('ffe1', 'hex');
const exifMarker: Buffer = Buffer.from('457869660000', 'hex'); // Exif\0\0

export class ExifBeGone extends Transform {

  private remainingBytes: number | undefined;

  constructor(options?: TransformOptions) {
    super(options);
    this.remainingBytes = undefined;
  }

  public _transform(chunk: any, encoding: string, callback: TransformCallback): void {
    if (chunk.length === 0) {
      return callback();
    }

    if (this.remainingBytes === undefined) {
      const app1Start: number = chunk.indexOf(app1Marker);
      if (app1Start === -1 || !chunk.slice(app1Start + 4, app1Start + 10).equals(exifMarker)) {
        this.push(chunk);
        return callback();
      }

      this.remainingBytes = chunk.readInt16BE(app1Start + 2);
      this.push(chunk.slice(0, app1Start));
      chunk = chunk.slice(app1Start);
    }

    if (this.remainingBytes && chunk.length > this.remainingBytes + 1) {
      this.push(chunk.slice(this.remainingBytes + 1));
      this.remainingBytes = undefined;
    } else {
      this.remainingBytes = (this.remainingBytes || 0) - chunk.length;
    }

    callback();
  }

  public _flush(callback: TransformCallback): void {
    callback();
  }

  public _final(callback: TransformCallback): void {
    callback();
  }
}
