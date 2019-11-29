export const setCharacterList = (characterList) => {
    return {
        type: "SET_CHARACTER_LIST",
        characterList
    }
}

export const setCurrentCharacterID = (currentCharacterID) => {
    return {
        type: "SET_CURRENT_CHARACTER_ID",
        currentCharacterID
    }
}

export const setAutoCompleteList = (autoCompleteList) => {
    return {
        type: "SET_AUTOCOMPLETE_LIST",
        autoCompleteList
    }
}

export const setPage = (page) => {
    return {
        type: "SET_PAGE",
        page
    }
}

export const setTotalCharacters = (totalCharacters) => {
    return {
        type: "SET_TOTAL_CHARACTERS",
        totalCharacters
    }
}

export const setLoading = (loading) => {
    return {
        type: "SET_LOADING",
        loading
    }
}
