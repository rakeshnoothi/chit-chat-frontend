import axiosInstance from "../util/axiosInterceptor";

const baseURL = import.meta.env.VITE_CHIT_CHAT_REST_API_BASE_URL;

const initialRequestMapping = {
    friends: `${baseURL}/user/friends/`,
    channels: `${baseURL}/user/channels/`,
    sent: `${baseURL}/friend-request/sent/`,
    received: `${baseURL}/friend-request/received/`,
};

const requestInitialListData = (activeContext, userId) => {
    return axiosInstance.get(
        `${initialRequestMapping[activeContext]}${userId}`
    );
};

const getMappedItem = (activeContext, item) => {
    const mappedObject = {
        heading: null,
        tagLine: null,
        id: null,
    };

    switch (activeContext) {
        case "friends": {
            mappedObject.heading = item.firstname + " " + item.lastname;
            mappedObject.tagLine = item.username;
            mappedObject.id = item.id;
            break;
        }
        case "channels": {
            // mappedObject.heading = item.firstname + " " + item.lastname;
            // mappedObject.tagLine = item.username;
            // mappedObject.id = item.id;
            // return;

            // do this later
            break;
        }

        case "sent": {
            mappedObject.heading =
                item.user.firstname + " " + item.user.lastname;
            mappedObject.tagLine = item.user.username;
            mappedObject.id = item.id;
            break;
        }

        case "received": {
            console.log("This ran switch" + activeContext);
            mappedObject.heading =
                item.user.firstname + " " + item.user.lastname;
            mappedObject.tagLine = item.user.username;
            mappedObject.id = item.id;
            break;
        }
    }
    return mappedObject;
};

const scrollableList = {
    requestInitialListData,
    getMappedItem,
};

export default scrollableList;
