import React, { useState } from 'react';
import Pencil from 'react-bootstrap-icons/dist/icons/pencil-square'
import Avatar from 'react-bootstrap-icons/dist/icons/person-circle'
import Question from './Question';
import AnswerBox from './AnswerBox';
import axios from 'axios'


function AnswerPage({ fullname, question, answers, resetAnswers }) {

    axios.defaults.baseURL = 'http://www.localhost:3001'

    const [description, setDescription] = useState("")

    const onChange = (e) => {
        setDescription(e.target.value)
    }

    const handleSubmit = () => {
        if (description) {

            axios.post('/answer/post', { description: description, QuestionId: question[0].id }, {
                headers: {
                    token: localStorage.getItem("token")
                }
            }).then((res) => {
                setDescription("")
                resetAnswers()
            })
        }
    }

    const onAdd = (e) => {
        handleSubmit()
    }

    return (
        <div className="timeline">
            {question &&
                question.map((question) => <Question key={question.id} question={question} showsLink={false} />)
            }
            {answers.length !== 0 &&
                <>
                    <div className="box">All Answers</div>
                    {answers.map((answer) => <AnswerBox key={answer.id} answer={answer} />)}
                </>
            }
            {answers.length === 0 &&
                < h5 > No Answers Yet!</h5>
            }
            <div className="ans_input_box mt-3">
                <div className="user_info">
                    <Avatar size={23} className="sidebar_avatar" />
                    <h6>{fullname}</h6>
                </div>
                <div className="ans_input_btn">
                    <Pencil />
                    <div className="in_form">
                        <input type="text" placeholder="Add your Answer" value={description} onChange={(e) => onChange(e)} required />
                    </div>
                </div>
                <button className="ans_add" onClick={(e) => onAdd(e)}>A D D</button>
            </div>
        </div >
    );
}

export default AnswerPage;