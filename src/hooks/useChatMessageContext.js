import { useContext } from "react";
import { ChatMessageContext } from "../context/ChatMessageContextProvider";
import webSocket from "../util/webSocket";
import useSideBarActiveContext from "./useSideBarActiveContext";
import useAuthentication from "./useAuthentication";
import useChatContext from "./useChatContext";

const useChatMessageContext = () => {
    const { chatMessages, setChatMessages } = useContext(ChatMessageContext);
    const { activeChat } = useChatContext();
    const { userAuthentication } = useAuthentication();
    const { sideBarActiveContext } = useSideBarActiveContext();

    console.log(
        "[useChatMessageContext] -> useChatMessageContext: activeChat ",
        activeChat
    );

    const sendMessage = text => {
        if (sideBarActiveContext === "friends") {
            const message = {
                fromUser: userAuthentication.authData.user.username,
                toUser: activeChat.tagLine,
                message: text,
                isSent: true,
                id: crypto.randomUUID(),
            };

            webSocket.sendPrivateMessage(message);

            setChatMessages(previousChatMessages => {
                let newChatMessages = {};
                if (previousChatMessages[message.toUser]) {
                    newChatMessages[message.toUser] = [
                        ...previousChatMessages[message.toUser],
                        message,
                    ];
                } else {
                    newChatMessages[message.toUser] = [message];
                }
                return newChatMessages;
            });
        } else {
            const message = {
                fromUser: userAuthentication.authData.user.username,
                message: text,
                channelId: activeChat.id,
                isSent: true,
                id: crypto.randomUUID(),
            };

            webSocket.sendChannelMessage(message);
            setChatMessages(previousChatMessages => {
                let newChatMessages = {};
                if (previousChatMessages[message.channelId]) {
                    newChatMessages[message.channelId] = [
                        ...previousChatMessages[message.channelId],
                        message,
                    ];
                } else {
                    newChatMessages[message.channelId] = [message];
                }
                return newChatMessages;
            });
        }
    };

    webSocket.onMessage(res => {
        console.log("Response from websockets", res);
        const message = JSON.parse(res.body);
        if (!message) return;

        message.isSent = false;
        if (res.headers.destination === "/user/queue/private/messages") {
            // do something
            setChatMessages(previousChatMessages => {
                let newChatMessages = {};
                if (previousChatMessages[message.fromUser]) {
                    newChatMessages[message.fromUser] = [
                        ...previousChatMessages[message.fromUser],
                        message,
                    ];
                } else {
                    newChatMessages[message.fromUser] = [message];
                }
                return newChatMessages;
            });
        } else if (res.headers.destination === "/user/queue/channel/messages") {
            setChatMessages(previousChatMessages => {
                let newChatMessages = {};
                if (previousChatMessages[message.channelId]) {
                    newChatMessages[message.channelId] = [
                        ...previousChatMessages[message.channelId],
                        message,
                    ];
                } else {
                    newChatMessages[message.channelId] = [message];
                }
                return newChatMessages;
            });
        }
    });

    return { chatMessages, setChatMessages, sendMessage };
};
export default useChatMessageContext;
