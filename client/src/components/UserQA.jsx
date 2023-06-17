import React, { useState } from 'react';
import Avatar from 'react-bootstrap-icons/dist/icons/person-circle'
import axios from 'axios'
import UserAnswerBox from './UserAnswerBox';

function UserQA({ question, userId, resetAll }) {

    const [answers, setAnswers] = useState([])
    const [loaded, setLoaded] = useState(false)

    const loadAnswersFor = async (questionId) => {
        axios.get(`/answer/getUserAnswers/${userId}/${questionId}`, {
            headers: {
                token: localStorage.getItem("token")
            }
        }).then((resp) => {
            setAnswers(resp.data)
            setLoaded(!loaded)
        })
    }


    const handleEdit = async (answerId, newAnswer, questionId) => {
        await axios.put(`/answer/put/${answerId}`, { description: newAnswer }, {
            headers: {
                token: localStorage.getItem("token")
            }
        }).then((res, err) => {
            loadAnswersFor(questionId)
        })
    }

    const handleDelete = async (answerId, questionId) => {
        const reply = window.confirm('Sure to Delete the answer?')
        if (reply) {
            await axios.delete(`/answer/delete/${answerId}`, {
                headers: {
                    token: localStorage.getItem("token")
                }
            }).then((res, err) => {
                loadAnswersFor(questionId)
                resetAll()
            })
        }
    }

    return (
        <div className="question">
            <div className="question_head">
                <div className="details">
                    <Avatar size={45} className="sidebar_avatar" />
                    <div className="question_info">
                        <h4>{question.asked_by}</h4>
                        <p>{question.updatedAt}</p>
                    </div>
                </div>
            </div>
            <div className="question_body">
                <p className="question_description">{question.description}</p>
                {!loaded && <span className="ans_btn" onClick={() => loadAnswersFor(question.id)} >Show Answers &#x3e;</span>}
                {loaded && <span className="ans_btn" onClick={() => setLoaded(!loaded)} >Close Answers &#x3e;</span>}

            </div>

            {loaded &&
                <div className="user_answers" data-aos="zoom-in">
                    {answers.map((answer) => <UserAnswerBox key={answer.id} answer={answer} question_id={question.id} userId={userId} handleUpdate={handleEdit} handleDelete={handleDelete} />)}
                </div>
            }

        </div >
    );
}

export default UserQA;