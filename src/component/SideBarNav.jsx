import { Button, Stack } from "@mui/material";
import useSideBarActiveContext from "../hooks/useSideBarActiveContext";
import useDrawerContext from "../hooks/useDrawerContext";
import sideBarNavJs from "../componentJs/sideBarNavJs";

const SideBarButtonsRenderer = ({ buttons, handler }) => {
    return buttons.map(button => {
        return (
            <Button
                variant="outlined"
                onClick={() => handler(button.buttonName)}
                key={button.buttonName}
            >
                {button.buttonName}
            </Button>
        );
    });
};

export const SideBarNav = () => {
    const { sideBarContext, setSideBarContext } = useSideBarActiveContext();
    const { drawerContext } = useDrawerContext();

    const drawerActiveButtonName = drawerContext.find(button => {
        return button.isActive === true;
    }).buttonName;

    console.log("Active context: ", sideBarContext);

    const handleButtonClick = clickedButtonName => {
        console.log("Active button: ", drawerActiveButtonName);
        const newActiveContext = sideBarNavJs.createNewSideBarContext(
            drawerActiveButtonName,
            sideBarContext,
            clickedButtonName
        );
        setSideBarContext(newActiveContext);
    };

    return (
        <Stack direction={"row"} justifyContent={"space-between"}>
            <SideBarButtonsRenderer
                buttons={sideBarContext[drawerActiveButtonName]}
                handler={handleButtonClick}
            />
        </Stack>
    );
};
