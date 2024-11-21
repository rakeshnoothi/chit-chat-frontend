import { createContext, useState } from "react";

export const SideBarContext = createContext();

const SideBarContextProvider = ({ children }) => {
    const [sideBarActiveContext, setSideBarActiveContext] = useState("friends");

    return (
        <SideBarContext.Provider
            value={{ sideBarActiveContext, setSideBarActiveContext }}
        >
            {children}
        </SideBarContext.Provider>
    );
};
export default SideBarContextProvider;
