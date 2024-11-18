import { IconButton, Stack } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Drawer = () => {
    return (
        <Stack
            direction={"column"}
            width={65}
            paddingBlock={1}
            spacing={2}
            border={1}
        >
            <IconButton aria-label="delete" size="small">
                <ChatIcon />
            </IconButton>
            <IconButton aria-label="delete" size="small">
                <PersonAddIcon />
            </IconButton>
        </Stack>
    );
};
export default Drawer;
