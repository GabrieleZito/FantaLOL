import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "./components/ui/button";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/custom/Navbar";
import { Home } from "./components/custom/Home";
import { SignIn } from "./components/custom/SignIn";
import { NotFound } from "./components/custom/NotFound";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<NavBar/>}>
                  <Route index element={<Home/>} />
                  <Route path="sign-in" element={<SignIn/>} />
                  <Route path="*" element={<NotFound/>}/>
                </Route>
              </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
