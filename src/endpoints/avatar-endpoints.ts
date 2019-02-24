import { injectable } from 'smart-factory';
import { createHash } from 'crypto';
import { EndpointModules } from './modules';
import { EndpointTypes } from './types';
import { AvatarModules, AvatarTypes } from '../avatar-generator';
import { InvalidParamError } from '../errors';
import { ConfigModules, ConfigTypes } from '../configs';
import { UtilModules, UtilTypes } from '../utils';

injectable(EndpointModules.AvatarEndpoints.GET,
  [ EndpointModules.Utils.WrapAync,
    AvatarModules.AvatarGenerator,
    ConfigModules.UploadConfig,
    UtilModules.Image.GenerateThumbnail ],
  async (wrapAsnc: EndpointTypes.Utils.WrapAsync,
    avatar: AvatarTypes.AvatarGenerator,
    uploadCfg: ConfigTypes.UploadConfig,
    createThumb: UtilTypes.Image.GenerateThumbnail): Promise<EndpointTypes.Endpoint> =>

  ({
    uri: '/avatar',
    method: EndpointTypes.EndpointMethod.GET,
    handler: [
      wrapAsnc(async (req, res, next) => {
        const nick = req.query['nick'];
        const gender = req.query['gender'];
        if (!nick || !gender) throw new InvalidParamError('nick or gender required');

        const gen = generateAvatarToFile(avatar);
        const created = await gen(nick, gender, uploadCfg.uploadPath);
        const thumbnail = await createThumb(created.filePath, created.fileName);

        res.status(200).json({
          profile_img: `${uploadCfg.absoluteUrl}/${created.fileName}`,
          profile_thumb: `${uploadCfg.absoluteUrl}/${thumbnail.fileName}`
        });
      })
    ]
  }));

type CreatedAvatar = {
  fileName: string;
  filePath: string;
};

const generateAvatarToFile = (avatar: AvatarTypes.AvatarGenerator) =>
  (nick: string, gender: 'M' | 'F', path: string): Promise<CreatedAvatar> =>
    new Promise((resolve, reject) => {
      const genderExpr = gender === 'M' ? 'male' : 'female';

      avatar.generate(nick, genderExpr)
      .then((image) => {
        const hash = createHash('sha256').update(`${genderExpr}${nick}`).digest('hex');
        const fileName = `${hash}.png`;
        const filePath = `${path}/${fileName}`;
        image.toFile(filePath, (err, info) => {
          if (err) reject(err);
          resolve({ fileName, filePath });
        });
      })
      .catch(reject);
    });