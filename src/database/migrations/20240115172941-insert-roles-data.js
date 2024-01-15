'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('roles', [
            {
                name: 'ROLE_ADMIN',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'ROLE_USER',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'ROLE_RECRUITER',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'ROLE_RECRUITED',
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                name: 'ROLE_OPERATOR',
                created_at: new Date(),
                updated_at: new Date(),
            },
        ]);
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete('roles', null, {});
    },
};
