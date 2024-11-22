import { Stack, Typography } from "@mui/material";
import ChatArea from "./ChatArea";
import useChatContext from "../hooks/useChatContext";

const ChatSection = () => {
    const { activeChat } = useChatContext();
    console.log("Active chat: ", activeChat);
    return (
        <Stack flexGrow={1} border={1} padding={1} gap={2}>
            <Stack padding={1} border={1}>
                <Typography variant="h5" textTransform={"uppercase"}>
                    {activeChat.heading}
                </Typography>
                <Typography fontSize={"small"} textTransform={"uppercase"}>
                    {activeChat.tagLine}
                </Typography>
            </Stack>
            <ChatArea />
        </Stack>
    );
};
export default ChatSection;
