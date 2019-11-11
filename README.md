# Exif be gone

Stream transformer to remove exif data

## Installation

Use `npm install exif-be-gone-ts` to install this package.

## Example usage

```typescript
import {ExifBeGone} from 'exif-be-gone-ts/ExifBeGone';
import * as fs from 'fs';
import {ReadableStreamBuffer} from 'stream-buffers';

const reader: ReadableStreamBuffer = new ReadableStreamBuffer();

reader.put(fs.readFileSync('./Canon_40D.jpg'));
reader
    .pipe(new ExifBeGone())
    .pipe(fs.createWriteStream('out.jpg'));
```
or :
```typescript
import {Exif} from 'exif-be-gone-ts/ExifBeGone';

Exif.remove('./Canon_40D.jpg', 'out.jpg');
```

To run the example :
```
npm run example
```
