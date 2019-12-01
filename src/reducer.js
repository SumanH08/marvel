const initialState = {
    characterList: [],
    currentCharacterID: null,
    autoCompleteList: [],
    page: 1,
    totalCharacters: 18,
    isLoading: false,
    savedCharacters: [],
    isViewSaved: false
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case "SET_LOADING":
            return {
                ...state,
                isLoading: action.loading
            }
        case "SET_CHARACTER_LIST":
            return {
                ...state,
                characterList: action.characterList
            };
        case "SET_CURRENT_CHARACTER_ID":
            return {
                ...state,
                currentCharacterID: action.currentCharacterID
            };
        case "SET_AUTOCOMPLETE_LIST":
            return {
                ...state,
                autoCompleteList: action.autoCompleteList
            };
        case "SET_PAGE":
            return {
                ...state,
                page: action.page
            };
        case "ADD_TO_SAVED_CHARACTERS":
            var allCharacterIDs = state.savedCharacters.map(c => c.id);
            if (allCharacterIDs.indexOf(action.favCharacter.id) >= 0) {
                return state;
            }
            let newSaved = state.savedCharacters.map(i => i);
            newSaved.push(action.favCharacter);
            return {
                ...state,
                savedCharacters: newSaved
            };
        case "REMOVE_FROM_SAVED":
            const removeSaved = state.savedCharacters.filter((character, i) => {
                return action.favCharacter.id !== character.id
            });

            return {
                ...state,
                savedCharacters: removeSaved
            };
        case "SET_VIEW_SAVED":
            return {
                ...state,
                isViewSaved: action.isViewSaved
            }
        case "SET_TOTAL_CHARACTERS":
            if (action.totalCharacters > 18) {
                action.totalCharacters = 18;
            }
            return {
                ...state,
                totalCharacters: action.totalCharacters
            }
        default:
            return state
    }
}

export default reducer;
