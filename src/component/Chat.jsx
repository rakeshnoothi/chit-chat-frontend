import { Stack, Typography } from "@mui/material";
import useChatContext from "../hooks/useChatContext";

const Message = ({ message }) => {
    return (
        <Typography
            fontSize={"small"}
            alignSelf={message.isSent ? "flex-end" : "flex-start"}
            border={1}
            padding={1}
            borderRadius={3}
        >
            {message.message}
        </Typography>
    );
};

const Chat = ({ chatMessages }) => {
    const { activeChat } = useChatContext();
    console.log("activeChat: ", activeChat);
    if (!chatMessages) return <div></div>;
    return (
        <Stack
            justifyContent={"flex-end"}
            gap={2}
            overflow={"scroll"}
            flexGrow={1}
            border={1}
        >
            {chatMessages.map(message => {
                return <Message message={message} key={message.message} />;
            })}
        </Stack>
    );
};
export default Chat;
