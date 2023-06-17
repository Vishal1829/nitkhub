import React from 'react';
import { useHistory } from 'react-router';
import Avatar from 'react-bootstrap-icons/dist/icons/person-circle'

function Question({ question, showsLink = true, animate = "" }) {
    const history = useHistory()

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
                {showsLink && <span className="ans_btn" onClick={() => history.push(`answer/${question.id}`)} >Answers &#x3e;</span>}
            </div>
        </div >
    );
}

export default Question;