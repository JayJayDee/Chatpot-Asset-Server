import { injectable } from 'smart-factory';

import { EndpointModules } from './modules';
import { EndpointTypes} from './types';
import { MiddlewareModules, MiddlewareTypes } from '../middlewares';
import { UtilModules, UtilTypes } from '../utils';
import { ConfigModules, ConfigTypes } from '../configs';
import { InvalidParamError } from '../errors';

injectable(EndpointModules.MemeEndpoints.Upload,
  [ EndpointModules.Utils.WrapAync,
    MiddlewareModules.MulterInstance,
    UtilModules.Image.GenerateThumbnail,
    ConfigModules.UploadConfig,
    UtilModules.Auth.DecryptMemberToken ],
  async (wrapAsync: EndpointTypes.Utils.WrapAsync,
    upload: MiddlewareTypes.MulterInstance,
    thumbnail: UtilTypes.Image.GenerateThumbnail,
    cfg: ConfigTypes.UploadConfig,
    decryptMemberToken: UtilTypes.Auth.DecryptMemberToken): Promise<EndpointTypes.Endpoint> =>

  ({
    uri: '/meme/:member_token/upload',
    method: EndpointTypes.EndpointMethod.POST,
    handler: [
      upload.single('image'),
      wrapAsync(async (req, res, next) => {
        const file = req.file;
        if (!file) throw new InvalidParamError('form-data/image upload required');

        const memberToken = req.params['member_token'];
        if (!memberToken) throw new InvalidParamError('member_token required');

        const member = decryptMemberToken(memberToken);
        if (!member) throw new InvalidParamError('invalid member_token');

        const thumb = await thumbnail(file.path, file.filename);
        console.log(thumb);

        res.status(200).json({});
      })
    ]
  }));


injectable(EndpointModules.MemeEndpoints.Delete,
  [ EndpointModules.Utils.WrapAync ],
  async (wrapAsync: EndpointTypes.Utils.WrapAsync): Promise<EndpointTypes.Endpoint> =>

  ({
    uri: '/meme/:member_token/:meme_id',
    method: EndpointTypes.EndpointMethod.DELETE,
    handler: [
      wrapAsync((req, res, next) => {
        res.status(200).json({});
      })
    ]
  }));


injectable(EndpointModules.MemeEndpoints.Memes,
  [ EndpointModules.Utils.WrapAync ],
  async (wrapAsync: EndpointTypes.Utils.WrapAsync): Promise<EndpointTypes.Endpoint> =>

  ({
    uri: '/meme/:member_token/memes',
    method: EndpointTypes.EndpointMethod.GET,
    handler: [
      wrapAsync((req, res, next) => {
        res.status(200).json({});
      })
    ]
  }));