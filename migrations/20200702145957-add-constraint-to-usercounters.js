'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     return queryInterface.addConstraint('UserCounters', {
        fields: ['UserId'],
        type: 'foreign key',
        name: 'custom_fkey_UserId',
        references: { //Required field
          table: 'Users',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
      .then(()=>{
        return queryInterface.addConstraint('UserCounters', {
           fields: ['CounterId'],
           type: 'foreign key',
           name: 'custom_fkey_CounterId',
           references: { //Required field
             table: 'Counters',
             field: 'id'
           },
           onDelete: 'cascade',
           onUpdate: 'cascade'
         })
      })
  },

  down:  (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     return queryInterface.removeConstraint("UserCounters","custom_fkey_UserId")
     .then(()=>{
       return queryInterface.removeConstraint("UserCounters","custom_fkey_CounterId")
     })
  }
};
