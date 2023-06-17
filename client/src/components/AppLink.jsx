import React from 'react';
import { Link } from "react-router-dom"

import Colors from '../assets/Colors'

function AppLink(props) {

    console.log(props);

    const styles = {
        button: {
            textDecoration: 'none',
            color: props.color,
            backgroundColor: props.type === 'login' ? Colors.green : Colors.lightBlue,
            borderRadius: "0.4rem",
            minWidth: '8rem',
            maxWidth: '10rem',
            textAlign: 'center',
            fontWeight: 'bold',
        },
    }

    return (
        <>
            {props.type && <Link className={`${props.className} px-4 py-3`} style={styles.button} to={`/${props.type}`} >{props.type.toUpperCase()}</Link>}
        </>
    );
}

AppLink.defaultProps = {
    color: 'white',
    type: '',
}

export default AppLink;