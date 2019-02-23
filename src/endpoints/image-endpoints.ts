import { injectable } from 'smart-factory';
import { EndpointModules } from './modules';
import { EndpointTypes } from './types';
import { MiddlewareModules, MiddlewareTypes } from '../middlewares';
import { InvalidParamError } from '../errors';
import { UtilModules, UtilTypes } from '../utils';
import { ConfigModules, ConfigTypes } from '../configs';

injectable(EndpointModules.ImageEndpoints.Upload,
  [ EndpointModules.Utils.WrapAync,
    MiddlewareModules.MulterInstance,
    UtilModules.Image.GenerateThumbnail,
    ConfigModules.UploadConfig ],
  async (wrapAsyc: EndpointTypes.Utils.WrapAsync,
    upload: MiddlewareTypes.MulterInstance,
    getThumbnail: UtilTypes.Image.GenerateThumbnail,
    cfg: ConfigTypes.UploadConfig): Promise<EndpointTypes.Endpoint> =>

  ({
    uri: '/image/upload',
    method: EndpointTypes.EndpointMethod.POST,
    handler: [
      upload.single('image'),
      wrapAsyc(async (req, res, next) => {
        const file = req.file;
        if (!file) throw new InvalidParamError('form-data/image upload required');

        const thumbnail = await getThumbnail(file.path, file.filename);
        res.status(200).send({
          orig: `${cfg.absoluteUrl}/${file.filename}`,
          thumbnail: `${cfg.absoluteUrl}/${thumbnail.fileName}`
        });
      })
    ]
  }));