import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/custom/Navbar";
import { Home } from "./components/custom/Home";
import { SignIn } from "./components/custom/SignIn";
import { NotFound } from "./components/custom/NotFound";
import { Dashboard } from "./components/custom/Dashboard";
import { PasswordReset } from "./components/custom/PasswordReset";
import { Login } from "./components/custom/Login";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <div className="">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<NavBar />}>
                            <Route index element={<Home />} />
                            <Route path="sign-in" element={<SignIn />} />
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route
                                path="reset-password"
                                element={<PasswordReset />}
                            />
                            <Route path="login" element={<Login/>} />
                            <Route path="*" element={<NotFound />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    );
}

export default App;
