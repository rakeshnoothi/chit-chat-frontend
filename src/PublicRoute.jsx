import { Navigate } from "react-router-dom";
import useAuthentication from "./hooks/useAuthentication";

const PublicRoute = ({ element }) => {
    const { userAuthentication } = useAuthentication();
    return (
        <>
            {userAuthentication.isAuthenticated ? (
                <Navigate to={"/"} />
            ) : (
                element
            )}
        </>
    );
};
export default PublicRoute;
