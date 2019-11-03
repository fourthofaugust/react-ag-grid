export default (state = {}, action) => {
    switch (action.type) {
        case 'ADD_POST_ACTION':
            return {
                result: action.payload
            }
        default:
            return state
    }
}