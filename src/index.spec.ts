import {WritableStreamBuffer} from 'stream-buffers';
import {ExifBeGone} from './index';
import * as fs from 'fs';

describe('Exif be gone', () => {

  it('should strip data', async () => {
    const writer: WritableStreamBuffer = new WritableStreamBuffer();
    await fs.createReadStream('Canon_40D.jpg')
        .pipe(new ExifBeGone())
        .pipe(writer)
        .on('finish', () => {
          expect((writer.getContents() as Buffer).length).toEqual(5481);
        });
  });

});
