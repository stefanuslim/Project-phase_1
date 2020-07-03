'use strict';
const bcrypt = require("bcrypt")
const saltRounds = 10
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Counter, {through:"UserCounters"})
    }
  };
  User.init({
    firstname: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          args: true,
          msg: "First Name is Required"
        }
      }
    },
    lastname: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          args: true,
          msg: "Last Name is Required"
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          args: true,
          msg: "Email is Required"
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          args: true,
          msg: "Password is Required"
        }
      }
    },
    birthdate: {
      type:DataTypes.DATE,
      validate:{
        notEmpty:{
          args: true,
          msg: "Birthdate is Required"
        }
      }
    },
    gender: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          args: true,
          msg: "Gender is Required"
        }
      }
    },
    phone_number: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          args: true,
          msg: "Phone Number is Required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance,options)=>{
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(instance.password, salt);
    instance.password = hash
  })
  return User;
};
