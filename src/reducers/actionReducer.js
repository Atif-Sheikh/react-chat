//Reducer for character information Initialize State
const initState = {
    rightPanelOpen: false,

    hideCenterContent: false,

    showRightDrawerMobile: false,
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

        case 'SHOW_RIGHT_DRAWER_MOBILE':
            return {
                ...state,
                showRightDrawerMobile: action.payload,
            }

        default:
            return state
    }
}

export default actionReducer;