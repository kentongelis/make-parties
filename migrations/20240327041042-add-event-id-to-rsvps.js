'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Rsvps',
      'EventId',
      {
        type: Sequelize.INTEGER,
        references : {
          model: 'Events',
          ley: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Rsvps', 'EventId')
    }
};

