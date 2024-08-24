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
    const [user, setUser] = useState(null);

    return (
        <>
            <div className="">
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={<NavBar user={user} setUser={setUser} />}
                        >
                            <Route index element={<Home user={user} />} />
                            <Route
                                path="sign-in"
                                element={<SignIn setUser={setUser} />}
                            />

                            <Route
                                path="reset-password"
                                element={<PasswordReset />}
                            />
                            <Route
                                path="login"
                                element={<Login setUser={setUser} />}
                            />
                            <Route path="*" element={<NotFound />} />
                        </Route>
                        <Route
                            path="dashboard"
                            element={<Dashboard user={user} />}
                        />
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    );
}

export default App;
