import { createContext, useState } from "react";

export const DrawerContext = createContext();

const DrawerContextProvider = ({ children }) => {
    const [drawerContext, setDrawerContext] = useState([
        { buttonName: "chat", isActive: true },
        { buttonName: "friendRequest", isActive: false },
    ]);

    return (
        <DrawerContext.Provider value={{ drawerContext, setDrawerContext }}>
            {children}
        </DrawerContext.Provider>
    );
};
export default DrawerContextProvider;
