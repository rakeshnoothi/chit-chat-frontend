import { Box } from "@mui/material";
import Logo from "../component/Logo";
import Drawer from "../component/Drawer";
import SideBar from "../component/SideBar";
import ChatSection from "../component/ChatSection";
import { Stack } from "@mui/material";
import DrawerContextProvider from "../context/DrawerContextProvider";
import SideBarContextProvider from "../context/SideBarContextProvider";

const Home = () => {
    return (
        <Box>
            <Logo />
            <Stack direction={"row"} spacing={2} height={"86vh"}>
                <DrawerContextProvider>
                    <SideBarContextProvider>
                        <Drawer />
                        <SideBar />
                        <ChatSection />
                    </SideBarContextProvider>
                </DrawerContextProvider>
            </Stack>
        </Box>
    );
};
export default Home;
