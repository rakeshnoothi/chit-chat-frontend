import { Box, IconButton, Stack } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Heading = () => {
    return (
        <Stack direction={"row"} justifyContent={"space-between"}>
            <Box component={"h3"}>Chat</Box>
            <IconButton aria-label="delete" size="small">
                <PersonAddIcon />
            </IconButton>
        </Stack>
    );
};
export default Heading;
