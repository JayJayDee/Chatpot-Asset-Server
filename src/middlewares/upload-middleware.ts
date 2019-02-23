import { injectable } from 'smart-factory';
import * as multer from 'multer';
import { pseudoRandomBytes } from 'crypto';
import { extname } from 'path';

import { MiddlewareModules } from './modules';
import { ConfigModules, ConfigTypes } from '../configs';
import { MiddlewareTypes } from './types';

injectable(MiddlewareModules.MulterInstance,
  [ ConfigModules.UploadConfig ],
  async (cfg: ConfigTypes.UploadConfig): Promise<MiddlewareTypes.MulterInstance> => {
    const storage = multer.diskStorage({
      destination(req, file, cb) {
        cb(null, `${cfg.uploadPath}`);
      },
      filename(req, file, cb) {
        pseudoRandomBytes(16, (err, raw) => {
          cb(null, `${raw.toString('hex')}${Date.now()}${extname(file.originalname)}`);
        });
      }
    });
    return multer({ storage });
  });