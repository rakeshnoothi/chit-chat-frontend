import ChatIcon from "@mui/icons-material/Chat";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ChatOverview from "../component/ChatOverview";
import RequestOverview from "../component/RequestOverview";

const appButtons = {
    chat: {
        buttonId: "chat",
        buttonElement: <ChatIcon />,
        subButtons: ["friends", "channels"],
        overViewElement: (item, key) => <ChatOverview item={item} key={key} />,
    },
    request: {
        buttonId: "request",
        buttonElement: <PersonAddIcon />,
        subButtons: ["sent", "received"],
        overViewElement: (item, key, handler) => (
            <RequestOverview item={item} key={key} handleListData={handler} />
        ),
    },
};

export default appButtons;
