import React, { useState } from 'react';
import Question from './Question';
import Pencil from 'react-bootstrap-icons/dist/icons/pencil-square'
import Avatar from 'react-bootstrap-icons/dist/icons/person-circle'
import axios from 'axios'


function MainPanel({ fullname, questions, resetQuestions }) {

    // const [questions, setQuestions] = useState([])

    axios.defaults.baseURL = 'http://www.localhost:3001'

    const [description, setDescription] = useState("")

    const onChange = (e) => {
        setDescription(e.target.value)
    }

    const handleSubmit = () => {
        if (description) {

            axios.post('/question/post', { description: description }, {
                headers: {
                    token: localStorage.getItem("token")
                }
            }).then((res) => {
                setDescription("")
                resetQuestions()
            })
        }
    }

    const onkeyup = (e) => {
        if (e.key === 'Enter')
            handleSubmit()
    }

    return (
        <div className="timeline pb-5">
            <div className="input_box">
                <div className="user_info">
                    <Avatar size={23} className="sidebar_avatar" />
                    <h6>{fullname}</h6>
                </div>
                <div className="input_btn">
                    <Pencil />
                    <div className="in_form">
                        <input type="text" placeholder="Ask what's in your mind ?" value={description} onChange={(e) => onChange(e)} onKeyPress={(e) => onkeyup(e)} required />
                    </div>
                </div>
            </div>

            {
                questions.map((question) => <Question key={question.id} question={question} animate="zoom-in" />)
            }

        </div>
    );
}

export default MainPanel;