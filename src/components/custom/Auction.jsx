import API from "@/API";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import background from "@/assets/placeholder.png";
import { Timer } from "./Timer";
import coin from "@/assets/coin.png";
import jungle from "@/assets/jungle.png";
import mid from "@/assets/mid.png";
import top from "@/assets/top.png";
import bot from "@/assets/bot.png";
import sup from "@/assets/sup.png";

import countries from "@/assets/misc/countries.json";

export function Auction(props) {
    const { leadId } = useParams();
    const socket = props.socket;
    const [users, setUsers] = useState([]);
    const [player, setPlayer] = useState(null);
    const [resetTimer, setResetTimer] = useState(false);
    const [bids, setBids] = useState([]);
    const [bid, setBid] = useState("");
    const [coins, setCoins] = useState();

    const info = useQuery({
        queryFn: () => API.getInfoLead(leadId),
        queryKey: ["infoLead"],
    });

    useEffect(() => {
        socket.emit("joinAsta", { leadId: parseInt(leadId), userId: props.user.id, username: props.user.username }, (users) => {
            setUsers(users);
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
            if (player == null || player.id != newPlayer.id) {
                setPlayer(newPlayer);
            }
            console.log(newPlayer);
        });

        socket.on("newBid", (bids) => {
            setBids(bids);
        });

        socket.on("endedAsta", (winner) => {
            console.log(winner);
        });
    }, [socket]);

    const startAsta = () => {
        socket.emit("startAsta", parseInt(leadId), (player) => {
            console.log(player);
            setPlayer(player);
        });
    };

    //TODO separare i casi e fare notifiche sistemate
    //TODO deve rimanere 1 credito per ogni giocatore mancante
    const sendBid = () => {
        if (
            info.data.Partecipate[0].Partecipations.coins < bid ||
            bid == "" ||
            (bids.length > 0 && bid <= parseInt(bids[0].bid))
        ) {
            alert("Non hai abbastanza monete");
        } else {
            socket.emit("bid", parseInt(leadId), bid, (bids) => {
                setBids(bids);
            });
        }
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
                                            <div className="absolute mt-[365px] ml-[140px] text-white font-league text-2xl">
                                                {player.extradata.firstname.toUpperCase() +
                                                    " " +
                                                    player.extradata.lastname.toUpperCase()}
                                            </div>
                                            <div className="absolute mt-[435px] ml-[140px] text-white text-2xl font-league">
                                                {ageCalc(player.birthdate)}
                                            </div>
                                            <img className="absolute w-[50px] mt-[461px] ml-[325px]" src={sup} />
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center justify-center w-full space-y-8">
                                        <Timer initialSeconds={60} resetTrigger={resetTimer} />
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
                                                        {bids.length > 0
                                                            ? bids.map((b) => (
                                                                  <tr
                                                                      key={b.time}
                                                                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                                                  >
                                                                      <th
                                                                          scope="row"
                                                                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                                      >
                                                                          {b.bid}
                                                                      </th>
                                                                      <td className="px-6 py-4">{b.username}</td>
                                                                  </tr>
                                                              ))
                                                            : "Nessuna Offerta"}
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
                                        <Button className="absolute" onClick={startAsta}>
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
                                socket.emit("show");
                            }}
                        >
                            Show
                        </Button>
                    </>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}
