import API from "@/API";
import { useQuery } from "@tanstack/react-query";

export function Inbox(props) {

    const friendReq = useQuery({
        queryKey: ["friendReq"],
        queryFn: API.getFriendRequests
    })
    
    if (friendReq.isSuccess) {
        console.log(friendReq.data);
        
    }
    return (
        <div className="p-4 sm:ml-64">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                <div className="text-2xl font-medium text-slate-500">
                    Friend Requests
                </div>
                {/* {friendReq.isSuccess ? (
                    friendReq.data.map(x => <div>{x}</div>)
                ) : ""} */}
            </div>
        </div>
    );
}
