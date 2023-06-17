import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom'
import LeftPanel from '../components/LeftPanel';
import ProfilePanel from '../components/ProfilePanel';
import { AuthContext } from '../helpers/AuthContext'

function Profile(props) {

    const history = useHistory()
    const { authState, authUser } = useContext(AuthContext)

    if (authState === false) {
        history.push('/')
    }

    var fullname = ''
    if (authState) {
        fullname = (authUser.first_name) + " " + (authUser.last_name)
    }

    return (
        <div className="main">
            <LeftPanel fullname={fullname} email={authUser.email} />
            <ProfilePanel user={authUser} />
        </div>
    )
}

export default Profile;