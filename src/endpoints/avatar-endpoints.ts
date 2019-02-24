import { injectable } from 'smart-factory';
import { EndpointModules } from './modules';
import { EndpointTypes } from './types';

injectable(EndpointModules.AvatarEndpoints.GET,
  [ EndpointModules.Utils.WrapAync ],
  async (wrapAsnc: EndpointTypes.Utils.WrapAsync): Promise<EndpointTypes.Endpoint> =>

  ({
    uri: '/avatar',
    method: EndpointTypes.EndpointMethod.GET,
    handler: [
      wrapAsnc((req, res, next) => {
        res.status(200).json({});
      })
    ]
  }));