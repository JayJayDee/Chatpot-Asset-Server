import { injectable } from 'smart-factory';
import { EndpointModules } from './modules';
import { EndpointTypes } from './types';

injectable(EndpointModules.ImageEndpoints.Upload,
  [ EndpointModules.Utils.WrapAync ],
  async (wrapAsyc: EndpointTypes.Utils.WrapAsync): Promise<EndpointTypes.Endpoint> => ({
    uri: '/image/upload',
    method: EndpointTypes.EndpointMethod.POST,
    handler: [
      wrapAsyc(async (req, res, next) => {
        res.status(200).send({});
      })
    ]
  }));