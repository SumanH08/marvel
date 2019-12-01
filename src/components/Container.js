import React from 'react';
import axios from 'axios';
import { Container as BContainer, Row, Col, Label, Input } from 'reactstrap';
import { Search } from './Search';
import { CardList } from './CardList';
import { Paginate } from './Paginate';
import { connect } from 'react-redux';
import { CharacterModal } from './CharacterModal';
import { setCharacterList, setAutoCompleteList, setPage, setCurrentCharacterID, setTotalCharacters, setLoading, addToSavedCharacters, removeFromSaved, setViewSaved } from './../action';

const api = "https://gateway.marvel.com/v1/public/characters?ts=1234&apikey=435bf5dfaa68cdc7af377690a64a8fc1&hash=a3bc99540e3b96aeb53906afd95dc8a2";
const cardCount = 3;

class Container extends React.Component {
    componentDidMount = () => {
        this.fetchData(this.props.page);
    }

    fetchData = (page) => {
        const { setCharacterList, setTotalCharacters, setLoading } = this.props;
        setLoading(true);
        axios.get(api + "&offset=" + (page - 1) * cardCount + "&limit=" + cardCount).then(({ data }) => {
            setLoading(false);
            const results = data.data.results;
            const total = data.data.total;
            setTotalCharacters(total);
            setCharacterList(results);
        })
    }

    fetchSearch = (name) => {
        setPage(1);
        if (name === "") {
            this.fetchData(1);
            return;
        }
        const { setCharacterList, setTotalCharacters, setLoading, setViewSaved } = this.props;
        setLoading(true);
        setViewSaved(false);
        axios.get(api + "&nameStartsWith=" + name).then(({ data }) => {
            setLoading(false);
            const results = data.data.results;
            const total = data.data.total;
            setTotalCharacters(total);
            setCharacterList(results);
        })
    }

    setPage = (page) => {
        const { setPage } = this.props;
        setPage(page);
        this.fetchData(page);
    }

    render() {
        const { characterList,
            page,
            totalCharacters,
            currentCharacterID,
            setCurrentCharacterID,
            isLoading,
            addToSavedCharacters,
            removeFromSaved,
            savedCharacters,
            isViewSaved,
            setViewSaved } = this.props;
        return <BContainer>
            <Row className="search">
                <Col lg={8} md={8} sm={12} xs={12}>
                    <Search search={this.fetchSearch} />
                </Col>
                <Col lg={4} md={4} sm={12} xs={12} className="text-right">
                    <Label check>
                        <Input type="checkbox" checked={isViewSaved} onChange={setViewSaved.bind(this, !isViewSaved)} />{' '}
                        View saved
                    </Label>
                </Col>
            </Row>
            <div className="card-list">
                {
                    isLoading ?
                        <div className="loading">Loading ...</div> :
                        <CardList
                            isViewSaved={isViewSaved}
                            addToSavedCharacters={addToSavedCharacters}
                            removeFromSaved={removeFromSaved}
                            savedCharacters={savedCharacters}
                            setCurrentCharacterID={setCurrentCharacterID}
                            currentCharacterID={currentCharacterID}
                            allCharacters={characterList} />
                }
            </div>
            {
                !isViewSaved ? <Paginate page={page} onPageChange={this.setPage} totalCharacters={totalCharacters} cardCount={cardCount} /> : null
            }
            <CharacterModal onClose={() => setCurrentCharacterID(null)} characterList={characterList} currentCharacterID={currentCharacterID} />
        </BContainer>
    }
}

const mapStateToProps = state => {
    return {
        characterList: state.characterList,
        currentCharacterID: state.currentCharacterID,
        autoCompleteList: state.autoCompleteList,
        page: state.page,
        totalCharacters: state.totalCharacters,
        isLoading: state.isLoading,
        savedCharacters: state.savedCharacters,
        isViewSaved: state.isViewSaved
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCharacterList: (characterList) => dispatch(setCharacterList(characterList)),
        setAutoCompleteList: (autoCompleteList) => dispatch(setAutoCompleteList(autoCompleteList)),
        setPage: (page) => dispatch(setPage(page)),
        setCurrentCharacterID: (currentCharacterID) => dispatch(setCurrentCharacterID(currentCharacterID)),
        setTotalCharacters: (totalCharacters) => dispatch(setTotalCharacters(totalCharacters)),
        setLoading: (loading) => dispatch(setLoading(loading)),
        addToSavedCharacters: (favCharacter) => dispatch(addToSavedCharacters(favCharacter)),
        removeFromSaved: (favCharacter) => dispatch(removeFromSaved(favCharacter)),
        setViewSaved: (isViewSaved) => dispatch(setViewSaved(isViewSaved))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Container);
