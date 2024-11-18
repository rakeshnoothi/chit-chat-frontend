import { Box } from "@mui/material";
import Logo from "../component/Logo";
import Drawer from "../component/Drawer";
import SideBar from "../component/SideBar";
import ChatSection from "../component/ChatSection";
import { Stack } from "@mui/material";

const Home = () => {
    return (
        <Box>
            <Logo />
            <Stack direction={"row"} spacing={2} height={"86vh"}>
                <Drawer />
                <SideBar />
                <ChatSection />
            </Stack>
        </Box>
    );
};
export default Home;
