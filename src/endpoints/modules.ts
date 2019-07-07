export namespace EndpointModules {
  export const EndpointRunner = 'Endpoint/EndpointRunner';
  export const Endpoints = 'Endpoint/Endpoints';
  export enum Utils {
    WrapAync = 'Endpoint/Utils/WrapAsync'
  }

  export enum ImageEndpoints {
    Upload = 'Endpoint/Image/Upload'
  }
  export enum AvatarEndpoints {
    GET = 'Endpoint/Avatar/Get'
  }
  export enum MemeEndpoints {
    Upload = 'Endpoint/Meme/Upload',
    Delete = 'Endpoint/Meme/Delete',
    Memes = 'Endpoint/Meme/Memes'
  }
}