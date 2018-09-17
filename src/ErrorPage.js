import React from 'react'
import { Link } from 'react-router-dom'

class ErrorPage extends React.Component {

    render() {

        return (              
        <div id="error-page">
            <p className="error-message">I'm sorry, this page does not exist.</p>
            <Link to="/">Return to MYREADS</Link>
        </div>
        )
    }
}

export default ErrorPage