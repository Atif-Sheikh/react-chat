//Reducer for character information Initialize State
const initState = {
    chatMessages: [],

    groupMessages: [],
};

//Define Actions
const chatReducer = (state = initState, action) => {
    switch (action.type) {

        case 'CHAT_MESSAGES':
            return {
                ...state,
                chatMessages: action.payload,
            }

        case 'GROUP_MESSAGES':
            return {
                ...state,
                groupMessages: action.payload,
            }

        default:
            return state
    }
}

export default chatReducer;