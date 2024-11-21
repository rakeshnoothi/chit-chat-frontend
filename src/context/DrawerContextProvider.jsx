import { createContext, useState } from "react";

export const DrawerContext = createContext();

const DrawerContextProvider = ({ children }) => {
    const [activeDrawerContext, setActiveDrawerContext] = useState("chat");
    return (
        <DrawerContext.Provider
            value={{ activeDrawerContext, setActiveDrawerContext }}
        >
            {children}
        </DrawerContext.Provider>
    );
};
export default DrawerContextProvider;
