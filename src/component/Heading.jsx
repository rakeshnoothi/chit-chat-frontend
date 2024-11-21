import { IconButton, Stack, Typography } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import useDrawerContext from "../hooks/useDrawerContext";

const Heading = () => {
    const { activeDrawerContext } = useDrawerContext();

    return (
        <Stack direction={"row"} justifyContent={"space-between"}>
            <Typography variant="h6" component="h2" textTransform={"uppercase"}>
                {activeDrawerContext}
            </Typography>
            <IconButton aria-label="delete" size="small">
                <PersonAddIcon />
            </IconButton>
        </Stack>
    );
};
export default Heading;
