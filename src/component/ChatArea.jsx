import SendIcon from "@mui/icons-material/Send";
import Chat from "./Chat";
import { Button, Stack, TextField } from "@mui/material";
import { useRef } from "react";
import webSockets from "../util/webSocket";
import useChatContext from "../hooks/useChatContext";
import useAuthentication from "../hooks/useAuthentication";

const ChatArea = () => {
    const { userAuthentication } = useAuthentication();
    const messageRef = useRef("");
    const { activeChat } = useChatContext();
    console.log("From chat area: ", activeChat);

    const handleSendMessage = e => {
        e.preventDefault();
        const message = messageRef.current;
        webSockets.sendMessage({
            toUser: activeChat.tagLine,
            fromUser: userAuthentication.user.username,
            message: message,
        });
    };

    return (
        <Stack
            justifyContent={"flex-end"}
            flexGrow={1}
            gap={2}
            overflow={"hidden"}
        >
            <Chat />
            <Stack direction={"row"} gap={1} component={"form"}>
                <TextField
                    id="outlined-size-small"
                    size="small"
                    placeholder="Type your message"
                    fullWidth
                    name="message"
                    type="text"
                    onChange={e => (messageRef.current = e.target.value)}
                />
                <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    onClick={e => handleSendMessage(e)}
                >
                    <SendIcon />
                </Button>
            </Stack>
        </Stack>
    );
};
export default ChatArea;
