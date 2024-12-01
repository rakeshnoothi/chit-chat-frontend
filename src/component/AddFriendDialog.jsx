import { useState } from "react";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { blue } from "@mui/material/colors";
import { TextField, Typography } from "@mui/material";
import axiosInstance from "../util/axiosInterceptor";
import useAuthentication from "../hooks/useAuthentication";
import { toast } from "react-toastify";

function SimpleDialog(props) {
    const { userAuthentication } = useAuthentication();
    const [addFriendList, setAddFriendList] = useState([]);
    const { open, onClose } = props;
    let delay = null;

    const handleClose = () => {
        onClose("");
    };

    const handleSearchOnchange = e => {
        const inputValue = e.target.value;
        if (delay) {
            clearTimeout(delay);
        }
        delay = setTimeout(() => {
            // call to the database to find the user with the provided username
            axiosInstance
                .get(`/user/username/${inputValue}`)
                .then(res => {
                    console.log("Friends response: ", res);
                    const data = res.data.body;
                    setAddFriendList([data]);
                })
                .catch(err => {
                    console.log("Friends error: ", err);
                    setAddFriendList([]);
                });
        }, 1000);
    };

    const handleAddFriendButtonClick = username => {
        axiosInstance
            .post(`/friend-request/request`, null, {
                params: {
                    senderId: userAuthentication.authData.user.id,
                    receiverUsername: username,
                },
            })
            .then(res => {
                console.log("Friends response: ", res);
                toast("Friend request sent successfully");
            })
            .catch(err => {
                console.log("Friends error: ", err);
            });
    };
    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Add Friend</DialogTitle>
            <TextField
                id="outlined-size-small"
                size="small"
                placeholder="Search"
                onChange={e => handleSearchOnchange(e)}
            />
            <List sx={{ pt: 0, paddingInline: 2 }}>
                {addFriendList.length >= 1 ? (
                    addFriendList.map(user => (
                        <ListItem disableGutters key={user.id}>
                            <ListItemAvatar>
                                <Avatar
                                    sx={{
                                        bgcolor: blue[100],
                                        color: blue[600],
                                    }}
                                >
                                    <PersonIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                sx={{ mr: 4 }}
                                primary={user.firstname + user.lastname}
                                secondary={
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        sx={{
                                            color: "text.primary",
                                            display: "inline",
                                        }}
                                    >
                                        {user.username}
                                    </Typography>
                                }
                            />
                            <Button
                                variant="outlined"
                                onClick={() =>
                                    handleAddFriendButtonClick(user.username)
                                }
                            >
                                <AddIcon />
                            </Button>
                        </ListItem>
                    ))
                ) : (
                    <div>User with the provided username does not exist</div>
                )}
            </List>
        </Dialog>
    );
}

export default function AddFriendDialog() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                <PersonAddIcon />
            </Button>
            <SimpleDialog open={open} onClose={handleClose} />
        </div>
    );
}
