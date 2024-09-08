import { createContext, useReducer, useContext } from "react";
import notificationReducer from "../reducers/notificationReducer";

const NotificationContext = createContext();

const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null);
    return (
        <NotificationContext.Provider value={[ notification, notificationDispatch ]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export { NotificationContext, NotificationContextProvider};