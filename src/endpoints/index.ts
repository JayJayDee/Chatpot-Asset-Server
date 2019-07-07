import { injectable } from 'smart-factory';
import { EndpointModules } from './modules';
export { EndpointTypes } from './types';
export { EndpointModules } from './modules';

// register endpoints to container.
injectable(EndpointModules.Endpoints,
  [ EndpointModules.ImageEndpoints.Upload,
    EndpointModules.AvatarEndpoints.GET,
    EndpointModules.MemeEndpoints.Upload,
    EndpointModules.MemeEndpoints.Delete,
    EndpointModules.MemeEndpoints.Memes ],

  async (imageUpload, avatarGet,
    mupd, mdel, ms) =>
    ([
      imageUpload,
      avatarGet,
      mupd,
      mdel,
      ms
    ]));