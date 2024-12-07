import { Client } from "@stomp/stompjs";

const PRIVATE_MESSAGE_SENDING_URL = "/app/private/message";
const PRIVATE_MESSAGE_RECEIVING_URL = "/user/queue/private/messages";
const CHANNEL_MESSAGE_SENDING_URL = "/app/channel/message";
const CHANNEL_MESSAGE_RECEIVING_URL = "/user/queue/channel/messages";

const client = new Client({
    brokerURL: import.meta.env.VITE_CHIT_CHAT_WEBSOCKET_BASE_URL,

    debug: function (str) {
        console.log(str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
});

client.onStompError = function (frame) {
    // Will be invoked in case of error encountered at Broker
    // Bad login/passcode typically will cause an error
    // Complaint brokers will set `message` header with a brief message. Body may contain details.
    // Compliant brokers will terminate the connection after any error
    console.log("Broker reported error: " + frame.headers["message"]);
    console.log("Additional details: " + frame.body);
};

const webSocket = {
    connect: token => {
        client.connectHeaders = {
            Authorization: `Bearer ${token}`,
        };
        client.activate();
        console.log("[webSocket] -> connect: socket connection opened");
    },
    disconnect: () => {
        client.deactivate();
        console.log("[webSocket] -> disconnect: socket connection closed");
    },
    sendPrivateMessage: message => {
        client.publish({
            destination: PRIVATE_MESSAGE_SENDING_URL,
            body: JSON.stringify(message),
            skipContentLengthHeader: true,
        });
    },
    sendChannelMessage: message => {
        client.publish({
            destination: CHANNEL_MESSAGE_SENDING_URL,
            body: JSON.stringify(message),
            skipContentLengthHeader: true,
        });
    },
    onMessage: callback => {
        client.onConnect = function (frame) {
            console.log("webSockets connected: ", frame);
            client.subscribe(PRIVATE_MESSAGE_RECEIVING_URL, res => {
                console.log(
                    "[webSocket] -> onMessage: Response from " +
                        PRIVATE_MESSAGE_RECEIVING_URL +
                        " subscription"
                );
                callback(res);
            });

            client.subscribe(CHANNEL_MESSAGE_RECEIVING_URL, res => {
                console.log(
                    "[webSocket] -> onMessage: Response from " +
                        CHANNEL_MESSAGE_RECEIVING_URL +
                        " subscription"
                );
                callback(res);
            });
        };
    },
};

export default webSocket;
