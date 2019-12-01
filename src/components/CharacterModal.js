import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

const renderItems = (items, label) => {
    return <div>
        <h5>{label} ({items.available})</h5>
        {items.available === 0 ? <p className="text-muted">No {label} found</p> : null}
        {items.items.map((item, i) => <li key={i}>{item.name}</li>)}
        <hr />
    </div>
}

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
                <p>{c.description || "No description found"}</p>
                <hr />
                {renderItems(c.comics, "Comics")}
                {renderItems(c.series, "Series")}
                {renderItems(c.stories, "Stories")}
                {renderItems(c.events, "Events")}
            </ModalBody>
        </Modal>
    )
}
