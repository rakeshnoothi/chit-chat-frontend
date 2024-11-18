import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    TextField,
} from "@mui/material";
import axios from "axios";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthentication from "../hooks/useAuthentication";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

/*
    TODO: 
    1. Toggle button for show or hide password
*/

const Login = () => {
    const form = useRef();
    // const [showPassword, setShowPassowrd] = useState(false);
    const { userAuthentication, setUserAuthentication } = useAuthentication();

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(show => !show);

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    const handleMouseUpPassword = event => {
        event.preventDefault();
    };

    const handleLogin = e => {
        e.preventDefault();

        axios
            .post(
                `${
                    import.meta.env.VITE_CHIT_CHAT_REST_API_BASE_URL
                }/auth/login`,
                form.current,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then(res => {
                // TODO: Do something with the response.
                const authData = res.data?.body;
                if (!authData) {
                    toast("Something went wrong!", {
                        type: "error",
                    });
                    return;
                }
                localStorage.setItem("authData", JSON.stringify(authData));
                setUserAuthentication({
                    ...userAuthentication,
                    authData: authData,
                    isAuthenticated: true,
                });
                toast("Logged In successfully", {
                    type: "success",
                });
            })
            .catch(err => {
                if (err.message === "Network Error") {
                    toast(err.message, {
                        type: "error",
                    });
                } else {
                    toast(err.response.data.message, {
                        type: "error",
                    });
                }
            });
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            bgcolor="white"
        >
            <Stack
                direction={"column"}
                padding={2}
                sx={{
                    border: 1,
                    borderColor: "black",
                    borderRadius: 2,
                }}
            >
                <Box component={"h1"} color={"black"}>
                    Login
                </Box>
                <Stack
                    component={"form"}
                    direction={"column"}
                    spacing={2}
                    ref={form}
                >
                    <TextField
                        id="outlined-required-username"
                        label="Username"
                        placeholder="Enter your username"
                        name="username"
                        autoComplete="username"
                    />
                    <FormControl sx={{ m: 1 }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">
                            Password
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? "text" : "password"}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={
                                            showPassword
                                                ? "hide the password"
                                                : "display the password"
                                        }
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                            name="password"
                            autoComplete="current-password"
                        />
                    </FormControl>
                    <Button
                        variant="contained"
                        type="submit"
                        onClick={e => handleLogin(e)}
                    >
                        Login
                    </Button>
                    <Button variant="contained">
                        <Link
                            to={"/register"}
                            style={{
                                display: "block",
                                width: "100%",
                                height: "100%",
                                textAlign: "center",
                                textDecoration: "none",
                                color: "inherit",
                            }}
                        >
                            Register New User
                        </Link>
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
};
export default Login;
