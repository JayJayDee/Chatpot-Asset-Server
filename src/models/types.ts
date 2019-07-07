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

  export namespace Meme {
    type MemeCreateParam = {
      member_no: number;
      image_url: string;
      thumb_url: string;
    };
    type MemeCreateRes = {
      meme_id: number;
    };

    type MemeEntity = {
      meme_id: number;
      image_url: string;
      thumb_url: string;
    };
    type MemeDeleteParam = {
      member_no: number;
      meme_id: number;
    };

    export type InsertMeme = (param: MemeCreateParam) => Promise<MemeCreateRes>;
    export type GetMemes = (memberNo: number) => Promise<MemeEntity[]>;
    export type DeleteMeme = (param: MemeDeleteParam) => Promise<void>;
  }
}