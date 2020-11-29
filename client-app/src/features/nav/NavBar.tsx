import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Menu, Segment } from 'semantic-ui-react';

const NavBar = () => {
    return (
        <Segment>
            <Menu fixed='top' inverted>
                <Container>
                    <Menu.Item header as={Link} to='/' >
                        <img src='/assets/logo.png' alt='logo' style={{ marginRight: '10px' }} />
                        Reactivities
                    </Menu.Item>
                    <Menu.Item name='Activitites' as={Link} to='/activities' />
                    <Menu.Item>
                        <Button positive content='Create Activity' as={Link} to='/createActivity' />
                    </Menu.Item>
                </Container>
            </Menu>
        </Segment>
    )
}

export default observer(NavBar);