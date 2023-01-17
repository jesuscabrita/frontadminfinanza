import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { backend_fetcher } from "../../lib/fetcher";
import { SWRConfig } from "swr";

export const AuthenticatedApp = ({ children }) => {
    const [token, setToken] = useState("");
    const { getAccessTokenSilently } = useAuth0();
    useEffect(() => {
        console.log("Fetching token");
        getAccessTokenSilently().then((mytoken) => {
            console.log("We have a token", mytoken);
            setToken(mytoken);
        });
    }, []);

    return (
        <SWRConfig value={{ fetcher: backend_fetcher(token) }}>
            {children}
        </SWRConfig>
    );
};
