import API from "@/API";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function TournamentDetails(props) {
    const { tourId } = useParams();

    const { data, isLoading, isSuccess } = useQuery({
        queryKey: ["id"],
        queryFn: () => API.tournamentFromId(tourId),
    });

    if (isSuccess) {
        console.log(data);
    }

    return (
        <>
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 ">
                    {data ? (
                        <>
                            <div className="flex items-center justify-center font-bold">
                                {data.slug.toUpperCase()}
                            </div>
                            <div className="grid grid-cols-3 grid-rows-3 gap-4 mt-5">
                                <div>
                                    Starts: <p>{data.begin_at}</p>
                                </div>
                                <div>
                                    Ends: <p>{data.end_at}</p>
                                </div>
                                <div>
                                    Tier: <p>{data.tier.toUpperCase()}</p>
                                </div>
                            </div>
                            <div>{data.matches.map( m=> <div>{m.name}</div>)}</div>
                        </>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </>
    );
}
