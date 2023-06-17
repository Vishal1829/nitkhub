import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import LeftPanel from '../components/LeftPanel';
import MainPanel from '../components/MainPanel';
import { AuthContext } from '../helpers/AuthContext'
import axios from 'axios';

function Home(props) {

    const history = useHistory()
    const { authState, authUser } = useContext(AuthContext)

    if (authState === false) {
        history.push('/')
    }

    const [questions, setQuestions] = useState([])

    const question = () => {
        axios.get('/question/get').then((resp) => {
            setQuestions(resp.data)
        })
    }

    useEffect(() => {
        question()
    }, [])

    var fullname = ''
    if (authState) {
        fullname = (authUser.first_name) + " " + (authUser.last_name)
    }

    return (
        <div className="main">
            <LeftPanel fullname={fullname} email={authUser.email} />
            <MainPanel fullname={fullname} questions={questions} resetQuestions={question} />
        </div>
    )
}

export default Home;