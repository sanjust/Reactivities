import { observer } from 'mobx-react-lite';
import React from 'react'
import { useContext } from 'react';
import { Modal } from 'semantic-ui-react'
import { RootStoreContext } from '../../stores/rootStore'

const ModalContainer = () => {
    const rootStore = useContext(RootStoreContext);
    const { modal: { open, body }, closeModel } = rootStore.modalStore;

    return (
        <Modal
            onClose={closeModel}
            size='mini'
            open={open}>
            <Modal.Content>
                {body}
            </Modal.Content>
        </Modal>
    )
}

export default observer(ModalContainer)