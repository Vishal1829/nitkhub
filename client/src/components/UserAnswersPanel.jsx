import React from 'react';
import UserQA from './UserQA';
import axios from 'axios'


function AnswersPanel({ questions, userId, resetAll }) {

    axios.defaults.baseURL = 'http://www.localhost:3001'

    return (
        <div className="timeline">
            {questions &&
                <>
                    <div className="box" style={{ textAlign: 'center' }}>All Answers</div>
                    {questions.map((question) => <UserQA key={question.id} resetAll={resetAll} question={question} userId={userId} />)}
                </>
            }
            {questions.length === 0 &&
                < h5 className="mt-3" > No Answers Yet!</h5>
            }
        </div >
    );
}

export default AnswersPanel;