import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import LeftPanel from '../components/LeftPanel';
import UserQuestionsPanel from '../components/UserQuestionsPanel';
import { AuthContext } from '../helpers/AuthContext'
import axios from 'axios'

function UserQuestions(props) {

    const history = useHistory()
    const { authState, authUser } = useContext(AuthContext)

    if (authState === false) {
        history.push('/')
    }

    const [question, setQuestion] = useState([])

    const getquestion = () => {
        axios.get(`/question/get/${authUser.id}`, {
            headers: {
                token: localStorage.getItem("token")
            }
        }).then((resp) => {
            setQuestion(resp.data)
        })
    }

    useEffect(() => {
        getquestion()
    }, [])

    var fullname = ''
    if (authState) {
        fullname = (authUser.first_name) + " " + (authUser.last_name)
    }

    return (
        <div className="main pb-5">
            <LeftPanel fullname={fullname} email={authUser.email} />
            <UserQuestionsPanel key={authUser.id} question={question} resetQuestions={getquestion} />
        </div>
    )
}

export default UserQuestions;