import { Button, Stack } from "@mui/material";
import useSideBarActiveContext from "../hooks/useSideBarActiveContext";
import useDrawerContext from "../hooks/useDrawerContext";
import appButtons from "../utilComponents/appButtons";

export const SideBarNav = () => {
    const { sideBarActiveContext, setSideBarActiveContext } =
        useSideBarActiveContext();
    const { activeDrawerContext } = useDrawerContext();

    console.log("side bar active context: ", sideBarActiveContext);

    const handleButtonClick = buttonId => {
        setSideBarActiveContext(buttonId);
    };

    return (
        <Stack direction={"row"} justifyContent={"space-between"}>
            {appButtons[activeDrawerContext].subButtons.map(button => {
                return (
                    <Button
                        variant={
                            sideBarActiveContext === button
                                ? "contained"
                                : "outlined"
                        }
                        onClick={() => handleButtonClick(button)}
                        key={button}
                    >
                        {button}
                    </Button>
                );
            })}
        </Stack>
    );
};
