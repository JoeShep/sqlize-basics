'use strict';
// migrations are a representation of how we want our models to look in the db. 
// Notice we define the relationship between our models in the create-todo-item.js migration file as well. 
// The todoId field was not automatically generated and we've had to manually define it. 
// Sequelize automatically generates the id, createdAt and updatedAt fields for you. 
// In addition to that, any time a model is saved, the updatedAt field is automatically updated 
// to reflect the new update time.

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Todos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Todos');
  }
};
