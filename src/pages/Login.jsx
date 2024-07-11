import { useContext } from "react";
import { Button } from "../components/UI/button/Button";
import { Input } from "../components/UI/input/Input";
import { AuthContext } from "../context";
import { useNavigate } from "react-router-dom";

export function Login() {

    const { _, setIsAuth } = useContext(AuthContext)
    const nav = useNavigate()
    function login(e) {
        e.preventDefault();
        setIsAuth(true)
        localStorage.setItem("isAuth", "true")
        nav('/posts')
    }
    return <div>
        <h1>Страница для логина</h1>
        <form onSubmit={login}>
            <Input type="text" placeholder="input login" />
            <Input type="text" placeholder="input password" />
            <Button >Enter</Button>
        </form>
    </div>
}