export namespace ModelTypes {
  export type CacheParam = {
    nickEn: string;
    gender: 'M' | 'F';
  };
  export type CacheRes = {
    profile_img: string;
    profile_thumb: string;
  };

  export type GetAvatarCache = (param: CacheParam) => Promise<CacheRes>;
}