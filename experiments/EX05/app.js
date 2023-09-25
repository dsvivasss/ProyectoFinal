const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const Question = require('./models/Question.js')
const Option = require('./models/Option.js')
const questions = require('./questions.json');
require('dotenv').config();

const app = express()

app.listen(3000)
app.use(express.json())
app.use(morgan('tiny'))
app.use(helmet())

app.post('/populate', async (_, res) => {

    questions.forEach(async (question) => {
        const question_creation = await Question.create({
            difficulty_level: question.difficulty_level,
            topic: question.topic,
            description: question.description,
            type_question: question.type_question,
        })

        question.options.forEach(async (option) => {
            console.log({option})
            await Option.create({
                description: option.value,
                correct_answer: option.correct,
                questionId: question_creation.id
            })
        })
    })

    // Return Options collapsed as a single array
     
    const all_questions = await Question.findAll({
        include: {
            model: Option
        }
    })

    return res.status(200)
        .json(all_questions)

})

app.get('/questions/:topic/:difficulty_level/:option', async (req, res) => {
    const { topic, difficulty_level, option } = req.params

    if (!topic || !difficulty_level || !option) {
        return res.status(400)
            .json({ message: 'Missing parameters' })
    }

    const questions = await Question.findAll({
        where: {
            topic: topic,
            difficulty_level: difficulty_level,
            type_question: option
        },
        include: {
            model: Option
        }
    })

    return res.status(200).json(questions)

})
    

console.log('Server on port 3000')

// module.exports.handler = serverless(app)