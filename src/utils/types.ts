export namespace UtilTypes {
  export type MemberPayload = {
    member_no: number;
    timestamp: number;
  };
  export type DecryptedSessionKey = {
    valid: boolean;
    expired: boolean;
    member_no: number;
  };

  export namespace Auth {
    export type ValidateSessionKey = (sessionKey: string) => DecryptedSessionKey;
  }
  export namespace Image {
    export type GenerateThumbnail = (origPath: string) => Promise<string>;
  }
}