import { Client } from "@stomp/stompjs";

const authData = JSON.parse(localStorage.getItem("authData"));

const client = new Client({
    brokerURL: "ws://localhost:8080/ws",
    connectHeaders: {
        Authorization: `Bearer ${authData?.token}`,
    },
    debug: function (str) {
        console.log(str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
});

const webSockets = {
    connect: () => client.activate(),
    sendMessage: function (message) {
        client.publish({
            destination: "/app/private/message",
            body: JSON.stringify(message),
            skipContentLengthHeader: true,
        });
    },
    onMessage: callback => {
        callback();
    },
};

client.onConnect = function (frame) {
    // Do something, all subscribes must be done is this callback
    // This is needed because this will be executed after a (re)connect
    console.log("webSockets connected: ", frame);
    client.subscribe("/user/queue/private/messages", res => {
        const message = JSON.parse(res.body);
        if (message) {
            // do furthur operations.
        }
        console.log("message from other side: ", message);
    });
};

client.onStompError = function (frame) {
    // Will be invoked in case of error encountered at Broker
    // Bad login/passcode typically will cause an error
    // Complaint brokers will set `message` header with a brief message. Body may contain details.
    // Compliant brokers will terminate the connection after any error
    console.log("Broker reported error: " + frame.headers["message"]);
    console.log("Additional details: " + frame.body);
};

export default webSockets;
