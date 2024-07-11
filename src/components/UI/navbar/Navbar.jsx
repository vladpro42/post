import { Link } from "react-router-dom";
import { Button } from "../button/Button";
import { useContext } from "react";
import { AuthContext } from "../../../context";


export function Navbar() {

    const { isAuth, setIsAuth } = useContext(AuthContext)

    const logout = () => {
        setIsAuth(false)
        localStorage.removeItem("isAuth")
    }

    return <div className="navbar">
        <Button onClick={() => logout()}>Log out</Button>
        <div className="navbar__links">
            <Link to="/posts">Posts</Link>
            <Link to="/about">About</Link>
        </div>
    </div>
} 