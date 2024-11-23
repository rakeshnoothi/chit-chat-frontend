import { Navigate } from "react-router-dom";
//hooks import
import useAuthentication from "./hooks/useAuthentication";
import webSockets from "./util/webSocket";

const PrivateRoute = ({ element }) => {
    const { userAuthentication } = useAuthentication();
    webSockets.connect(userAuthentication?.authData.user.token);
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
