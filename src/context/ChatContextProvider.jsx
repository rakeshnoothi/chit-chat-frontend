import { createContext, useState } from "react";

export const ChatContext = createContext();

const ChatContextProvider = ({ children }) => {
    const [activeChat, setActiveChat] = useState({});
    const lastActiveChat = JSON.parse(localStorage.getItem("lastActiveChat"));
    if (Object.keys(activeChat).length === 0 && lastActiveChat) {
        setActiveChat(lastActiveChat);
        console.log("This chat context rendered");
    }
    return (
        <ChatContext.Provider value={{ activeChat, setActiveChat }}>
            {children}
        </ChatContext.Provider>
    );
};
export default ChatContextProvider;
