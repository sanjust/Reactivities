import React from 'react'
import { Button, Container, Menu, Segment } from 'semantic-ui-react';

interface IProps {
    openCreateForm: () => void;
}

export const NavBar: React.FC<IProps> = (props) => {
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
                        <Button positive content='Create Activity' onClick={() => { props.openCreateForm() }} />
                    </Menu.Item>
                </Container>
            </Menu>
        </Segment>
    )
}

export default NavBar;
