import API from "@/API";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import background from "@/assets/placeholder.png";
import { Timer } from "./Timer";
import coin from "@/assets/coin.png";
import Jungle from "@/assets/jungle.png";
import Mid from "@/assets/mid.png";
import Top from "@/assets/top.png";
import Bot from "@/assets/bot.png";
import Support from "@/assets/sup.png";
import { Separator } from "@/components/ui/separator";
import { confirmationGreen, errorRed, close } from "@/assets/svgConstants";

import countries from "@/assets/misc/countries.json";

export function Auction(props) {
    const { leadId } = useParams();
    const socket = props.socket;
    const [users, setUsers] = useState([]);
    const [player, setPlayer] = useState(null);
    const [resetTimer, setResetTimer] = useState(false);
    const [bids, setBids] = useState([]);
    const [bid, setBid] = useState("");
    const [timeLeft, setTimeLeft] = useState(null);
    const queryClient = useQueryClient();
    const [team, setTeam] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState("");

    //TODO togliere info di troppo
    const info = useQuery({
        queryFn: () => API.getInfoLead(leadId),
        queryKey: ["infoLead"],
    });

    useEffect(() => {
        socket.emit("joinAsta", { leadId: parseInt(leadId), userId: props.user.id, username: props.user.username }, (users) => {
            setUsers(users);
            socket.emit("checkAuctions", parseInt(leadId));
        });

        return () => {
            socket.emit("leaveAsta", { leadId: parseInt(leadId), userId: props.user.id });
        };
    }, []);

    useEffect(() => {
        socket.on("userJoined", (user) => {
            //console.log(user);
            setUsers((users) => {
                // Controlla se l'utente è già presente
                if (users.find((u) => u.userId === user.userId)) {
                    return users;
                }
                return [...users, user];
            });
        });

        socket.on("userLeft", (userId) => {
            setUsers((users) => users.filter((u) => u.userId != userId));
        });

        socket.on("newPlayer", (newPlayer) => {
            console.log(newPlayer);
            if (newPlayer && (player == null || player.id != newPlayer.id)) {
                //console.log(newPlayer);
                queryClient.invalidateQueries({ queryKey: ["infoLead"] });
                setPlayer(newPlayer.Player);
                setBids(newPlayer.bids);
            }
        });

        socket.on("newBid", (bids) => {
            console.log(bids);
            setBids(bids);
        });

        socket.on("endedAsta", (winner) => {
            console.log(winner);
        });

        socket.on("timer:start", ({ remainingTime }) => {
            console.log("timer start");
            setTimeLeft(remainingTime);
        });

        socket.on("timer:end", (data) => {
            console.log("timer end");
            console.log(data);
            //TODO forse non c'è bisogno del controllo e lo chiede sempre
            if (data.winner == props.user.id) {
                socket.emit("getTeam", parseInt(leadId));
            }
            setPlayer(null);
            setTimeLeft(0);
        });

        socket.on("timer:sync", (remainingTime) => {
            console.log("timer sync");
            console.log(remainingTime);
            setTimeLeft(remainingTime);
        });

        socket.on("team", (team) => {
            console.log(team);
            setTeam(team.Team.Players);
        });

        socket.on("prova", (data) => {
            console.log(data);
        });
    }, [socket]);

    const nextPlayer = () => {
        socket.emit("nextPlayer", parseInt(leadId));
    };

    //TODO separare i casi e fare notifiche sistemate
    //TODO deve rimanere 1 credito per ogni giocatore mancante
    const sendBid = () => {
        socket.emit("bid", parseInt(leadId), bid, (message) => {
            setShowSuccess(message.success);
            setShowError(message.error);
        });
    };

    const ageCalc = (birthday) => {
        var dob = new Date(birthday);
        var month_diff = Date.now() - dob.getTime();
        var age_dt = new Date(month_diff);
        var year = age_dt.getUTCFullYear();
        var age = Math.abs(year - 1970);
        return age;
    };
    //TODO gestire secondo nome troppo lungo
    return (
        <div className="p-4 sm:ml-64">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                {info.data ? (
                    <>
                        {player ? (
                            <div>
                                <div className="flex">
                                    <div className="flex w-min ">
                                        <div
                                            className="relative"
                                            style={{
                                                backgroundImage: `url(${background})`,
                                                width: "400px",
                                                height: "600px",
                                                backgroundSize: "contain",
                                                backgroundRepeat: "no-repeat",
                                            }}
                                        >
                                            {countries.map((c) => {
                                                if (c.name == player.nationality) {
                                                    return (
                                                        <img
                                                            key={c.code}
                                                            src={`https://flagcdn.com/w20/${c.abbr.toLowerCase()}.png`}
                                                            className="absolute mt-[24px] ml-[29px] w-6"
                                                        />
                                                    );
                                                }
                                            })}
                                            <div className=" mt-[16px] ml-24 font-league text-[#c89c38] text-2xl">
                                                {player.id.toUpperCase()}
                                            </div>
                                            <div className="absolute mt-[401px] ml-[140px] text-white font-league text-2xl">
                                                {player.teampagename.toUpperCase().replaceAll("_", " ")}
                                            </div>
                                            {player.extradata.firstname && player.extradata.lastname ? (
                                                <div className="absolute mt-[365px] ml-[140px] text-white font-league text-2xl">
                                                    {player.extradata.firstname.toUpperCase() +
                                                        " " +
                                                        player.extradata.lastname.toUpperCase()}
                                                </div>
                                            ) : (
                                                <div className="absolute mt-[365px] ml-[140px] text-white font-league text-2xl">
                                                    {player.name}
                                                </div>
                                            )}
                                            <div className="absolute mt-[435px] ml-[140px] text-white text-2xl font-league">
                                                {ageCalc(player.birthdate)}
                                            </div>
                                            {player.extradata.role == "Top" ? (
                                                <img className="absolute w-[50px] mt-[461px] ml-[325px]" src={Top} />
                                            ) : player.extradata.role == "Jungle" ? (
                                                <img className="absolute w-[50px] mt-[461px] ml-[325px]" src={Jungle} />
                                            ) : player.extradata.role == "Mid" ? (
                                                <img className="absolute w-[50px] mt-[461px] ml-[325px]" src={Mid} />
                                            ) : player.extradata.role == "Bot" ? (
                                                <img className="absolute w-[50px] mt-[461px] ml-[325px]" src={Bot} />
                                            ) : player.extradata.role == "Support" ? (
                                                <img className="absolute w-[50px] mt-[461px] ml-[325px]" src={Support} />
                                            ) : (
                                                ""
                                            )}
                                            <img className="absolute w-[50px] mt-[461px] ml-[325px]" src={""} />;
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center justify-center w-full space-y-8">
                                        <Timer initialSeconds={Math.floor(timeLeft / 1000)} resetTrigger={resetTimer} />
                                        <div className="">
                                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                                <table className="w-64 text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                        <tr>
                                                            <th scope="col" className="px-6 py-3">
                                                                Bid
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                User
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {bids.length > 0 ? (
                                                            bids.map((b) => (
                                                                <tr
                                                                    key={b.time}
                                                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                                                >
                                                                    <th
                                                                        key={b.time}
                                                                        scope="row"
                                                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                                    >
                                                                        {b.bid}
                                                                    </th>
                                                                    <td key={b.time} className="px-6 py-4">
                                                                        {b.UserProfile.username}
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <td>Nessuna Offerta</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center mt-5">
                                    <div className="flex flex-row items-center space-x-2">
                                        <div className="flex flex-row w-[130px] items-center">
                                            <div className="text-xl">{info.data.Partecipate[0].Partecipations.coins}</div>
                                            <img src={coin} width={20} style={{ height: "20px" }} className="ml-2" />
                                        </div>
                                        <Input type="number" onChange={(e) => setBid(e.target.value)} />
                                        <Button type="submit" onClick={sendBid}>
                                            Punta
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center justify-center w-min mt-11">
                                    <div
                                        style={{
                                            backgroundImage: `url(${background})`,
                                            width: "400px",
                                            height: "600px",
                                            backgroundSize: "contain",
                                            backgroundRepeat: "no-repeat",
                                            filter: "blur(8px)",
                                        }}
                                    ></div>

                                    {info.data.createdBy == props.user.id ? (
                                        <Button className="absolute" onClick={nextPlayer}>
                                            {" "}
                                            Inizia Asta
                                        </Button>
                                    ) : (
                                        <div className="absolute">L'asta sta per cominciare</div>
                                    )}
                                </div>
                            </>
                        )}

                        {users.map((u) => (
                            <div key={u.userId}>{u.username}</div>
                        ))}
                        <Button
                            onClick={() => {
                                //socket.emit("show");
                                team.sort((a, b) => (a.role > b.role ? 1 : b.role > a.role ? -1 : 0));
                                console.log(team);
                            }}
                        >
                            Show
                        </Button>
                        <Separator className="my-4" />
                        <div className="flex flex-col">
                            <div className="mx-auto text-2xl ">Your Team</div>
                            <div className="flex flex-row justify-between">
                                <div>
                                    <p>Top</p>
                                    <div>
                                        {team
                                            ? team.map((p) => {
                                                  if (p.role == "Top") {
                                                      return <div key={p.name}>{p.name}</div>;
                                                  }
                                                  return "";
                                              })
                                            : ""}
                                    </div>
                                </div>
                                <div>
                                    <p>Jungle</p>
                                    <div>
                                        {team
                                            ? team.map((p) => {
                                                  if (p.role == "Jungle") {
                                                      return <div key={p.name}>{p.name}</div>;
                                                  }
                                                  return "";
                                              })
                                            : ""}
                                    </div>
                                </div>
                                <div>
                                    <p>Mid</p>
                                    <div>
                                        {team
                                            ? team.map((p) => {
                                                  if (p.role == "Mid") {
                                                      return <div key={p.name}>{p.name}</div>;
                                                  }
                                                  return "";
                                              })
                                            : ""}
                                    </div>
                                </div>
                                <div>
                                    <p>Bot</p>
                                    <div>
                                        {team
                                            ? team.map((p) => {
                                                  if (p.role == "Bot") {
                                                      return <div key={p.name}>{p.name}</div>;
                                                  }
                                                  return "";
                                              })
                                            : ""}
                                    </div>
                                </div>
                                <div>
                                    <p>Support</p>
                                    <div>
                                        {team
                                            ? team.map((p) => {
                                                  if (p.role == "Support") {
                                                      return <div key={p.name}>{p.name}</div>;
                                                  }
                                                  return "";
                                              })
                                            : ""}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    ""
                )}
            </div>
            <div>
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
                    <Toast text={showError} icon={errorRed} setShowError={setShowError} setShowSuccess={setShowSuccess} />
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}

function Toast(props) {
    return (
        <>
            <div
                id="toast-success"
                className="fixed flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow top-5 right-5 dark:text-gray-400 dark:bg-gray-800"
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
