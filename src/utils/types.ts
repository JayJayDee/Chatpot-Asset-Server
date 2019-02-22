export namespace UtilTypes {
  export type RoomPayload = {
    room_no: number;
    timestamp: number;
  };
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
}