import API from "@/API";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function LeaderboardDetails(props) {
    const { leadId } = useParams();

    const getLeaderboard = useQuery({
        queryKey: ["leaderboard", leadId],
        queryFn: () => API.getLeaderboard(leadId),
    });
    if (getLeaderboard.isSuccess) {
        console.log(getLeaderboard.data);
    }
    if (getLeaderboard.isError) {
        console.log(getLeaderboard.error);
    }

    return (
        <>
            {getLeaderboard.data ? (
                <>
                    <div className="p-4 sm:ml-64">
                        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                            <div className="flex items-center justify-between text-slate-400">
                                <p className="text-2xl font-medium text-slate-500">{getLeaderboard.data.name}</p>
                                <p>Entry fee: {getLeaderboard.data.fee}</p>
                                <p>Max coins per user: {getLeaderboard.data.max_coins}</p>
                                <p>{getLeaderboard.data.private ? "Private":"Public"} leaderboard</p>
                            </div>
                            <div className="pt-5">
                                CIAO
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                "ERRORE"
            )}
        </>
    );
}
