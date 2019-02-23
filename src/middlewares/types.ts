import { RequestHandler, ErrorRequestHandler } from 'express';
import { Instance } from 'multer';

export namespace MiddlewareTypes {
  export type NotFound = RequestHandler;
  export type Error = ErrorRequestHandler;
  export type Authentication = RequestHandler;
  export type Authorization = (memberTokenPath: string[]) => RequestHandler;
  export type MulterInstance = Instance;
}