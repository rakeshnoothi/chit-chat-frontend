import { Navigate } from "react-router-dom";
//hooks import
import useAuthentication from "./hooks/useAuthentication";
import webSockets from "./util/webSocket";
import { useEffect } from "react";

const PrivateRoute = ({ element }) => {
    const { userAuthentication } = useAuthentication();
    useEffect(() => {
        webSockets.connect(userAuthentication.authData?.token);
        return () => {
            webSockets.disconnect();
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
