import { injectable } from 'smart-factory';
import { createDecipher } from 'crypto';

import { UtilModules } from './modules';
import { UtilTypes } from './types';
import { ConfigModules, ConfigTypes } from '../configs';
import { LoggerModules, LoggerTypes } from '../loggers';

const decipher = (secret: string) =>
  createDecipher('des-ede3-cbc', secret);

injectable(UtilModules.Auth.ValidateSessionKey,
  [ LoggerModules.Logger,
    ConfigModules.CredentialConfig ],
  async (log: LoggerTypes.Logger,
    cfg: ConfigTypes.CredentialConfig): Promise<UtilTypes.Auth.ValidateSessionKey> =>

    (sessionKey) => {
      const dp = decipher(cfg.authSecret);
      const resp: UtilTypes.DecryptedSessionKey = {
        valid: false,
        expired: false,
        member_no: null
      };
      try {
        let decrypted: string = dp.update(sessionKey, 'hex', 'utf8');
        decrypted += dp.final('utf8');
        log.debug(`[auth-util] decrypted-session-key = ${decrypted}`);
        const splited: string[] = decrypted.split('|@|');
        if (splited.length !== 2) return resp;
        const createdAt = parseInt(splited[1]);
        if (Date.now() > createdAt + cfg.sessionExpires * 1000) {
          resp.valid = true;
          resp.expired = true;
          return resp;
        }
        resp.valid = true;
        resp.member_no = parseInt(splited[0]);
        return resp;
      } catch (err) {
        return resp;
      }
    });