import { injectable } from 'smart-factory';
import { AvatarTypes } from './types';
import { AvatarModules } from './modules';
import { ConfigModules, ConfigTypes } from '../configs';
import AvatarGenerator from './generator';

injectable(AvatarModules.AvatarGenerator,
  [ ConfigModules.AssetConfig ],
  async (cfg: ConfigTypes.AssetsConfig): Promise<AvatarTypes.AvatarGenerator> =>
    new AvatarGenerator({
      parts: ['background', 'face', 'clothes', 'head', 'hair', 'eye', 'mouth'],
      partsLocation: cfg.avatarAssetPath,
      imageExtension: '.png'
    }));

export { AvatarTypes } from './types';
export { AvatarModules } from './modules';