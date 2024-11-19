import { Stack, TextField } from "@mui/material";
import Heading from "./Heading";
import { SideBarNav } from "./SideBarNav";
import ScrollableList from "./ScrollableList";

const SideBar = () => {
    return (
        <Stack border={1} padding={1} spacing={2}>
            <Heading />
            <TextField
                id="outlined-size-small"
                size="small"
                placeholder="Search"
            />
            <SideBarNav />
            <ScrollableList />
        </Stack>
    );
};
export default SideBar;
