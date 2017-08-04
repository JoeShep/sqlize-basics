'use strict';

// Sequelize fully interchangeable with DataTypes for data types
// if you see "Sequelize" passed as arg into model instead
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    firstname: {
      type: DataTypes.STRING,
      notEmpty: true
    },
    lastname: {
      type: DataTypes.STRING,
      notEmpty: true
    },
    username: {
      type: DataTypes.TEXT
    },
    about: {
      type: DataTypes.TEXT
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_login: {
      type: DataTypes.DATE
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active'
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};
