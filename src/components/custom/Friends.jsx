import API from "@/API";
import {
    close,
    confirmationGreen,
    errorRed,
    lens,
} from "@/assets/svgConstants";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export function Friends(props) {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState("");

    const addFriend = useMutation({
        mutationFn: API.sendRequest,
        mutationKey: ["friendRequest", search],
        onSuccess: (data) => {
            const msg = data.msg;
            console.log(msg);
            setShowSuccess(true);
            setShowError("");
        },
        onError: (err) => {
            if (err.response.status == 401) {
                navigate("/login");
            }
            const error = err.response.data.err;
            console.log(error);
            setShowError(error);
        },
    });

    const friends = useQuery({
        queryKey: ["friends"],
        queryFn: API.getFriends,
    });
    console.log(friends.data);

    const submit = (e) => {
        e.preventDefault();
        addFriend.mutate(search);
    };

    return (
        <>
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 ">
                    <form onSubmit={submit}>
                        <label
                            htmlFor="search"
                            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                        >
                            Search
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
                                <svg
                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    {lens}
                                </svg>
                            </div>
                            <input
                                type="search"
                                id="search"
                                className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg ps-10 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Username"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                required
                            />
                            <button
                                type="submit"
                                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Send Request
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 ">
                    {console.log(friends.isSuccess)}
                    {friends.isSuccess
                        ? friends.data.map((x) => (
                              <div
                                  className="flex p-2 my-1 rounded-lg shadow-lg"
                                  key={x.id}
                              >
                                  <div className="align-middle">
                                      <div>
                                          <img
                                              src={x.profilePicture}
                                              className="h-14"
                                          />
                                      </div>
                                      <div>{x.UserAuth.username}</div>
                                  </div>
                                  
                              </div>
                          ))
                        : ""}
                </div>
            </div>
            {showSuccess ? (
                <Toast
                    text="Request Sent"
                    icon={confirmationGreen}
                    setShowError={setShowError}
                    setShowSuccess={setShowSuccess}
                />
            ) : (
                ""
            )}
            {showError ? (
                <Toast
                    text={showError}
                    icon={errorRed}
                    setShowError={setShowError}
                    setShowSuccess={setShowSuccess}
                />
            ) : (
                ""
            )}
        </>
    );
}

function Toast(props) {
    return (
        <>
            <div
                id="toast-success"
                className="fixed flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow bottom-5 right-5 dark:text-gray-400 dark:bg-gray-800"
            >
                {props.icon}
                <div className="text-sm font-normal ms-3">{props.text}</div>
                <button
                    onClick={() => {
                        props.setShowError("");
                        props.setShowSuccess(false);
                    }}
                    type="button"
                    className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                    aria-label="Close"
                >
                    <span className="sr-only">Close</span>
                    {close}
                </button>
            </div>
        </>
    );
}
