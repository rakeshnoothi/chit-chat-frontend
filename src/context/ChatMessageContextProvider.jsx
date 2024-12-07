import { createContext, useState } from "react";

export const ChatMessageContext = createContext();

const ChatMessageContextProvider = ({ children }) => {
    const [chatMessages, setChatMessages] = useState({});
    return (
        <ChatMessageContext.Provider value={{ chatMessages, setChatMessages }}>
            {children}
        </ChatMessageContext.Provider>
    );
};
export default ChatMessageContextProvider;
