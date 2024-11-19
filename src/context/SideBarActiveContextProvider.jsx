import { createContext, useState } from "react";

export const SideBarActiveContextProviderContext = createContext();

const SideBarActiveContextProvider = ({ children }) => {
    const [sideBarContext, setSideBarContext] = useState({
        chat: [
            { buttonName: "friends", isActive: true },
            { buttonName: "channels", isActive: false },
        ],
        friendRequest: [
            { buttonName: "friendRequestsSent", isActive: false },
            { buttonName: "friendRequestsReceived", isActive: false },
        ],
    });

    return (
        <SideBarActiveContextProviderContext.Provider
            value={{ sideBarContext, setSideBarContext }}
        >
            {children}
        </SideBarActiveContextProviderContext.Provider>
    );
};
export default SideBarActiveContextProvider;
