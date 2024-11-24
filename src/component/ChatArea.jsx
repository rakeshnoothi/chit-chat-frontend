import SendIcon from "@mui/icons-material/Send";
import Chat from "./Chat";
import { Button, Stack, TextField } from "@mui/material";
import { useRef, useState } from "react";
import webSockets from "../util/webSocket";
import useChatContext from "../hooks/useChatContext";
import useAuthentication from "../hooks/useAuthentication";

const ChatArea = () => {
    const [chatMessages, setChatMessages] = useState({});
    const { userAuthentication } = useAuthentication();
    const { activeChat } = useChatContext();
    const formRef = useRef("");

    webSockets.onMessage(message => {
        console.log("Message from chat area: ", message);

        const receivedMessage = {
            ...message,
            isSent: false,
            id: crypto.randomUUID(),
        };
        setChatMessages(previousMessages => {
            const allChatMessages = createNewAllChatMessages(
                previousMessages,
                message.fromUser,
                receivedMessage
            );
            return allChatMessages;
        });
    });

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
            const sentChatMessage = {
                ...chatMessage,
                isSent: true,
                id: crypto.randomUUID(),
            };

            //store all the messages in application state.
            const allChatMessages = createNewAllChatMessages(
                chatMessages,
                chatMessage.toUser,
                sentChatMessage
            );
            setChatMessages(allChatMessages);
        } catch (err) {
            // Handle error somehow
            console.log("Error due to STOMP: ", err);
        } finally {
            formRef.current["message"].value = "";
        }
    };

    const createNewAllChatMessages = (previousMessages, user, newMessage) => {
        const allMessages = { ...previousMessages };

        if (allMessages[user]) {
            allMessages[user] = [...allMessages[user], newMessage];
        } else {
            // create new key with the toUsername
            allMessages[user] = [newMessage];
        }

        return allMessages;
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
