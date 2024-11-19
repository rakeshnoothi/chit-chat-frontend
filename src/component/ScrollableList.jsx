import { List } from "@mui/material";
import ChatOverview from "./ChatOverview";

const ScrollableList = () => {
    return (
        <List
            sx={{
                width: "100%",
                height: "100%",
                bgcolor: "background.paper",
                overflow: "auto",
            }}
        >
            <ChatOverview />
        </List>
    );
};
export default ScrollableList;
