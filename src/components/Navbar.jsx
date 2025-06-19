import { NavLink, Outlet } from "react-router-dom";
import background from "../assets/bg.png";
import logo from "../assets/FantaLoL-Logo.png";

export function Navbar() {
    return (
        <>
            <header>
                <nav
                    className="flex items-center justify-between px-10 py-3"
                    style={{
                        backgroundImage: `url(${background})`,
                    }}
                >
                    <div>
                        <NavLink to="/">
                            <img src={logo} className="w-20" />
                        </NavLink>
                    </div>
                    <div className="items-center justify-center">
                        <NavLink to="/howto">
                            <div className="font-league rounded-sm border-2 border-[#38c4d7] bg-[#21262d] px-3 py-2 text-white">How It Works</div>
                        </NavLink>
                    </div>

                    <div className="flex flex-row items-center gap-2">
                        <NavLink to="/login">
                            <div className="font-league cursor-pointer items-center rounded-sm border-2 border-[#38c4d7] bg-[#21262d] px-3 py-2 text-white">
                                Log In
                            </div>
                        </NavLink>
                        <NavLink to="/signin">
                            <div className="font-league cursor-pointer rounded-sm border-2 border-[#38c4d7] bg-[#21262d] px-3 py-2 text-white">
                                Sign Up
                            </div>
                        </NavLink>
                    </div>
                </nav>
            </header>
            <div className="">
                <Outlet />
            </div>
        </>
    );
}
