import { injectable } from 'smart-factory';
import { UtilModules } from './modules';
import { ConfigModules, ConfigTypes } from '../configs';

injectable(UtilModules.Image.GenerateThumbnail,
  [ ConfigModules.UploadConfig ],
  async (cfg: ConfigTypes.UploadConfig) =>

    async (origFilePath: string) => {
      return '';
    });