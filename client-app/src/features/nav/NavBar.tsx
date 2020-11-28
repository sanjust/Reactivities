import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Button, Container, Menu, Segment } from 'semantic-ui-react';
import ActivityStore from '../../app/stores/activityStore';

const NavBar = () => {
    const activityStore = useContext(ActivityStore);
    const { handleOpenCreateForm } = activityStore;
    return (
        <Segment>
            <Menu fixed='top' inverted>
                <Container>
                    <Menu.Item header>
                        <img src='/assets/logo.png' alt='logo' style={{ marginRight: '10px' }} />
                        Reactivities
                        </Menu.Item>
                    <Menu.Item name='Activitites' />
                    <Menu.Item>
                        <Button positive content='Create Activity' onClick={() => { handleOpenCreateForm() }} />
                    </Menu.Item>
                </Container>
            </Menu>
        </Segment>
    )
}

export default observer(NavBar);