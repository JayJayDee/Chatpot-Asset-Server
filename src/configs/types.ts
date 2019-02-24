export namespace ConfigTypes {
  export type RootConfig = {
    http: HttpConfig;
    credential: CredentialConfig;
    upload: UploadConfig;
    mysql: MysqlConfig;
    env: Env;
  };
  export type HttpConfig = {
    port: number;
  };
  export type MysqlConfig = {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
    connectionLimit: number;
  };
  export type CredentialConfig = {
    authEnabled: boolean;
    sessionExpires: number;
    authSecret: string;
  };
  export type UploadConfig = {
    uploadPath: string;
    absoluteUrl: string;
  };
  export enum Env {
    DEV = 'DEV',
    PROD = 'PROD'
  }
  export type ConfigRule = {
    key: string;
    path: string[];
    defaultValue?: any;
  };
  export type ConfigSource = {[key: string]: any};
  export type ConfigReader = () => Promise<ConfigSource>;
  export type ConfigParser = (src: ConfigSource, rules: ConfigRule[]) => RootConfig;
  export type EnvReader = (src: ConfigSource) => Env;
}