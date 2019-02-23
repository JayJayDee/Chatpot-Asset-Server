import { injectable } from 'smart-factory';
import { MiddlewareModules } from './modules';
import { ConfigModules, ConfigTypes } from '../configs';
import { MiddlewareTypes } from './types';
import * as multer from 'multer';

injectable(MiddlewareModules.MulterInstance,
  [ ConfigModules.UploadConfig ],
  async (cfg: ConfigTypes.UploadConfig): Promise<MiddlewareTypes.MulterInstance> =>
    multer({ dest: cfg.uploadPath }));