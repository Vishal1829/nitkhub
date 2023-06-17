import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import Avatar from 'react-bootstrap-icons/dist/icons/person-circle'
import DeleteIcon from '@material-ui/icons/DeleteForever'
import EditIcon from '@material-ui/icons/Edit'
import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
function UserQuestion({ question, handleDelete, handleUpdate }) {

    const history = useHistory()

    const [description, setDescription] = useState(question.description)
    const [disable, setDisable] = useState(true)

    const onchange = (e) => {
        setDescription(e.target.value)
    }

    const handleUpd = async (id, desc) => {
        handleUpdate(id, desc)
        setDisable(!disable)
    }

    return (
        <div className="question">
            <div className="question_head">
                <div className="details">
                    <Avatar size={45} className="sidebar_avatar" />
                    <div className="question_info">
                        <h4>{question.asked_by}</h4>
                        <p>Posted on: {question.createdAt}</p>
                        <p>Last Updated on: {question.updatedAt}</p>
                    </div>
                </div>
                <div className="handlers">
                    <EditIcon style={{ color: "blue" }} className="mx-2 icon" onClick={() => setDisable(!disable)} />
                    <DeleteIcon style={{ color: "red" }} className="mx-2 icon" onClick={() => handleDelete(question.id)} />
                </div>
            </div>
            <div className="question_body">
                <textarea id={`des` + question.id} className='form-control question_description' onChange={(e) => onchange(e)} value={description} disabled={disable} />
                <span className="ans_btn" onClick={() => history.push(`answer/${question.id}`)} >Answers &#x3e;</span>
            </div>
            {!disable && <div className="updateBtn">
                <Button
                    variant="contained"
                    color="primary"
                    endIcon={<CloudUploadIcon />}
                    onClick={() => handleUpd(question.id, description)}
                >
                    UPDATE
                </Button>
            </div>}
        </div>
    );
}

export default UserQuestion;