import React from 'react';
import UserQuestion from './UserQuestion';
import axios from 'axios'


function QuestionsPanel({ question, resetQuestions }) {

    axios.defaults.baseURL = 'http://www.localhost:3001'

    const onDelete = async (id) => {

        const reply = window.confirm('Sure to Delete the question?')
        if (reply) {
            await axios.delete(`/question/delete/${id}`, {
                headers: {
                    token: localStorage.getItem("token")
                }
            }).then((res, err) => {
                resetQuestions()
            })
        }
    }

    const onEdit = async (id, newQuestion) => {
        await axios.put(`/question/put/${id}`, { description: newQuestion }, {
            headers: {
                token: localStorage.getItem("token")
            }
        }).then((res, err) => {
            resetQuestions()
        })
    }

    return (
        <div className="timeline">
            {question &&
                <>
                    <div className="box mb-3" style={{ textAlign: 'center' }}>All Questions</div>
                    {question.map((question) => <UserQuestion key={question.id} question={question} handleDelete={onDelete} handleUpdate={onEdit} />)}
                </>
            }
            {question.length === 0 &&
                < h5 > No Questions Yet!</h5>
            }
        </div >
    );
}

export default QuestionsPanel;