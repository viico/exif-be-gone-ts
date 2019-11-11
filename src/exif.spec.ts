import * as fs from 'fs';
import {Exif} from './exif';
import {PATH_TEST_FILE_IN, PATH_TEST_FILE_OUT} from '../testing/constants';

describe('Exif', () => {

  afterEach(async (done) => {
    await fs.promises.unlink(PATH_TEST_FILE_OUT);
    done();
  });

  it('should remove exif data', async () => {
    Exif.remove(PATH_TEST_FILE_IN, PATH_TEST_FILE_OUT);
    const buffer = await fs.promises.readFile(PATH_TEST_FILE_OUT);
    expect(buffer.length).toEqual(5481);
  });
});
