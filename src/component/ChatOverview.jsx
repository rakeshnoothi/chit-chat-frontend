import {
    Avatar,
    Divider,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from "@mui/material";

const ChatOverview = ({ item }) => {
    console.log("List data: ", item);
    return (
        <>
            <ListItem alignItems="flex-start" key={item.id}>
                <ListItemAvatar>
                    <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                    />
                </ListItemAvatar>
                <ListItemText
                    primary={`${item.firstname} ${item.lastname}`}
                    secondary={
                        <Typography
                            component="span"
                            variant="body2"
                            sx={{
                                color: "text.primary",
                                display: "inline",
                            }}
                        >
                            {item.username}
                        </Typography>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </>
    );
};
export default ChatOverview;
