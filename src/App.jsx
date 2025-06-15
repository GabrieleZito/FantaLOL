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
import { Profile } from "./components/custom/Profile";
import { Leaderboards } from "./components/custom/Leaderboards";
import { LeaderboardDetails } from "./components/custom/LeaderboardDetails";
import { LEC } from "./components/custom/LEC";

const queryClient = new QueryClient();

import socketIO from "socket.io-client";
import { Auction } from "./components/custom/Auction";
import { Team } from "./components/custom/Team";
import { Howto } from "./components/custom/Howto";
const socket = socketIO.connect(import.meta.env.VITE_API_URL);
//const socket = socketIO.connect("https://fantalol-server.onrender.com");

import { useSelector, useDispatch } from "react-redux";

function App() {
    const [user, setUser] = useState(null);

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<NavBar />}>
                            <Route index element={<Home />} />
                            <Route path="sign-in" element={<SignIn />} />
                            <Route path="reset-password" element={<PasswordReset />} />
                            <Route path="login" element={<Login />} />
                            <Route path="how-to" element={<Howto />} />
                            <Route path="*" element={<NotFound />} />
                        </Route>
                        <Route path="/dashboard" element={<Sidebar />}>
                            <Route index element={<Dashboard />} />
                            <Route path="tournaments/:tourId" element={<TournamentDetails />} />
                            <Route path="friends" element={<Friends />} />
                            <Route path="inbox" element={<Inbox />} />
                            <Route path="profile" element={<Profile />} />
                            <Route path="leaderboards" element={<Leaderboards />} />
                            <Route path="leaderboards/:leadId" element={<LeaderboardDetails socket={socket} />} />
                            <Route path="leaderboards/:leadId/auction" element={<Auction socket={socket} />} />
                            <Route path="leaderboards/:leadId/team" element={<Team />} />
                            <Route path="LEC" element={<LEC />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
                <ReactQueryDevtools />
            </QueryClientProvider>
        </>
    );
}

export default App;
