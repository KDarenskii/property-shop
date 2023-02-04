import React from "react";
import Router from "./Router";
import PageLoader from "./PageLoader";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { checkAuth } from "../store/user/thunks/checkAuth";

const App: React.FC = () => {
    
    const [isAppLoading, setIsAppLoading] = React.useState(true);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(checkAuth()).finally(() => setIsAppLoading(false));
    }, [dispatch]);

    return <>{isAppLoading ? <PageLoader /> : <Router />}</>;
};

export default App;
