const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');

const User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    salt: {
        type: DataTypes.STRING,
        allowNull: true
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true
    },
    expireAt: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    createdAt: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        // Defaultvalue as UTC time
        defaultValue: DataTypes.NOW
    }
});

User.sync()
    .then(() => console.log("User table created successfully"))
    .catch(err => console.log("Error creating User table: ", err));

module.exports = User;