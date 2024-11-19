import { IconButton, Stack } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import useDrawerContext from "../hooks/useDrawerContext";

const Drawer = () => {
    const { drawerContext, setDrawerContext } = useDrawerContext();

    console.log("Drawer context: ", drawerContext);

    const handleButtonClick = value => {
        const newDrawerContext = drawerContext.map(button => {
            if (button.buttonName === value) {
                return { ...button, isActive: true };
            } else {
                return { ...button, isActive: false };
            }
        });

        setDrawerContext(newDrawerContext);
    };

    return (
        <Stack
            direction={"column"}
            width={65}
            paddingBlock={1}
            spacing={2}
            border={1}
        >
            <IconButton
                aria-label="delete"
                size="small"
                onClick={() => handleButtonClick("chat")}
            >
                <ChatIcon />
            </IconButton>
            <IconButton
                aria-label="delete"
                size="small"
                onClick={() => handleButtonClick("friendRequest")}
            >
                <PersonAddIcon />
            </IconButton>
        </Stack>
    );
};
export default Drawer;
