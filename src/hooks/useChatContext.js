import { useContext } from "react";
import { ChatContext } from "../context/ChatContextProvider";

const useChatContext = () => {
    return useContext(ChatContext);
};
export default useChatContext;
