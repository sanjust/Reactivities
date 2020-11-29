import React from 'react'
import { Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

export const HomePage = () => {
    return (
        <Container style={{ marginTop: '7em' }} >
            <h1>Home apge</h1>
            <h3>Go to <Link to='/activities'>Link</Link></h3>
        </Container>
    )
}
