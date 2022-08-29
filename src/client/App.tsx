import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useSearchParams } from "react-router-dom";

import Login from "@/screens/Login";
import styles from "@/styles/components/modules/App.module.scss";
import { getAccessToken } from "@/utils";
import Profile from "@/screens/Profile";

import Layout from "./components/Layout/Layout";
import Subscriptions from "./screens/Subscriptions";
import Explore from "./screens/Explore";
import Playlists from "./screens/Playlists";
import NotFound from "./screens/NotFound";

const isLoggedIn = (access: string | null, element: JSX.Element, page?: string) => {
    return access && access !== "undefined" ? element : <Login page={page} />;
};

const App = () => {
    const [accessToken, setAccessToken] = useState<string | null>("token");
    const [searchParams, _setSearchParams] = useSearchParams();

    useEffect(() => {
        setAccessToken(getAccessToken());
    }, []);

    return (
        <div className={styles.App}>
            <Layout>
                <Routes>
                    <Route path="/" element={searchParams.get("demo") === "true" ? <Profile isDemo={true} /> : isLoggedIn(accessToken, <Profile />, "profile")} />
                    <Route path="/subscriptions" element={searchParams.get("demo") === "true" ? <Subscriptions isDemo={true} /> : isLoggedIn(accessToken, <Subscriptions />, "subscriptions")} />
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/playlists" element={searchParams.get("demo") === "true" ? <Playlists isDemo={true} /> : isLoggedIn(accessToken, <Playlists />, "playlists")} />
                    <Route path="/foryou" element={<Navigate to="/" replace />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
        </div>
    );
};

export default App;
