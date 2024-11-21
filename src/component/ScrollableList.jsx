import { List } from "@mui/material";
import ChatOverview from "./ChatOverview";
import { useEffect, useState } from "react";
import useAuthentication from "../hooks/useAuthentication";
import useSideBarActiveContext from "../hooks/useSideBarActiveContext";
import scrollableList from "../componentJs/scrollableList";

const ScrollableList = () => {
    const { userAuthentication } = useAuthentication();
    const { sideBarActiveContext } = useSideBarActiveContext();
    const [listData, setListData] = useState([]);
    const loggedInUserId = userAuthentication.authData.user.id;

    useEffect(() => {
        scrollableList
            .requestInitialListData(sideBarActiveContext, loggedInUserId)
            .then(res => {
                console.log(res);
                setListData(res.data.body);
            })
            .catch(err => console.log(err));
    }, [sideBarActiveContext, loggedInUserId]);

    return (
        <List
            sx={{
                width: "100%",
                height: "100%",
                bgcolor: "background.paper",
                overflow: "auto",
            }}
        >
            {listData.length >= 1 ? (
                listData.map(item => {
                    return <ChatOverview item={item} key={item.id} />;
                })
            ) : (
                <div>Nothing to show</div>
            )}
        </List>
    );
};
export default ScrollableList;
