import { createContext, useState } from "react";

export const ChatContext = createContext();

const ChatContextProvider = ({ children }) => {
    const [activeChat, setActiveChat] = useState({});
    return (
        <ChatContext.Provider value={{ activeChat, setActiveChat }}>
            {children}
        </ChatContext.Provider>
    );
};
export default ChatContextProvider;
