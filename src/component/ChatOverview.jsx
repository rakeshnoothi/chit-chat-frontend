import {
    Avatar,
    Divider,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
    ListItemButton,
} from "@mui/material";

const ChatOverview = ({ item }) => {
    return (
        <>
            <ListItem alignItems="flex-start" key={item.id}>
                <ListItemButton>
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
            </ListItem>
            <Divider variant="inset" component="li" />
        </>
    );
};
export default ChatOverview;
