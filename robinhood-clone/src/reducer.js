export const initialState = {
    choosedDate: "W",
    choosedShare: "ACB"
}

export const actionTypes = {
    SET_DATE: 'SET_DATE',
    SET_SHARE: 'SET_SHARE'
}

const reducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case actionTypes.SET_DATE:
            return {
                ...state,
                choosedDate: action.choosedDate
            }
        case actionTypes.SET_SHARE:
            return {
                ...state,
                choosedShare: action.choosedShare
            }
        default:
            return state
    }
}

export default reducer;