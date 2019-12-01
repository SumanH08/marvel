import React from 'react';
import { Row, Col } from 'reactstrap';
import MarvelCard from './MarvelCard';

export class CardList extends React.Component {
    render() {
        const { allCharacters, setCurrentCharacterID, addToSavedCharacters, removeFromSaved, savedCharacters, isViewSaved } = this.props;
        if (allCharacters.length === 0) {
            return <div className="loading">
                No characters found
            </div>
        }
        if (isViewSaved && savedCharacters.length === 0) {
            return <div className="loading">
                No characters saved
            </div>
        }

        var charsDisplay = isViewSaved ? savedCharacters : allCharacters;

        return <Row>
            {
                charsDisplay.map((character, i) => {
                    return <Col lg={4} md={4} sm={12} xs={12} key={i}>
                        <MarvelCard
                            removeFromSaved={removeFromSaved}
                            savedCharacters={savedCharacters}
                            addToSavedCharacters={addToSavedCharacters}
                            setCurrentCharacterID={setCurrentCharacterID}
                            character={character} />
                    </Col>
                })
            }
        </Row>
    }
}
