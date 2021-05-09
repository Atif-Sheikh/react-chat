//Reducer for character information Initialize State
const initState = {
    rightPanelOpen: false,
};

//Define Actions
const actionReducer = (state = initState, action) => {
    switch (action.type) {
            //Change character name
        case 'RIGHT_PANEL':
            return {
                ...state,
                rightPanelOpen: action.payload,
            };

        default:
            return state
    }
}

export default actionReducer;