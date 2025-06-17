import { NavLink, Outlet } from "react-router-dom";
import background from "@/assets/bg.png";
import logo from "@/assets/FantaLoL-Logo.png";

export function NavBar(props) {
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
                    <div>
                        <NavLink to="/how-to">
                            <div className="rounded-sm border-2 border-[#38c4d7] bg-[#21262d] px-3 py-2 font-league text-white">
                                How It Works
                            </div>
                        </NavLink>
                    </div>

                    <div className="flex flex-row gap-2">
                        <NavLink to="/login">
                            <div className="cursor-pointer rounded-sm border-2 border-[#38c4d7] bg-[#21262d] px-3 py-2 font-league text-white">
                                Log In
                            </div>
                        </NavLink>
                        <NavLink to="/sign-in">
                            <div className="cursor-pointer rounded-sm border-2 border-[#38c4d7] bg-[#21262d] px-3 py-2 font-league text-white">
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
