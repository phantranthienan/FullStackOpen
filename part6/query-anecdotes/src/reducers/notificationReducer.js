const notificationReducer = (state, action) => {
    switch (action.type) {
        case "SET_NOTIFICATION":
            return action.payload;
        case "REMOVE_NOTIFICATION":
            return null;
        default:
            return state;
    }
}

const setNotification = (message) => {
    return {
        type: "SET_NOTIFICATION",
        payload: message
    }
}

const removeNotification = () => {
    return {
        type: "REMOVE_NOTIFICATION"
    }
}

export default notificationReducer;
export { setNotification, removeNotification };