//Reducer for character information Initialize State
const initState = {
    rightPanelOpen: false,

    hideCenterContent: false,
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

        case 'HIDE_CENTER_CONTENT':
            return {
                ...state,
                hideCenterContent: action.payload,
            }

        default:
            return state
    }
}

export default actionReducer;