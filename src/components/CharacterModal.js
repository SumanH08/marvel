import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';


export const CharacterModal = (props) => {
    const {
        characterList,
        currentCharacterID,
        onClose
    } = props;

    var c = characterList.filter(c => c.id === currentCharacterID)[0];

    if (!c) {
        return null;
    }

    const image = c.thumbnail;

    return (
        <Modal isOpen={true} toggle={onClose}>
            <ModalHeader toggle={onClose}>{c.name}</ModalHeader>
            <ModalBody>
                <img src={image.path + "." + image.extension} alt="char" />
                <hr />
                <p>{c.description}</p>
            </ModalBody>
        </Modal>
    )
}
