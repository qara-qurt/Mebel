import React from 'react'
import { Container } from 'react-bootstrap'
import Layout from '../layout/Layout'

const Error = () => {
    return (
        <Layout>
            <Container>
                <div className='d-flex align-items-center justify-content-center' style={{marginTop:100}}>
                    <h4>ERROR-404 | NOT FOUND</h4>
                </div>
            </Container>
        </Layout>
    )
}

export default Error;