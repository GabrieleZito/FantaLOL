import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import API from "../../API.js";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Sidebar } from "./SideBar";
import { useQuery } from "@tanstack/react-query";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function Dashboard(props) {
    const currentT = useQuery({
        queryFn: API.currentTournaments,
        queryKey: ["current"],
    });

    const nextT = useQuery({
        queryFn: API.nextTournaments,
        queryKey: ["next"],
    });

    function groupTournamentsByLeague(tournaments) {
        return tournaments.reduce((groups, tournament) => {
            const key = tournament.LeagueIconKey;
            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(tournament);
            return groups;
        }, {});
    }
    if (currentT.data) {
        //const c = groupTournamentsByLeague
        console.log(currentT.data);
    }
    console.log(import.meta.env.VITE_API_URL);

    return (
        <>
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    {currentT.status == "loading" ? (
                        ""
                    ) : (
                        <div className="flex items-center justify-center mb-4 rounded bg-gray-50 dark:bg-gray-800">
                            <Card className="">
                                <CardContent className="p-0">
                                    {currentT.data ? (
                                        <Accordion collapsible className="w-full">
                                            {Object.entries(currentT.data).map(([key, value]) => {
                                                return (
                                                    <>
                                                        <AccordionItem value={key} key={key} className="">
                                                            <AccordionTrigger>
                                                                <div className="p-3 hover:bg-gray-50 transition-colors">
                                                                    <div className="flex flex-wrap items-center justify-between gap-6">
                                                                        <div className="flex-1 min-w-[200px]">
                                                                            <h3 className="text-2xl font-bold mb-1">{key}</h3>
                                                                            <p className="text-gray-600"></p>
                                                                        </div>
                                                                        <div className="flex-1 min-w-[200px]">
                                                                            <div className="text-sm text-gray-500 mb-1">
                                                                                Active Tournaments
                                                                            </div>
                                                                            <div className="font-bold text-lg">
                                                                                {value.length}
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex-1 min-w-[200px]">
                                                                            <div className="text-sm text-gray-500 mb-1">
                                                                                Prize Pool
                                                                            </div>
                                                                            <div className="font-bold text-lg text-blue-600">
                                                                                {}
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex-1 min-w-[200px]">
                                                                            <div className="text-sm text-gray-500 mb-1">
                                                                                Next Match
                                                                            </div>
                                                                            <div className="font-medium">{}</div>
                                                                            <div className="text-sm text-gray-500">{}</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </AccordionTrigger>
                                                            <AccordionContent>
                                                                <div className="px-14 flex flex-row justify-between">
                                                                    <div className="">
                                                                        <p>Primary</p>
                                                                        <div className="flex flex-col">
                                                                            {value.map((v) => {
                                                                                if (v.TournamentLevel == "Primary") {
                                                                                    return <div key={v.name}>{v.Name}</div>;
                                                                                }
                                                                            })}
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                        <p>Secondary</p>
                                                                        <div className="flex flex-col">
                                                                            {value.map((v) => {
                                                                                if (v.TournamentLevel == "Secondary") {
                                                                                    return <div key={v.name}>{v.Name}</div>;
                                                                                }
                                                                            })}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </AccordionContent>
                                                        </AccordionItem>
                                                    </>
                                                );
                                            })}
                                        </Accordion>
                                    ) : (
                                        ""
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
