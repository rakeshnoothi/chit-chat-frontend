import { Box, Stack } from "@mui/material";
import useAuthentication from "../hooks/useAuthentication";

const Logo = () => {
    const { userAuthentication } = useAuthentication();
    const loggedInUser = userAuthentication.authData.user;
    return (
        <Stack
            border={1}
            paddingInline={1}
            marginBottom={2}
            direction={"row"}
            justifyContent={"space-between"}
        >
            <Box component={"h3"}>CHIT CHAT</Box>
            <Box component={"h3"} textTransform={"capitalize"}>
                ME:
                {" " + loggedInUser.firstname + " " + loggedInUser.lastname}
            </Box>
        </Stack>
    );
};
export default Logo;
