import { Box } from "@mui/material";
import Logo from "../component/Logo";
import Drawer from "../component/Drawer";
import SideBar from "../component/SideBar";
import ChatSection from "../component/ChatSection";
import { Stack } from "@mui/material";
import DrawerContextProvider from "../context/DrawerContextProvider";
import SideBarContextProvider from "../context/SideBarContextProvider";
import ChatContextProvider from "../context/ChatContextProvider";
import ChatMessageContextProvider from "../context/ChatMessageContextProvider";

const Home = () => {
    return (
        <Box>
            <Logo />
            <Stack direction={"row"} spacing={2} height={"86vh"}>
                <DrawerContextProvider>
                    <SideBarContextProvider>
                        <Drawer />
                        <ChatContextProvider>
                            <SideBar />
                            <ChatMessageContextProvider>
                                <ChatSection />
                            </ChatMessageContextProvider>
                        </ChatContextProvider>
                    </SideBarContextProvider>
                </DrawerContextProvider>
            </Stack>
        </Box>
    );
};
export default Home;
