import SendIcon from "@mui/icons-material/Send";
import Chat from "./Chat";
import { Button, Stack, TextField } from "@mui/material";
import { useRef } from "react";
import useChatMessageContext from "../hooks/useChatMessageContext";
import useChatContext from "../hooks/useChatContext";
import useSideBarActiveContext from "../hooks/useSideBarActiveContext";

const ChatArea = () => {
    const { chatMessages, sendMessage } = useChatMessageContext();
    const { activeChat } = useChatContext();
    const { sideBarActiveContext } = useSideBarActiveContext();
    const formRef = useRef("");

    const handleSendMessage = e => {
        e.preventDefault();

        const text = formRef.current["message"].value;

        try {
            sendMessage(text);
            // clear the input text
            formRef.current["message"].value = "";
        } catch (err) {
            // TODO: do something with the error
            console.log(
                "[ChatArea] -> handleSendMessage: Error sending message",
                err
            );
        }
    };

    return (
        <Stack
            justifyContent={"flex-end"}
            flexGrow={1}
            gap={2}
            overflow={"hidden"}
        >
            <Chat
                chatMessages={
                    sideBarActiveContext === "friends"
                        ? chatMessages[activeChat.tagLine]
                        : chatMessages[activeChat.id]
                }
            />
            <Stack
                direction={"row"}
                gap={1}
                component={"form"}
                ref={formRef}
                autoComplete="off"
            >
                <TextField
                    id="chat-outlined"
                    size="small"
                    placeholder="Type your message"
                    fullWidth
                    name="message"
                    type="text"
                    autoComplete=""
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
