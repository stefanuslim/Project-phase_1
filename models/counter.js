'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Counter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Counter.belongsTo(models.Admin)
      Counter.belongsToMany(models.User, {through: "UserCounters"})
    }
  };
  Counter.init({
    name: DataTypes.STRING,
    status: DataTypes.STRING,
    AdminId: DataTypes.INTEGER

  }, {
    hooks: {
    beforeCreate: (counter, options) => {
      counter.status = 'Tutup';
    }
  },
    sequelize,
    modelName: 'Counter',
  });
  return Counter;
};
