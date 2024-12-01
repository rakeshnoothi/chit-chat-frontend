import {
    Avatar,
    Divider,
    ListItemAvatar,
    ListItemText,
    Typography,
    ListItemButton,
} from "@mui/material";
import useChatContext from "../hooks/useChatContext";
import useDrawerContext from "../hooks/useDrawerContext";

const ChatOverview = ({ item }) => {
    const { setActiveChat } = useChatContext();
    const { activeDrawerContext } = useDrawerContext();
    const handleActiveChat = item => {
        if (
            !activeDrawerContext === "chat" ||
            activeDrawerContext === "request"
        )
            return;
        localStorage.setItem("lastActiveChat", JSON.stringify(item));
        setActiveChat(item);
    };
    return (
        <>
            <ListItemButton
                alignItems="flex-start"
                key={item.id}
                onClick={() => handleActiveChat(item)}
            >
                <ListItemAvatar>
                    <Avatar
                        alt={item.heading}
                        src="/static/images/avatar/1.jpg"
                    />
                </ListItemAvatar>
                <ListItemText
                    primary={`${item.heading}`}
                    secondary={
                        <Typography
                            component="span"
                            variant="body2"
                            sx={{
                                color: "text.primary",
                                display: "inline",
                            }}
                        >
                            {item.tagLine}
                        </Typography>
                    }
                />
            </ListItemButton>
            <Divider component="li" />
        </>
    );
};
export default ChatOverview;
