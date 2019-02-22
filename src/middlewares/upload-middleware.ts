import { injectable } from 'smart-factory';
import { MiddlewareModules } from './modules';
import { ConfigModules, ConfigTypes } from '../configs';
import { MiddlewareTypes } from './types';
import * as multer from 'multer';

injectable(MiddlewareModules.SingleMulter,
  [ ConfigModules.UploadConfig ],
  async (cfg: ConfigTypes.UploadConfig): Promise<MiddlewareTypes.SingleMulter> =>
    (fileName: string) => multer({ dest: cfg.uploadPath }));