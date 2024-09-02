import { arrowRight } from "@/assets/svgConstants";
import { NavLink } from "react-router-dom";

export function Card(props) {
    return (
        <>
            <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <img
                    className="h-24 p-2 mx-auto my-auto rounded-t-lg"
                    src={props.img}
                    alt=""
                />

                <div className="p-5">
                    <h5 className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
                        {props.title}
                    </h5>

                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {props.text}
                    </p>
                    <NavLink
                        to={`/dashboard/tournaments/${props.id}`}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        {props.button}
                        {arrowRight}
                    </NavLink>
                </div>
            </div>
        </>
    );
}
