import { injectable } from 'smart-factory';
import { ModelModules } from './modules';
import { MysqlModules, MysqlTypes } from '../mysql';
import { ModelTypes } from './types';

injectable(ModelModules.Meme.InsertMeme,
  [ MysqlModules.Mysql ],
  async (mysql: MysqlTypes.MysqlDriver): Promise<ModelTypes.Meme.InsertMeme> =>

    async (param) => {
      const sql = `
        INSERT INTO
          chatpot_meme
        SET
          member_no=?,
          image_url=?,
          thumb_url=?
      `;
      const params = [
        param.member_no,
        param.image_url,
        param.thumb_url
      ];
      const resp = await mysql.query(sql, params) as any;
      return { meme_id: resp.insertId };
    });


injectable(ModelModules.Meme.GetMemes,
  [ MysqlModules.Mysql ],
  async (mysql: MysqlTypes.MysqlDriver): Promise<ModelTypes.Meme.GetMemes> =>

    async (memberNo) => {
      const sql = `
        SELECT
          *
        FROM
          chatpot_meme
        WHERE
          member_no=?
        ORDER BY
          no DESC
      `;
      const params = [ memberNo ];
      const rows: any[] = await mysql.query(sql, params) as any[];
      const memes = rows.map((r) => ({
        meme_id: r.no,
        image_url: r.image_url,
        thumb_url: r.thumb_url
      }));
      return memes;
    });


injectable(ModelModules.Meme.DeleteMeme,
  [ MysqlModules.Mysql ],
  async (mysql: MysqlTypes.MysqlDriver): Promise<ModelTypes.Meme.DeleteMeme> =>

    async (param) => {
      const sql = `
        DELETE FROM
          chatpot_meme
        WHERE
          no=? AND member_no=?
      `;
      const params = [
        param.meme_id,
        param.member_no
      ];
      await mysql.query(sql, params);
    });