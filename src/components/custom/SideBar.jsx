import {
    dashboard,
    inbox,
    kanban,
    products,
    signIn,
    signUp,
    users,
    hamburgerMenu,
    leaderboard,
} from "@/assets/svgConstants";
import profileIcon from "@/assets/profileIcon.png";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import API from "@/API";
import {ChartNoAxesCombined, Gauge} from "lucide-react"
import { useEffect, useState } from "react";

export function Sidebar(props) {
    const navigate = useNavigate();
    const [notifs, setNotifs] = useState(0);

    const logoutRequest = useMutation({
        mutationFn: API.logout,
        mutationKey: ["logout"],
        onSuccess: () => {
            props.setUser(null);
            navigate("/");
        },
        onError: () => {
            alert("Oops something went wrong");
        },
    });

    const getnotifications = useQuery({
        queryKey: ["notifications"],
        queryFn: API.checkNotifications,
        refetchInterval: 5000,
    });

    const logout = () => {
        logoutRequest.mutate();
    };
    
    if (props.user) {
        return (
            <>
                <button
                    data-drawer-target="logo-sidebar"
                    data-drawer-toggle="logo-sidebar"
                    aria-controls="logo-sidebar"
                    type="button"
                    className="inline-flex items-center p-2 mt-2 text-sm text-gray-500 rounded-lg ms-3 sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                >
                    <span className="sr-only">Open sidebar</span>
                    {hamburgerMenu}
                </button>
                <aside
                    id="logo-sidebar"
                    className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                    aria-label="Sidebar"
                >
                    <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                        <div className="flex items-center gap-4 p-2">
                            <Link to="/dashboard/profile">
                            <img
                                className="w-10 h-10 rounded-full"
                                src={profileIcon}
                                alt=""
                            />
                            </Link>
                            <div className="font-medium dark:text-white">
                                <div>{props.user.username}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    Joined in August 2014
                                </div>
                            </div>
                        </div>

                        <ul className="space-y-2 font-medium">
                            <MenuItem
                                text="Dashboard"
                                icon={dashboard}
                                link="/dashboard"
                            />
                            <MenuItem
                                text="Leaderboards"
                                icon={leaderboard}
                                type="info"
                                link="/dashboard/leaderboards"
                            />
                            <MenuItem
                                text="Inbox"
                                icon={inbox}
                                pill={getnotifications.data}
                                link="/dashboard/inbox"
                            />
                            <MenuItem
                                text="Friends"
                                icon={users}
                                link="/dashboard/friends"
                            />
                            <MenuItem text="Products" icon={products} />

                            <li>
                                <NavLink
                                    onClick={logout}
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    {signIn}
                                    <span className="flex-1 ms-3 whitespace-nowrap">
                                        Log Out
                                    </span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </aside>
                <Outlet />
            </>
        );
    } else {
        return (
            <div className="container flex flex-col items-center justify-center h-screen">
                You must be logged in to access this page
                <NavLink to="/login">
                    <Button>Log in</Button>
                </NavLink>
            </div>
        );
    }
}

function MenuItem(props) {
    let type = "";

    switch (props.type) {
        case "info":
            type =
                "inline-flex items-center justify-center px-2 text-sm font-medium text-blue-800 bg-blue-100 rounded-full ms-3 dark:bg-blue-900 dark:text-blue-300";
            break;
        case "secondary":
            type =
                "inline-flex items-center justify-center px-2 text-sm font-medium text-gray-800 bg-gray-100 rounded-full ms-3 dark:bg-gray-700 dark:text-gray-300";
            break;
        default:
            type =
                "inline-flex items-center justify-center px-2 text-sm font-medium text-gray-800 bg-gray-100 rounded-full ms-3 dark:bg-gray-700 dark:text-gray-300";
            break;
    }

    return (
        <>
            <li>
                <NavLink
                    to={props.link}
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                    {props.icon}
                    <span className="flex-1 ms-3 whitespace-nowrap">
                        {props.text}
                    </span>
                    {props.pill ? (
                        <span className={type}>{props.pill}</span>
                    ) : (
                        ""
                    )}
                </NavLink>
            </li>
        </>
    );
}
