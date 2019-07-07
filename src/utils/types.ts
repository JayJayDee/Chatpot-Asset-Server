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

  export type Thumbnail = {
    fileName: string;
    filePath: string;
  };

  export namespace Auth {
    export type ValidateSessionKey = (sessionKey: string) => DecryptedSessionKey;
    export type DecryptMemberToken = (memberToken: string) => MemberPayload;
  }
  export namespace Image {
    export type GenerateThumbnail = (origPath: string, filename: string) => Promise<Thumbnail>;
  }
}