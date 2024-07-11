import { Navigate, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./router";
import { useContext } from "react";
import { AuthContext } from "./context";
import { Loader } from "./components/UI/loader/Loader";


export function AppRouter() {

    const { isAuth, setIsAuth, isLoading } = useContext(AuthContext)


    if (isLoading) {
        return <Loader />
    }

    return <div>
        {isAuth ? <Routes>
            {privateRoutes.map(route => <Route
                key={route.path}
                path={route.path}
                element={route.element}
            />)}
            <Route path="/*" element={<Navigate to={"/posts"} />} />
        </Routes> : <Routes>
            {publicRoutes.map(route => <Route
                key={route.path}
                path={route.path}
                element={route.element}
            />)}
            <Route path="/*" element={<Navigate to={"/login"} />} />
        </Routes>}
    </div>

}