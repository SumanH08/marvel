import React from 'react';
import axios from 'axios';
import { Container as BContainer } from 'reactstrap';
import { Search } from './Search';
import { CardList } from './CardList';
import { Paginate } from './Paginate';
import { connect } from 'react-redux';
import { CharacterModal } from './CharacterModal';
import { setCharacterList, setAutoCompleteList, setPage, setCurrentCharacterID, setTotalCharacters, setLoading } from './../action';

const api = "https://gateway.marvel.com/v1/public/characters?ts=1234&apikey=435bf5dfaa68cdc7af377690a64a8fc1&hash=a3bc99540e3b96aeb53906afd95dc8a2";
const cardCount = 18;

class Container extends React.Component {
    componentDidMount = () => {
        this.fetchData(this.props.page);
    }

    fetchData = (page) => {
        const { setCharacterList, setTotalCharacters, setLoading } = this.props;
        setLoading(true);
        axios.get(api + "&offset=" + page * cardCount + "&limit=" + cardCount).then(({ data }) => {
            setLoading(false);
            const results = data.data.results;
            const total = data.data.total;
            setTotalCharacters(total);
            setCharacterList(results);
        })
    }

    fetchSearch = (name) => {
        if (name === "") {
            this.fetchData(0);
            setPage(0);
            return;
        }
        const { setCharacterList, setTotalCharacters, setLoading } = this.props;
        setLoading(true);
        axios.get(api + "&nameStartsWith=" + name).then(({ data }) => {
            setLoading(false);
            const results = data.data.results;
            const total = data.data.total;
            setPage(0);
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
        const { characterList, page, totalCharacters, currentCharacterID, setCurrentCharacterID, isLoading } = this.props;
        return <BContainer>
            <Search search={this.fetchSearch} />
            <div className="card-list">
                {
                    isLoading ?
                        <div className="loading">Loading ...</div> :
                        <CardList setCurrentCharacterID={setCurrentCharacterID} currentCharacterID={currentCharacterID} allCharacters={characterList} />
                }
            </div>
            <Paginate page={page} onPageChange={this.setPage} totalCharacters={totalCharacters} cardCount={cardCount} />
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
        isLoading: state.isLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCharacterList: (characterList) => dispatch(setCharacterList(characterList)),
        setAutoCompleteList: (autoCompleteList) => dispatch(setAutoCompleteList(autoCompleteList)),
        setPage: (page) => dispatch(setPage(page)),
        setCurrentCharacterID: (currentCharacterID) => dispatch(setCurrentCharacterID(currentCharacterID)),
        setTotalCharacters: (totalCharacters) => dispatch(setTotalCharacters(totalCharacters)),
        setLoading: (loading) => dispatch(setLoading(loading))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Container);
