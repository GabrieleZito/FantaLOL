import API from "@/API";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Bracket } from "./Bracket";

export function TournamentDetails(props) {
    const { tourId } = useParams();

    const { data, isLoading, isSuccess } = useQuery({
        queryKey: ["tournament", tourId],
        queryFn: () => API.tournamentFromId(tourId),
    });
    console.log(data);

    return (
        <>
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 ">
                    {data ? (
                        <>
                            <div className="flex flex-col items-center justify-center font-bold">
                                <img
                                    src={data.league.image_url}
                                    className="h-24"
                                />
                                {data.slug.toUpperCase()}
                            </div>
                            <div className="grid grid-cols-3 grid-rows-3 gap-4 mt-5">
                                <div>
                                    Starts: <p>{data.begin_at.slice(0, 10)}</p>
                                </div>
                                <div>
                                    Ends: <p>{data.end_at.slice(0, 10)}</p>
                                </div>
                                <div>
                                    Tier: <p>{data.tier.toUpperCase()}</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-between px-4 space-x-2">
                                {data.teams.map((t) => (
                                    <img
                                        key={t.id}
                                        src={t.image_url}
                                        className="flex h-12"
                                        alt={t.acronym}
                                        title={t.name}
                                    />
                                ))}
                            </div>
                            <div>
                                {data.matches.map((m, i) => (
                                    <div key={i}>{m.name}</div>
                                ))}
                            </div>
                            <div>
                                {/* <Bracket></Bracket> */}
                            </div>
                        </>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </>
    );
}
