import { useContext } from "react";
import { DrawerContext } from "../context/DrawerContextProvider";

const useDrawerContext = () => {
    return useContext(DrawerContext);
};
export default useDrawerContext;
