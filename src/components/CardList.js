import React from 'react';
import { Row, Col } from 'reactstrap';
import MarvelCard from './MarvelCard';

export class CardList extends React.Component {
    render() {
        const { allCharacters, currentCharacterID, setCurrentCharacterID } = this.props;
        if (allCharacters.length === 0) {
            return <div className="loading">
                No characters found
            </div>
        }
        return <Row>
            {
                allCharacters.map((character, i) => {
                    return <Col lg={3} md={4} sm={12} xs={12} key={i}>
                        <MarvelCard currentCharacterID={currentCharacterID} setCurrentCharacterID={setCurrentCharacterID} character={character} />
                    </Col>
                })
            }
        </Row>
    }
}
