import { Navigate, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./router";
import { useContext } from "react";
import { AuthContext } from "./context";


export function AppRouter() {

    const { isAuth, setIsAuth } = useContext(AuthContext)

    return <div>
        {isAuth ? <Routes>
            {privateRoutes.map(route => <Route
                key={route.path}
                path={route.path}
                element={route.element}
            />)}
            <Route path="/" element={<Navigate to={"/posts"} />} />
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