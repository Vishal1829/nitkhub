import React from 'react'
import { useEffect } from 'react'
import Container from 'react-bootstrap/Container'

export default function Landing() {

    const styles = {
        main_container: {
            height: "38rem",
            overflow: 'hidden'
        },
    }

    useEffect(() => {
        document.title = "NITK-HUB"
    }, [])

    return (

        <React.Fragment>

            <Container fluid className="d-flex flex-column justify-content-center align-items-center" style={styles.main_container}>
                <h1 className="animate-bounce">Hello!!! Welcome to your Community</h1>
                <div className="decors topr">
                </div>
                <div className="dround firstr">
                </div>
                <div className="dround secondnr">
                </div>
                <div className="dround secondr">
                </div>
                <div className="dround thirdr">
                </div>
                <div className="dround fourthr">
                </div>
                <div className="dround fiver">
                </div>
            </Container>

        </React.Fragment>

    )
}
