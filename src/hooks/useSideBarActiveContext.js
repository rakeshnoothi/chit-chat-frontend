import { useContext } from "react";
import { SideBarActiveContextProviderContext } from "../context/SideBarActiveContextProvider";

const useSideBarActiveContext = () => {
    return useContext(SideBarActiveContextProviderContext);
};
export default useSideBarActiveContext;
