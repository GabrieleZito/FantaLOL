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
import { Sidebar } from "./components/custom/SideBar";
import { TournamentDetails } from "./components/custom/TournamentDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Friends } from "./components/custom/Friends";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Inbox } from "./components/custom/Inbox";

const queryClient = new QueryClient()

function App() {
    const [user, setUser] = useState(null);

    return (
        <>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<NavBar user={user} setUser={setUser} />} >
                        <Route index element={<Home user={user} />} />
                        <Route path="sign-in" element={<SignIn setUser={setUser} />} />
                        <Route path="reset-password" element={<PasswordReset />} />
                        <Route path="login" element={<Login setUser={setUser} />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                    <Route path="/dashboard" element={<Sidebar user={user} setUser={setUser}/>}>
                        <Route index element={<Dashboard user={user}/>} />
                        <Route path="tournaments/:tourId" element={<TournamentDetails user={user}/>} />
                        <Route path="friends" element={<Friends user={user}/>}/>
                        <Route path="inbox" element={<Inbox/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
            <ReactQueryDevtools/>
        </QueryClientProvider>
        </>
    );
}

export default App;
