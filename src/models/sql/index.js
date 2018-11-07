import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import { sequelize } from '../../clients/sequelize';

const basename = path.basename(__filename);
const db: exportedSequelizeModels = {
  sequelize: undefined,
  Sequelize: undefined,
  CommunityUser: undefined,
  Community: undefined,
  ConversationCategory: undefined,
  ConversationPost: undefined,
  Upload: undefined,
  User: undefined,
};

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (modelName !== 'sequelize' && modelName !== 'Sequelize') {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
