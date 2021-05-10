//Reducer for character information Initialize State
const initState = {
    user: null,
    allUsers: null,

    userGroups: null,
};

//Define Actions
const userReducer = (state = initState, action) => {
    switch (action.type) {
            //Change character name
        case 'UPDATE_USER':
            return {
                ...state,
                user: action.payload,
            };

        case 'ALL_USERS':
            return {
                ...state,
                allUsers: action.payload,
            };

        case 'ALL_GROUPS':
            return {
                ...state,
                userGroups: action.payload,
            }

        case 'LOGOUT':
            return {
                ...initState,
            }

        default:
            return state
    }
}

export default userReducer;