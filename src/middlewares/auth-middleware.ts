import { injectable } from 'smart-factory';
import { MiddlewareModules } from './modules';
import { MiddlewareTypes } from './types';
import { UtilModules, UtilTypes } from '../utils';
import { BaseSecurityError, SecurityExpireError } from '../errors';
import { ConfigModules, ConfigTypes } from '../configs';
import { LoggerModules, LoggerTypes } from '../loggers';

class AuthenticationFailError extends BaseSecurityError {}

injectable(MiddlewareModules.Authentication,
  [ ConfigModules.CredentialConfig,
    LoggerModules.Logger,
    UtilModules.Auth.ValidateSessionKey ],
  async (cfg: ConfigTypes.CredentialConfig,
    log: LoggerTypes.Logger,
    validateSessionKey: UtilTypes.Auth.ValidateSessionKey): Promise<MiddlewareTypes.Authentication> =>

      (req, res, next) => {
        if (cfg.authEnabled === false) {
          log.debug('[auth-middleware] auth-disabled. ignoring authentication.');
          return next();
        }
        log.debug('[auth-middleware] auth-enabled. starting authentication..');

        const sessionKey: string = req.query.session_key;
        if (!sessionKey) return next(new AuthenticationFailError('session_key not found'));

        const validated = validateSessionKey(sessionKey);
        if (validated.valid === false) return next(new AuthenticationFailError('invalid session_key'));
        if (validated.expired === true) return next(new SecurityExpireError('session_key expired'));

        res.locals['member_no'] = validated.member_no;
        next();
      });