import { Stack, Typography } from "@mui/material";
import useDrawerContext from "../hooks/useDrawerContext";
import AddFriendDialog from "./AddFriendDialog";

const Heading = () => {
    const { activeDrawerContext } = useDrawerContext();

    return (
        <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography variant="h6" component="h2" textTransform={"uppercase"}>
                {activeDrawerContext}
            </Typography>
            <AddFriendDialog />
        </Stack>
    );
};
export default Heading;
