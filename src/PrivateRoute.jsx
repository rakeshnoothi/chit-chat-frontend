import { Navigate } from "react-router-dom";
//hooks import
import useAuthentication from "./hooks/useAuthentication";
import webSocket from "./util/webSocket";
import { useEffect } from "react";

const PrivateRoute = ({ element }) => {
    const { userAuthentication } = useAuthentication();
    useEffect(() => {
        webSocket.connect(userAuthentication.authData?.token);
        return () => {
            webSocket.disconnect();
        };
    }, [userAuthentication]);
    return (
        <>
            {userAuthentication.isAuthenticated ? (
                element
            ) : (
                <Navigate to={"/login"} replace={true} />
            )}
        </>
    );
};
export default PrivateRoute;
