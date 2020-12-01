import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Dropdown, Menu, Segment, Image } from 'semantic-ui-react';
import { RootStoreContext } from '../../app/stores/rootStore';
import { useContext } from 'react';

const NavBar = () => {
    const rootStore = useContext(RootStoreContext);
    const { user, logout } = rootStore.userStore;

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
                    {user && <Menu.Item position='right'>
                        <Image avatar spaced='right' src={user.image || '/assets/user.png'} />
                        <Dropdown pointing='top left' text={user.displayName}>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to={`/profile/username`} text={user.displayName} icon='user' />
                                <Dropdown.Item text='Logout' icon='power' onClick={logout} />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>}
                </Container>
            </Menu>
        </Segment>
    )
}

export default observer(NavBar);