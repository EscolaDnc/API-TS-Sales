import path from 'path';
import multer, { StorageEngine } from 'multer';
import crypto from 'crypto';

interface IUploadConfig {
  directory: string;
  storage: StorageEngine;
}

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');

export default {
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');

      const filename = `${fileHash}-${file.originalname}`;

      callback(null, filename);
    },
  }),
} as IUploadConfig;
