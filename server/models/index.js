// If we don't have a Node environment defined, we're defaulting to development.
// Then, we are establishing a connection with our database,
// after which we read our models folder, discovering and importing any and all the models in it,
// adding them to the db object and applying relationships between the models, if such relationships exist.

'use strict';

const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const basename  = path.basename(module.filename);
const env       = process.env.NODE_ENV || 'development';
const config    = require(__dirname + '/../config/config.json')[env];
const db        = {};

let sequelize;

// Sequelize does setup a connection between the rest api/application
// and your SQL database. To setup basic connection between the two:
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Reading all the files in this directory (/models) and adding them to the db object
// so we can export a single 'db' object from this file and have access to
// all the models we have defined
fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
