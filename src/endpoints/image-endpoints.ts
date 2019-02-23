import { injectable } from 'smart-factory';
import { EndpointModules } from './modules';
import { EndpointTypes } from './types';
import { MiddlewareModules, MiddlewareTypes } from '../middlewares';
import { InvalidParamError } from '../errors';

injectable(EndpointModules.ImageEndpoints.Upload,
  [ EndpointModules.Utils.WrapAync,
    MiddlewareModules.MulterInstance ],
  async (wrapAsyc: EndpointTypes.Utils.WrapAsync,
    upload: MiddlewareTypes.MulterInstance): Promise<EndpointTypes.Endpoint> =>

  ({
    uri: '/image/upload',
    method: EndpointTypes.EndpointMethod.POST,
    handler: [
      upload.single('image'),
      wrapAsyc(async (req, res, next) => {
        const file = req.file;
        if (!file) throw new InvalidParamError('form-data/image upload required');

        /*
          { fieldname: 'image',
  originalname: 'Screen Shot 2019-02-19 at 5.23.19 PM.png',
  encoding: '7bit',
  mimetype: 'image/png',
  destination: '/Users/jayjaydee/chatpot-asset-temp',
  filename: '8e896b7f57f57f8b8d5ff814e677cdd0',
  path:
   '/Users/jayjaydee/chatpot-asset-temp/8e896b7f57f57f8b8d5ff814e677cdd0',
  size: 245344 }
        */
        res.status(200).send({});
      })
    ]
  }));