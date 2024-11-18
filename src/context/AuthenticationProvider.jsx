import { createContext, useState } from "react";

export const AuthenticationContext = createContext(null);

const AuthenticationProvider = ({ children }) => {
    const [userAuthentication, setUserAuthentication] = useState({
        authData: null,
        isAuthenticated: false,
    });

    if (!userAuthentication.isAuthenticated) {
        const authData = JSON.parse(localStorage.getItem("authData"));
        if (authData) {
            setUserAuthentication({
                ...userAuthentication,
                authData: authData,
                isAuthenticated: true,
            });
        }
    }

    return (
        <AuthenticationContext.Provider
            value={{ userAuthentication, setUserAuthentication }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
};
export default AuthenticationProvider;
