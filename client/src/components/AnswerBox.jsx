function AnswerBox({ answer }) {

    return (
        <div className="answer">
            <div className="answer_head">
                <div className="details">
                    <div className="answer_info">
                        <h6>{answer.postedBy}</h6>
                        <p> Answered on {answer.updatedAt}</p>
                    </div>
                </div>
            </div>
            <div className="answer_body">
                <p className="answer_description">{answer.description}</p>
            </div>
        </div>
    );
}

export default AnswerBox;