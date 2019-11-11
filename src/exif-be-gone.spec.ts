import {WritableStreamBuffer} from 'stream-buffers';
import {ExifBeGone} from './index';
import * as fs from 'fs';
import {PATH_TEST_FILE_IN} from '../testing/constants';

describe('Exif be gone', () => {

  it('should strip data', async () => {
    const writer: WritableStreamBuffer = new WritableStreamBuffer();
    await fs.createReadStream(PATH_TEST_FILE_IN)
        .pipe(new ExifBeGone())
        .pipe(writer)
        .on('finish', () => {
          expect((writer.getContents() as Buffer).length).toEqual(5481);
        });
  });

});
