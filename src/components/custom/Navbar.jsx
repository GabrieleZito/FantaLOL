import { NavLink, Outlet } from "react-router-dom";

export function NavBar(props) {
    return (
        <>
            <header className="text-gray-400 bg-gray-900 body-font">
                <div className="container flex flex-col flex-wrap items-center max-w-full p-5 mx-auto bg-gray-900 md:flex-row">
                    <nav className="flex flex-wrap items-center text-base lg:w-2/5 md:ml-auto">
                        <a className="mr-5 cursor-pointer hover:text-white">
                            Rules
                        </a>
                        <a className="mr-5 hover:text-white">Contact Us</a>
                    </nav>
                    <NavLink
                        to="/"
                        className="flex items-center order-first mb-4 font-medium text-white lg:order-none lg:w-1/5 title-font lg:items-center lg:justify-center md:mb-0"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="w-10 h-10 p-2 text-white bg-indigo-500 rounded-full"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                        </svg>
                        <span className="ml-3 text-xl xl:block lg:hidden">
                            LOGO
                        </span>
                    </NavLink>
                    <div className="inline-flex ml-5 lg:w-2/5 lg:justify-end lg:ml-0">
                        <NavLink to="/sign-in">
                            <button className="inline-flex items-center px-3 py-1 mt-4 text-base text-white bg-red-700 border-0 rounded focus:outline-none hover:bg-gray-700 md:mt-0">
                                Sign In
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    className="w-4 h-4 ml-1"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                                </svg>
                            </button>
                        </NavLink>
                    </div>
                </div>
            </header>
            <Outlet />
        </>
    );
}
