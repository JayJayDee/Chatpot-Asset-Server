import { injectable } from 'smart-factory';
import { EndpointModules } from './modules';
import { EndpointTypes } from './types';

const AvatarGenerator = require('avatar-generator');

injectable(EndpointModules.AvatarEndpoints.GET,
  [ EndpointModules.Utils.WrapAync ],
  async (wrapAsnc: EndpointTypes.Utils.WrapAsync): Promise<EndpointTypes.Endpoint> =>

  ({
    uri: '/avatar',
    method: EndpointTypes.EndpointMethod.GET,
    handler: [
      wrapAsnc(async (req, res, next) => {
        const av = new AvatarGenerator({ imageExtension: 'png' });
        const image = await av.generate('viking swarp', 'female');
        image.png().toFile('output.png');
        res.status(200).json({});
      })
    ]
  }));