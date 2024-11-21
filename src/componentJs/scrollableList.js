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

const scrollableList = {
    requestInitialListData,
};

export default scrollableList;
