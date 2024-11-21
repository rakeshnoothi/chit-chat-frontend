import ChatIcon from "@mui/icons-material/Chat";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const appButtons = {
    chat: {
        buttonId: "chat",
        buttonElement: <ChatIcon />,
        subButtons: ["friends", "channels"],
    },
    request: {
        buttonId: "request",
        buttonElement: <PersonAddIcon />,
        subButtons: ["sent", "received"],
    },
};

export default appButtons;
