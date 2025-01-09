import API from "@/API";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export function Team() {
    const { leadId } = useParams();

    const team = useQuery({
        queryFn: () => API.getUserTeam(leadId),
        queryKey: ["team"],
    });

    return (
        <>
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    {team.data ? (
                        <div className="flex flex-col">
                            <div className="mx-auto text-2xl ">Your Team</div>
                            <div className="flex flex-row justify-between">
                                <div>
                                    <p>Top</p>
                                    <div>
                                        {team.data.Team.Players
                                            ? team.data.Team.Players.map((p) => {
                                                  if (p.role == "Top") {
                                                      return <div key={p.id}>{p.name}</div>;
                                                  }
                                                  return "";
                                              })
                                            : ""}
                                    </div>
                                </div>
                                <div>
                                    <p>Jungle</p>
                                    <div>
                                        {team.data.Team.Players
                                            ? team.data.Team.Players.map((p) => {
                                                  if (p.role == "Jungle") {
                                                      return <div key={p.id}>{p.name}</div>;
                                                  }
                                                  return "";
                                              })
                                            : ""}
                                    </div>
                                </div>
                                <div>
                                    <p>Mid</p>
                                    <div>
                                        {team.data.Team.Players
                                            ? team.data.Team.Players.map((p) => {
                                                  if (p.role == "Mid") {
                                                      return <div key={p.id}>{p.name}</div>;
                                                  }
                                                  return "";
                                              })
                                            : ""}
                                    </div>
                                </div>
                                <div>
                                    <p>Bot</p>
                                    <div>
                                        {team.data.Team.Players
                                            ? team.data.Team.Players.map((p) => {
                                                  if (p.role == "Bot") {
                                                      return <div key={p.id}>{p.name}</div>;
                                                  }
                                                  return "";
                                              })
                                            : ""}
                                    </div>
                                </div>
                                <div>
                                    <p>Support</p>
                                    <div>
                                        {team.data.Team.Players
                                            ? team.data.Team.Players.map((p) => {
                                                  if (p.role == "Support") {
                                                      return <div key={p.id}>{p.name}</div>;
                                                  }
                                                  return "";
                                              })
                                            : ""}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        "ERRORE"
                    )}
                </div>
            </div>
        </>
    );
}
