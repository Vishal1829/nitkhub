const express = require('express')
const router = express.Router()
const { QueryTypes } = require('sequelize');
const { Questions, sequelize } = require('../models')
const { validateToken } = require('../middlewares/AuthMiddleware')

// @route POST /question/post
// @desc  Create a Question
// @access Private

router.post('/post', validateToken, async (req, res) => {
    try {
        const { description } = req.body
        const newQuestion = await Questions.create({
            description: description,
            UserId: req.user.id
        });

        res.json(newQuestion);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }

});

// @route GET /question/get
// @desc  Get all questions
// @access Private

router.get('/get', async (req, res) => {
    try {
        // const questions = await Questions.findAll();
        const questions = await sequelize.query("select concat(u.first_name,' ',u.last_name) as asked_by, q.id, q.description, DATE_FORMAT(q.updatedAt, ' %d-%b-%Y %h:%i %p') as updatedAt from questions q, users u where u.id=q.UserId order by id desc", { type: QueryTypes.SELECT })
        res.json(questions);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})

// @route GET /question/get/:user_id
// @desc  Get Questions by user ID
// @access Private

router.get('/get/:user_id', validateToken, async (req, res) => {
    try {
        const id = req.user.id
        const questions = await sequelize.query(`select concat(u.first_name,' ',u.last_name) as asked_by, q.id, q.description,DATE_FORMAT(q.createdAt, ' %d-%b-%Y %h:%i %p') as createdAt ,DATE_FORMAT(q.updatedAt, ' %d-%b-%Y %h:%i %p') as updatedAt from questions q, users u where u.id=q.UserId and u.id=${id} order by id desc`, { type: QueryTypes.SELECT })
        if (!questions) {
            return res.status(400).json({ msg: 'Questions Not Found' });
        }
        res.json(questions);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})


// @route GET /question/byUserAnswer/:user_id
// @desc get list of qusetions answered by a user
// @access private

router.get('/byUserAnswers/:user_id', validateToken,async (req, res) => {
    try {
        const u_id = req.params.user_id
        const que = `select q.id,
        q.description,
        DATE_FORMAT(q.createdAt, ' %d-%b-%Y %h:%i %p') as createdAt,
        DATE_FORMAT(q.updatedAt, ' %d-%b-%Y %h:%i %p') as updatedAt,
        concat(u.first_name,' ',u.last_name) as asked_by
        from
        questions q,
        users u
        where
        q.id in (
            select
            distinct(QuestionId)
            from
            answers
            where
            UserId = ${u_id}
        )
        and q.UserId=u.id`
        const questions = await sequelize.query(que, {type: QueryTypes.SELECT})
        console.log(questions)
        res.json(questions)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error')
    }
})

// @route DELETE /question/delete/:ques_id
// @desc  Delete Question by Ques ID
// @access Private

router.delete('/delete/:ques_id', validateToken, async (req, res) => {
    try {
        const ques_deleted = await Questions.destroy({ where: { id: req.params.ques_id } });
        if (!ques_deleted) {
            return res.status(400).json({ msg: 'Question Not Found' });
        }
        console.log('Deleted Successfully');
        res.json(ques_deleted);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})

// @route UPDATE /question/put/:ques_id
// @desc  Update Question by Ques ID
// @access Private

router.put('/put/:ques_id', validateToken,async (req, res) => {
    try {
        const question = await Questions.findAll({ where: { id: req.params.ques_id } });
        if (!question) {
            return res.status(400).json('Question not found!');
        }

        await Questions.update({ description: req.body.description }, { where: { id: req.params.ques_id } });

        const updated_question = await Questions.findAll({ where: { id: req.params.ques_id } });
        res.json(updated_question);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})


module.exports = router