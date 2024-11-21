import { useContext } from "react";
import { SideBarContext } from "../context/SideBarContextProvider";

const useSideBarActiveContext = () => {
    return useContext(SideBarContext);
};
export default useSideBarActiveContext;
