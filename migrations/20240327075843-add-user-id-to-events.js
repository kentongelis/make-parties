'use strict';

const { query } = require('express');
const { Sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Events',
      'UserId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key:'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Events', 'UserId')
  }
};
