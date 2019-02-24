import { injectable } from 'smart-factory';
import { ModelModules } from './modules';
import { MysqlModules, MysqlTypes } from '../mysql';
import { ModelTypes } from './types';

injectable(ModelModules.GetAvatarCache,
  [ MysqlModules.Mysql ],
  async (mysql: MysqlTypes.MysqlDriver): Promise<ModelTypes.GetAvatarCache> =>

    async (param) => {
      const sql = `
        SELECT
          profile_img,
          profile_thumb
        FROM
          chatpot_avatar_cache
        WHERE
          nick=? AND gender=?
      `;
      const params = [ param.nickEn, param.gender ];
      const rows: any[] = await mysql.query(sql, params) as any[];
      if (rows.length === 0) return null;
      return {
        profile_img: rows[0].profile_img,
        profile_thumb: rows[0].profile_thumb
      };
    });