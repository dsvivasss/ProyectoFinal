const {
    Sequelize,
    DataTypes
} = require('sequelize');
const sequelize = require('../config/db.js');
const Option = require('./Option.js');

const Question = sequelize.define("question", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    difficulty_level: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    topic: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type_question: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

Question.hasMany(Option, {foreignKey: 'questionId'})

Question.sync()
    .then(() => console.log("Questions table created successfully"))
    .catch(err => console.log("Error creating User table: ", err));

module.exports = Question;