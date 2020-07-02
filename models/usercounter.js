'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCounter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserCounter.belongsTo(models.User)
      UserCounter.belongsTo(models.Counter)
    }
  };
  UserCounter.init({
    UserId: DataTypes.INTEGER,
    CounterId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserCounter',
  });
  return UserCounter;
};
