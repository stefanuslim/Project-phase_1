'use strict';

const bcrypt = require('bcrypt')

const saltRounds = 10

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Admin.hasMany(models.Counter)
    }
  };
  Admin.init({
    first_name: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
          args: true,
          msg: "First Name is Required"
        }
      }
    }
      ,
    last_name: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
            args:true,
            msg:"Last Name is Required"
        }
      }
    },
    username: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
            args:true,
            msg:"Username is Required"
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
            args:true,
            msg:"Password is Required"
        }
      }
    }
      ,
    email: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
            args:true,
            msg:"Email is Required"
        }
      }
    },
    birthdate: {
      type: DataTypes.DATE,
      validate:{
        notEmpty:{
            args:true,
            msg:"Birthdate is Required"
        }
      }
    },
    gender: {
      type:DataTypes.STRING,
      validate:{
        notEmpty:{
            args:true,
            msg:"Gender is Required"
        }
      }
    }
  }, {
    hooks: {
    beforeCreate: (admin, options) => {
      admin.status = false;
    }
  },
    sequelize,
    modelName: 'Admin',
  });

  Admin.beforeCreate((instance,options)=>{
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(instance.password, salt);
    instance.password = hash
  })

  return Admin;
};
