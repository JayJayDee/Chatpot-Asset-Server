import { injectable } from 'smart-factory';
import { ModelModules } from './modules';
import { MysqlModules, MysqlTypes } from '../mysql';
import { ModelTypes } from './types';

injectable(ModelModules.Meme.InsertMeme,
  [ MysqlModules.Mysql ],
  async (mysql: MysqlTypes.MysqlDriver): Promise<ModelTypes.Meme.InsertMeme> =>

    async (param) => {
      return null;
    });


injectable(ModelModules.Meme.GetMemes,
  [ MysqlModules.Mysql ],
  async (mysql: MysqlTypes.MysqlDriver): Promise<ModelTypes.Meme.GetMemes> =>

    async (memberNo) => {
      return [];
    });


injectable(ModelModules.Meme.DeleteMeme,
  [ MysqlModules.Mysql ],
  async (mysql: MysqlTypes.MysqlDriver): Promise<ModelTypes.Meme.DeleteMeme> =>

    async (memeId) => {

    });