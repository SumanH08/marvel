import React from 'react';
import { Card, CardImg, CardBody, CardTitle } from 'reactstrap';

class MarvelCard extends React.Component {

    openModal = (id) => {
        this.props.setCurrentCharacterID(id);
    }

    render() {
        const { character: c } = this.props;
        const image = c.thumbnail;
        return (
            <Card onClick={this.openModal.bind(this, c.id)}>
                <CardImg top width="100%" src={image.path + "." + image.extension} alt="Card image cap" />
                <CardBody className="card_body">
                    <CardTitle>{c.name}</CardTitle>
                </CardBody>
            </Card>
        )
    }
}

export default MarvelCard;
