import { Stack, Typography } from "@mui/material";

const Message = ({ isSent }) => {
    return (
        <Typography
            fontSize={"small"}
            alignSelf={isSent ? "flex-end" : "flex-start"}
            border={1}
            padding={1}
            borderRadius={3}
        >
            Message
        </Typography>
    );
};

const Chat = () => {
    return (
        <Stack
            flexDirection={"column-reverse"}
            gap={2}
            overflow={"scroll"}
            flexGrow={1}
            border={1}
        >
            <Message isSent={true} />
        </Stack>
    );
};
export default Chat;
