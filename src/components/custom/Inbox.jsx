import API from "@/API";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";

export function Inbox(props) {
    const queryClient = useQueryClient();

    const friendReq = useQuery({
        queryKey: ["friendReq"],
        queryFn: API.getFriendRequests,
    });

    const invites = useQuery({
        queryKey: ["invites"],
        queryFn: API.getInvites,
    });

    const acceptFriend = useMutation({
        mutationKey: ["acceptFriend"],
        mutationFn: API.acceptFriend,
        onSuccess: (data) => {
            console.log(data);
            queryClient.invalidateQueries({ queryKey: ["friendReq"] });
        },
        onError: (err) => {
            if (err.response.status == 401) {
                navigate("/login");
            }
            const error = err.response.data.err;
            console.log(error);
        },
    });

    const acceptInvite = useMutation({
        mutationKey: ["acceptInvite"],
        mutationFn: API.acceptInvite,
        onSuccess: (data) => {
            console.log(data);
            queryClient.invalidateQueries({ queryKey: ["invites"] });
        },
        onError: (err) => {
            if (err.response.status == 401) {
                navigate("/login");
            }
            const error = err.response.data.err;
            console.log(error);
        },
    });

    const accetta = (id) => {
        console.log(id);
        acceptFriend.mutate({ id: id });
    };

    const accettaInvito = (id) => {
        console.log(id);
        acceptInvite.mutate({ id: id });
    };

    //TODO Aggiungere scritta se non ci sono inviti/richieste
    //TODO Aggiungere funzione per rifiutare
    return (
        <div className="p-4 sm:ml-64">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                <div className="text-2xl font-medium text-slate-500">Invites</div>
                <div className="mt-12">
                    {invites.isSuccess
                        ? invites.data.map((x) => (
                              <div className="flex p-2 my-1 rounded-lg shadow-lg" key={x.id}>
                                  <div className="align-middle">
                                      <div>{x.Leaderboard.name}</div>
                                  </div>
                                  <div className="my-auto h-fit">
                                      <Button className="" onClick={() => accettaInvito(x.id)}>
                                          Accept
                                      </Button>
                                      <Button className="">Decline</Button>
                                  </div>
                              </div>
                          ))
                        : ""}
                </div>
            </div>
            <div className="p-4 mt-3 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                <div className="text-2xl font-medium text-slate-500">Friend Requests</div>
                <div className="mt-12">
                    {friendReq.isSuccess
                        ? friendReq.data.map((x) => (
                              <div className="flex p-2 my-1 rounded-lg shadow-lg" key={x.id}>
                                  <div className="align-middle">
                                      <div>
                                          <img src={x.profilePicture} className="h-14" />
                                      </div>
                                      <div>{x.username}</div>
                                  </div>
                                  <div className="my-auto h-fit">
                                      <Button className="" onClick={() => accetta(x.id)}>
                                          Accept
                                      </Button>
                                      <Button className="">Decline</Button>
                                  </div>
                              </div>
                          ))
                        : ""}
                </div>
            </div>
        </div>
    );
}
