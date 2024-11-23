import SendIcon from "@mui/icons-material/Send";
import Chat from "./Chat";
import { Button, Stack, TextField } from "@mui/material";
import { useRef, useState } from "react";
import webSockets from "../util/webSocket";
import useChatContext from "../hooks/useChatContext";
import useAuthentication from "../hooks/useAuthentication";

const ChatArea = () => {
    const [chatMessages, setChatMessages] = useState({});
    const formRef = useRef("");
    const { userAuthentication } = useAuthentication();
    const { activeChat } = useChatContext();

    const handleSendMessage = e => {
        e.preventDefault();

        const message = formRef.current["message"].value;
        const chatMessage = {
            toUser: activeChat.tagLine,
            fromUser: userAuthentication.authData.user.username,
            message: message,
        };
        try {
            if (!activeChat) return;
            webSockets.sendMessage(chatMessage);

            // Add extra information if needed.
            const sentChatMessage = { ...chatMessage, isSent: true };

            //store all the messages in application state.
            const allMessages = { ...chatMessages };
            const specificChatMessages = allMessages[chatMessage.toUser];
            if (specificChatMessages) {
                specificChatMessages.push(sentChatMessage);
            } else {
                // create new key with the toUsername
                allMessages[chatMessage.toUser] = [sentChatMessage];
            }
            setChatMessages(allMessages);
        } catch (err) {
            // Handle error somehow
            console.log("Error due to STOMP: ", err);
        } finally {
            formRef.current["message"].value = "";
        }
    };

    return (
        <Stack
            justifyContent={"flex-end"}
            flexGrow={1}
            gap={2}
            overflow={"hidden"}
        >
            <Chat chatMessages={chatMessages[activeChat.tagLine]} />
            <Stack direction={"row"} gap={1} component={"form"} ref={formRef}>
                <TextField
                    id="outlined"
                    size="small"
                    placeholder="Type your message"
                    fullWidth
                    name="message"
                    type="text"
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
