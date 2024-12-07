import { List } from "@mui/material";
import { useEffect, useState } from "react";
import useAuthentication from "../hooks/useAuthentication";
import useSideBarActiveContext from "../hooks/useSideBarActiveContext";
import scrollableList from "../componentJs/scrollableList";
import appButtons from "../utilComponents/appButtons";
import useDrawerContext from "../hooks/useDrawerContext";

const ScrollableList = () => {
    const { userAuthentication } = useAuthentication();
    const { sideBarActiveContext } = useSideBarActiveContext();
    const { activeDrawerContext } = useDrawerContext();
    const [listData, setListData] = useState([]);
    const loggedInUserId = userAuthentication.authData.user.id;

    const handleListData = itemId => {
        const updatedListData = listData.filter(item => {
            return item.id !== itemId;
        });
        setListData(updatedListData);
    };

    useEffect(() => {
        scrollableList
            .requestInitialListData(sideBarActiveContext, loggedInUserId)
            .then(res => {
                console.log("Initial scroll list data", res);
                const data = res.data.body;

                // map the response data based on the active context.
                const mappedListData = data.map(item => {
                    return scrollableList.getMappedItem(
                        sideBarActiveContext,
                        item
                    );
                });
                setListData(mappedListData);
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
                    return appButtons[activeDrawerContext].overViewElement(
                        item,
                        item.id,
                        handleListData
                    );
                })
            ) : (
                <div>Nothing to show</div>
            )}
        </List>
    );
};
export default ScrollableList;
