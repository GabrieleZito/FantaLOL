import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { Navbar } from "./components/Navbar";

function App() {
    return (
        <>
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
        </>
    );
}

export default App;
