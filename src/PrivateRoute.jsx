import { Navigate } from "react-router-dom";
//hooks import
import useAuthentication from "./hooks/useAuthentication";

const PrivateRoute = ({ element }) => {
    const { userAuthentication } = useAuthentication();
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
