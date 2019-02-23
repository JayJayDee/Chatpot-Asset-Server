import { injectable } from 'smart-factory';
import { join, extname } from 'path';
import * as sharp from 'sharp';
import { UtilModules } from './modules';
import { ConfigModules, ConfigTypes } from '../configs';
import { UtilTypes } from './types';

injectable(UtilModules.Image.GenerateThumbnail,
  [ ConfigModules.UploadConfig ],
  async (cfg: ConfigTypes.UploadConfig): Promise<UtilTypes.Image.GenerateThumbnail> =>

    async (origFilePath, filename) => {
      const thumbName = extToJpg(`thumb_${filename}`);
      const thumbPath = extToJpg(join(cfg.uploadPath, thumbName));

      await sharp(origFilePath).resize(300, 300).toFile(thumbPath);
      return {
        fileName: thumbName,
        filePath: thumbPath
      };
    });

const extToJpg = (path: string) =>
`${path.split(extname(path))[0]}.jpg`;