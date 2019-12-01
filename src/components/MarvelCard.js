import React from 'react';
import { Card, CardImg, CardBody, CardTitle } from 'reactstrap';

class MarvelCard extends React.Component {

    openModal = (id) => {
        console.log(id);
        this.props.setCurrentCharacterID(id);
    }

    handleFavClick = (evt) => {
        evt.stopPropagation();
        const { character: c, addToSavedCharacters } = this.props;
        addToSavedCharacters(c);
    }

    handleRemoveSave = (evt) => {
        evt.stopPropagation();
        const { character: c, removeFromSaved } = this.props;
        removeFromSaved(c);
    }

    render() {
        const { character: c, savedCharacters } = this.props;
        const image = c.thumbnail;
        var heartIcon = <ion-icon name="heart-empty" onClick={this.handleFavClick}></ion-icon>;

        var allCharacterIDs = savedCharacters.map(c => c.id);
        if (allCharacterIDs.indexOf(c.id) >= 0) {
            heartIcon = <ion-icon name="heart" onClick={this.handleRemoveSave}></ion-icon>;
        }

        return (
            <Card onClick={this.openModal.bind(this, c.id)} >
                <CardImg top width="100%" src={image.path + "." + image.extension} alt="Card image cap" />
                <CardBody className="card_body">
                    <CardTitle>{c.name}</CardTitle>
                    {heartIcon}
                </CardBody>
            </Card>
        )
    }
}

export default MarvelCard;
