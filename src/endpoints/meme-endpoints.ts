import { injectable } from 'smart-factory';

import { EndpointModules } from './modules';
import { EndpointTypes} from './types';
import { MiddlewareModules, MiddlewareTypes } from '../middlewares';
import { UtilModules, UtilTypes } from '../utils';
import { ConfigModules, ConfigTypes } from '../configs';
import { InvalidParamError } from '../errors';
import { ModelModules, ModelTypes } from '../models';

injectable(EndpointModules.MemeEndpoints.Upload,
  [ EndpointModules.Utils.WrapAync,
    MiddlewareModules.MulterInstance,
    UtilModules.Image.GenerateThumbnail,
    ConfigModules.UploadConfig,
    UtilModules.Auth.DecryptMemberToken,
    ModelModules.Meme.InsertMeme ],
  async (wrapAsync: EndpointTypes.Utils.WrapAsync,
    upload: MiddlewareTypes.MulterInstance,
    thumbnail: UtilTypes.Image.GenerateThumbnail,
    cfg: ConfigTypes.UploadConfig,
    decryptMemberToken: UtilTypes.Auth.DecryptMemberToken,
    insertMeme: ModelTypes.Meme.InsertMeme): Promise<EndpointTypes.Endpoint> =>

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

        const imageUrl = `${cfg.absoluteUrl}/${file.filename}`;
        const thumbUrl = `${cfg.absoluteUrl}/${thumb.fileName}`;

        const resp = await insertMeme({
          member_no: member.member_no,
          image_url: imageUrl,
          thumb_url: thumbUrl
        });

        res.status(200).json({
          orig: imageUrl,
          thumbnail: thumbUrl,
          meme_id: resp.meme_id
        });
      })
    ]
  }));


injectable(EndpointModules.MemeEndpoints.Delete,
  [ EndpointModules.Utils.WrapAync,
    UtilModules.Auth.DecryptMemberToken,
    ModelModules.Meme.DeleteMeme ],
  async (wrapAsync: EndpointTypes.Utils.WrapAsync,
    decryptMemberToken: UtilTypes.Auth.DecryptMemberToken,
    deleteMeme: ModelTypes.Meme.DeleteMeme): Promise<EndpointTypes.Endpoint> =>

  ({
    uri: '/meme/:member_token/meme/:meme_id',
    method: EndpointTypes.EndpointMethod.DELETE,
    handler: [
      wrapAsync(async (req, res, next) => {
        const memberToken = req.params['member_token'];
        const memeId = req.params['meme_id'];
        if (!memberToken) throw new InvalidParamError('member_token required');
        if (!memeId) throw new InvalidParamError('meme_id required');

        const member = decryptMemberToken(memberToken);
        if (!member) throw new InvalidParamError('invalid member_token');

        await deleteMeme({
          member_no: member.member_no,
          meme_id: memeId
        });

        res.status(200).json({});
      })
    ]
  }));


injectable(EndpointModules.MemeEndpoints.Memes,
  [ EndpointModules.Utils.WrapAync,
    ModelModules.Meme.GetMemes,
    UtilModules.Auth.DecryptMemberToken ],
  async (wrapAsync: EndpointTypes.Utils.WrapAsync,
    getMemes: ModelTypes.Meme.GetMemes,
    decryptMemberToken: UtilTypes.Auth.DecryptMemberToken): Promise<EndpointTypes.Endpoint> =>

  ({
    uri: '/meme/:member_token/memes',
    method: EndpointTypes.EndpointMethod.GET,
    handler: [
      wrapAsync(async (req, res, next) => {
        const memberToken = req.params['member_token'];
        if (!memberToken) throw new InvalidParamError('member_token required');

        const member = decryptMemberToken(memberToken);
        if (!member) throw new InvalidParamError('invalid member_token');

        const memesFromDb = await getMemes(member.member_no);
        const memes = memesFromDb.map((m) => ({
          orig: m.image_url,
          thumbnail: m.thumb_url,
          meme_id: m.meme_id
        }));
        res.status(200).json(memes);
      })
    ]
  }));