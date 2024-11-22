import { IconButton, Stack } from "@mui/material";
import useDrawerContext from "../hooks/useDrawerContext";
import appButtons from "../utilComponents/appButtons";
import useSideBarActiveContext from "../hooks/useSideBarActiveContext";

const Drawer = () => {
    const { activeDrawerContext, setActiveDrawerContext } = useDrawerContext();
    const { setSideBarActiveContext } = useSideBarActiveContext();

    console.log("Active drawer context: ", activeDrawerContext);

    const handleButtonClick = buttonId => {
        setActiveDrawerContext(buttonId);
        setSideBarActiveContext(appButtons[buttonId].subButtons[0]);
    };

    return (
        <Stack
            direction={"column"}
            width={65}
            paddingBlock={1}
            spacing={2}
            border={1}
        >
            {Object.keys(appButtons).map(button => {
                const currentButton = appButtons[button];
                return (
                    <IconButton
                        size="small"
                        onClick={() =>
                            handleButtonClick(currentButton.buttonId)
                        }
                        key={currentButton.buttonId}
                        color={
                            activeDrawerContext === currentButton.buttonId
                                ? "primary"
                                : "default"
                        }
                    >
                        {currentButton.buttonElement}
                    </IconButton>
                );
            })}
        </Stack>
    );
};
export default Drawer;
