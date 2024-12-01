import {
    Avatar,
    Divider,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Stack,
    Typography,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import axiosInstance from "../util/axiosInterceptor";
import { toast } from "react-toastify";
import useSideBarActiveContext from "../hooks/useSideBarActiveContext";

const RequestOverview = ({ item, handleListData }) => {
    const { sideBarActiveContext } = useSideBarActiveContext();

    const handleRequest = (id, action) => {
        axiosInstance
            .post("/friend-request/action", null, {
                params: {
                    requestId: id,
                    type: action,
                },
            })
            .then(res => {
                console.log("Friend request action response: ", res);
                const message = res.data.message;
                toast(message);
                handleListData(item.id);
            })
            .catch(err => console.log("Friend request action err: ", err));
    };

    return (
        <Stack direction={"row"}>
            <ListItem alignItems="flex-start" key={item.id}>
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
            </ListItem>
            <Stack direction="row" gap={2}>
                {sideBarActiveContext === "received" ? (
                    <IconButton
                        variant="outlined"
                        onClick={() => handleRequest(item.id, "accept")}
                    >
                        <DoneIcon />
                    </IconButton>
                ) : (
                    false
                )}
                <IconButton
                    variant="outlined"
                    onClick={() => handleRequest(item.id, "reject")}
                >
                    <CloseIcon />
                </IconButton>
            </Stack>
            <Divider component="li" />
        </Stack>
    );
};
export default RequestOverview;
