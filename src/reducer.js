const initialState = {
    characterList: [],
    currentCharacterID: null,
    autoCompleteList: [],
    page: 0,
    totalCharacters: 0,
    isLoading: false
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
        case "SET_TOTAL_CHARACTERS":
            return {
                ...state,
                totalCharacters: action.totalCharacters
            }
        default:
            return state
    }
}

export default reducer;
