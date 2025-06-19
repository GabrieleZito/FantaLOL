import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Howto } from "./components/Howto";
import { SignIn } from "./components/SignIn";
import { NotFound } from "./components/NotFound";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./components/Dashboard";
import { Friends } from "./components/Friends";
import { Inbox } from "./components/Inbox";
import { Leaderboards } from "./components/Leaderboard";
import { LeaderboardDetails } from "./components/LeaderboardDetails";
import { Auction } from "./components/Auction";
import { Profile } from "./components/Profile";
import { Team } from "./components/Team";
import { LEC } from "./components/LEC";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navbar />}>
                        <Route index element={<Home />} />
                        <Route path="login" element={<Login />} />
                        <Route path="howto" element={<Howto />} />
                        <Route path="signin" element={<SignIn />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                    <Route path="/dashboard" element={<Sidebar />}>
                        <Route index element={<Dashboard />} />
                        <Route path="friends" element={<Friends />} />
                        <Route path="inbox" element={<Inbox />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="leaderboards" element={<Leaderboards />} />
                        <Route path="leaderboards/:leadId" element={<LeaderboardDetails />} />
                        <Route path="leaderboards/:leadId/auction" element={<Auction  />} />
                        <Route path="leaderboards/:leadId/team" element={<Team />} />
                        <Route path="LEC" element={<LEC />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
