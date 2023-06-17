import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import LeftPanel from '../components/LeftPanel';
import UserAnswersPanel from '../components/UserAnswersPanel';
import { AuthContext } from '../helpers/AuthContext'
import axios from 'axios'

function UserAnswers(props) {

    const history = useHistory()
    const { authState, authUser } = useContext(AuthContext)

    if (authState === false) {
        history.push('/')
    }

    const [answeredQ, setAnsweredQ] = useState([])

    const id = JSON.parse(localStorage.getItem("user_info")).id

    const answer = () => {
        axios.get(`/question/byUserAnswers/${id}`, {
            headers: {
                token: localStorage.getItem("token")
            }
        }).then((resp) => {
            setAnsweredQ(resp.data)
        })
    }

    useEffect(() => {
        answer()
    }, [])

    var fullname = ''
    if (authState) {
        fullname = (authUser.first_name) + " " + (authUser.last_name)
    }

    return (
        <div className="main pb-5">
            <LeftPanel fullname={fullname} email={authUser.email} />
            <UserAnswersPanel key={id} questions={answeredQ} userId={id} resetAll={answer} />
        </div>
    )
}

export default UserAnswers;