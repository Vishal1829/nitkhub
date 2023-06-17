const express = require('express')
const router = express.Router()
const { Answers, sequelize } = require('../models')
const { validateToken } = require('../middlewares/AuthMiddleware');
const { QueryTypes } = require('sequelize');

// @route POST /answer/post
// @desc  Create a Answer
// @access Private

router.post('/post', validateToken, async (req, res) => {
    try {
        const { description, QuestionId } = req.body
        const newAnswer = await Answers.create({
            description: description,
            QuestionId: QuestionId,
            UserId: req.user.id
        });

        res.json(newAnswer);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }

});


// @route GET /answer/get/:ques_id
// @desc  Get Answers by Ques ID
// @access Private

router.get('/get/:ques_id', validateToken, async (req, res) => {
    try {

        const qid = req.params.ques_id
        const question = await sequelize.query(`select concat(u.first_name,' ',u.last_name) as asked_by, q.id, q.description, DATE_FORMAT(q.updatedAt, ' %d-%b-%Y %h:%i %p') as updatedAt from questions q, users u where u.id=q.UserId and q.id=${qid}`, { type: QueryTypes.SELECT })
        const answers = await sequelize.query(`select concat(u.first_name, ' ', u.last_name) as postedBy, a.description, DATE_FORMAT(a.updatedAt, '%d-%b-%Y %h:%i%p') as updatedAt from answers a, users u where a.UserId = u.id and a.QuestionId = ${qid}`, { type: QueryTypes.SELECT });

        if (!answers) {
            return res.status(400).json({ msg: 'Answers Not Found', answers: [], question: question });
        }
        res.json({ answers: answers, question: question });

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})

// @route GET /answer/getUserAnswers/:user_id
// @desc  Get Answers by user ID
// @access Private

router.get('/getUserAnswers/:user_id/:ques_id', validateToken,async (req, res) => {
    try {
        const user_id = req.params.user_id
        const ques_id = req.params.ques_id
        const answers = await sequelize.query(`select a.id as id, a.description, DATE_FORMAT(a.createdAt, '%d-%b-%Y %h:%i%p') as createdAt,DATE_FORMAT(a.updatedAt, '%d-%b-%Y %h:%i%p') as updatedAt from answers a where a.QuestionId = ${ques_id} and a.UserId = ${user_id}`, {type: QueryTypes.SELECT})
        
        console.log(answers)

        if (answers.length===0) {
            return res.status(400).json({ msg: 'Answers Not Found' });
        }
        res.json(answers);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})


// @route DELETE /question/delete/:ques_id
// @desc  Delete Question by Ques ID
// @access Private

router.delete('/delete/:ans_id', validateToken, async (req, res) => {
    try {
        const ans_deleted = await Answers.destroy({ where: { id: req.params.ans_id } });
        if (!ans_deleted) {
            return res.status(400).json({ msg: 'Question Not Found' });
        }
        console.log('Deleted Successfully');
        res.json(ans_deleted);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})

// @route UPDATE /question/put/:ques_id
// @desc  Update Question by Ques ID
// @access Private

router.put('/put/:ans_id', validateToken,async (req, res) => {
    try {
        const answer = await Answers.findAll({ where: { id: req.params.ans_id } });
        if (!answer) {
            return res.status(400).json('Answer not found!');
        }

        await Answers.update({ description: req.body.description }, { where: { id: req.params.ans_id } });

        const updated_answer = await Answers.findAll({ where: { id: req.params.ans_id } });
        res.json(updated_answer);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router