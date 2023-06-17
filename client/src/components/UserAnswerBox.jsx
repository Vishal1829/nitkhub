import React, { useState } from 'react'
import DeleteIcon from '@material-ui/icons/DeleteForever'
import EditIcon from '@material-ui/icons/Edit'
import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

function UserAnswerBox({ answer, question_id, userId, handleUpdate, handleDelete }) {

    const [description, setDescription] = useState(answer.description)
    const [disable, setDisable] = useState(true)

    const onchange = (e) => {
        setDescription(e.target.value)
    }

    const handleUpd = async (a_id, desc, q_id) => {
        handleUpdate(a_id, desc, q_id)
        setDisable(!disable)
    }

    return (
        <div className="user_answer_box">
            <div className="user_answer_head d-flex">
                <div className="user_answer_detail">
                    <p>Posted on: {answer.createdAt}</p>
                    <p>Last Updated on: {answer.updatedAt} </p>
                </div>
                <div className="handlers">
                    <EditIcon style={{ color: "blue" }} className="mx-2 icon" onClick={() => setDisable(!disable)} />
                    <DeleteIcon style={{ color: "red" }} className="mx-2 icon" onClick={() => handleDelete(answer.id, question_id)} />
                </div>
            </div>
            <div className="user_answer_body">
                <textarea id={`des` + answer.id} className='form-control user_answer_description' onChange={(e) => onchange(e)} value={description} disabled={disable} />
            </div>
            {!disable && <div className="updateBtn">
                <Button
                    variant="contained"
                    color="primary"
                    endIcon={<CloudUploadIcon />}
                    onClick={() => { handleUpd(answer.id, description, question_id) }}
                >
                    UPDATE
                </Button>
            </div>}
        </div>
    )
}

export default UserAnswerBox;