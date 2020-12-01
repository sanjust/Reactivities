import React, { Fragment } from 'react'
import { Button, Container, Header, Segment, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';
import { useContext } from 'react';
import { LoginForm } from '../user/LoginForm';
import { RegisterForm } from '../user/RegisterForm';

export const HomePage = () => {
    const rootStore = useContext(RootStoreContext);
    const { user, isLoggedIn } = rootStore.userStore;
    const { openModel } = rootStore.modalStore;

    return (
        <Segment inverted textAlign='center' vertical className='masthead' >
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' style={{ marginBottom: 12 }} />
                Reactivities
            </Header>
                {isLoggedIn && user ? <Fragment>
                    <Header as='h2' inverted content={`Welcome back ${user.displayName}`} />
                    <Button as={Link} to='/activities' size='huge' inverted>
                        Go to activities!
                        </Button>
                </Fragment>
                    :
                    <Fragment>
                        <Header as='h2' inverted content='Welcome to Reactivities' />
                        <Button onClick={() => { openModel(<LoginForm />) }} size='huge' inverted>
                            Login
                        </Button>
                        <Button onClick={() => { openModel(<RegisterForm />) }} size='huge' inverted>
                            Register
                        </Button>
                    </Fragment>
                }
            </Container>
        </Segment>
    )
}
