import { Box, Button, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import toastUtil from "../util/toastUtil";

const Register = () => {
    const form = useRef();
    const navigate = useNavigate();

    const handleNewUserRegistration = e => {
        e.preventDefault();

        axios
            .post(
                `${
                    import.meta.env.VITE_CHIT_CHAT_REST_API_BASE_URL
                }/auth/register`,
                form.current,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then(res => {
                toastUtil.getSuccessToast(res.data.message);
                navigate("/login");
            })
            .catch(err => {
                err.message === "Network Error"
                    ? toastUtil.getErrorToast(err.message)
                    : toastUtil.getErrorToast(err.response.data.message);
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
                    Register
                </Box>
                <Stack
                    component={"form"}
                    direction={"column"}
                    spacing={2}
                    ref={form}
                >
                    <TextField
                        id="outlined-required-first-name"
                        label="First Name"
                        placeholder="Enter your First Name"
                        name="firstname"
                    />
                    <TextField
                        id="outlined-required-last-name"
                        label="Last Name"
                        placeholder="Enter your Last Name"
                        name="lastname"
                    />
                    <TextField
                        id="outlined-required-username"
                        label="Username"
                        placeholder="Enter your username"
                        name="username"
                    />
                    <TextField
                        id="outlined-required-email"
                        label="Email"
                        placeholder="Enter your email"
                        name="email"
                    />
                    <TextField
                        id="outlined-required-password"
                        label="Password"
                        placeholder="Enter your new password"
                        name="password"
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        onClick={e => handleNewUserRegistration(e)}
                    >
                        Register
                    </Button>
                    <Button variant="contained">
                        <Link
                            to={"/login"}
                            style={{
                                display: "block",
                                width: "100%",
                                height: "100%",
                                textAlign: "center",
                                textDecoration: "none",
                                color: "inherit",
                            }}
                        >
                            Login
                        </Link>
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
};
export default Register;
