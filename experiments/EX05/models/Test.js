const {
    DataTypes
} = require('sequelize');
const sequelize = require('../config/db.js');

const Test = sequelize.define("option", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    }
});

Test.sync()
    .then(() => console.log("Options table created successfully"))
    .catch(err => console.log("Error creating User table: ", err));

module.exports = Test;