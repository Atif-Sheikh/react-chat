//Reducer for character information Initialize State
const initState = {
    chatMessages: [],

    groupMessages: [],

    groupEntry: {}
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

            case 'GROUP_ENTRY':
                return {
                    ...state,
                    groupEntry: { ...state.groupEntry, ...action.payload},
                }    

        default:
            return state
    }
}

export default chatReducer;