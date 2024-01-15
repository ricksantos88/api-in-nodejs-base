'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('users', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: Sequelize.literal('gen_random_uuid()')
        },
        name: {
            allowNull: false,
            type: Sequelize.STRING
        },
        email: {
            allowNull: false,
            unique: true,
            type: Sequelize.STRING
        },
        password_hash: {
            allowNull: false,
            type: Sequelize.STRING
        },
        role_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
                model: 'roles',
                key: 'id'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        created_at: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updated_at: {
            allowNull: false,
            type: Sequelize.DATE
        }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Users');
    }
};
