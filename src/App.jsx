import { BrowserRouter, useParams } from "react-router-dom";
import "./App.css"
import { Navbar } from "./components/UI/navbar/Navbar";
import { AppRouter } from "./AppRouter";
import { AuthContext } from "./context";
import { useState } from "react";


function App() {

    const [isAuth, setIsAuth] = useState(false);
    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth }}>
            <BrowserRouter>
                <Navbar />
                <AppRouter />
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;

