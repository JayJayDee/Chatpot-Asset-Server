import { injectable } from 'smart-factory';
import { EndpointModules } from './modules';
import { EndpointTypes } from './types';
import { MiddlewareModules, MiddlewareTypes } from '../middlewares';

injectable(EndpointModules.ImageEndpoints.Upload,
  [ EndpointModules.Utils.WrapAync,
    MiddlewareModules.SingleMulter ],
  async (wrapAsyc: EndpointTypes.Utils.WrapAsync,
    upload: MiddlewareTypes.SingleMulter): Promise<EndpointTypes.Endpoint> =>

  ({
    uri: '/image/upload',
    method: EndpointTypes.EndpointMethod.POST,
    handler: [
      wrapAsyc(async (req, res, next) => {
        res.status(200).send({});
      })
    ]
  }));