const {
    Sequelize,
    DataTypes
} = require('sequelize');
const sequelize = require('../config/db.js');
const Question = require('./Question.js');

const Option = sequelize.define("option", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    correct_answer: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        unique: false
    },
    questionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'questions',
            key: 'id',
        },
    },
});

Option.sync()
    .then(() => console.log("Options table created successfully"))
    .catch(err => console.log("Error creating User table: ", err));

module.exports = Option;