import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import API from "../../API.js";
import { Card } from "./Card";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Sidebar } from "./SideBar";

export function Dashboard(props) {
    const [currentTournaments, setcurrentTournaments] = useState(null);
    const [nextTournaments, setNextTournaments] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            Promise.all([API.currentTournaments(), API.nextTournaments()]).then(
                (data) => {
                    setcurrentTournaments(data[0]);
                    setNextTournaments(data[1]);
                    console.log(data);
                    setLoading(false);
                }
            );
        } catch (e) {
            console.log(e);
        }
    }, []);

    return (
        <>
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    {loading ? (
                        ""
                    ) : (
                        <>
                            Current:
                            <div className="flex items-center justify-center mb-4 rounded bg-gray-50 dark:bg-gray-800">
                                <ScrollArea className="w-auto rounded-md bottom-11rder whitespace-nowrap">
                                    <div className="flex p-4 space-x-4 w-max">
                                        {currentTournaments
                                            ? currentTournaments.map(
                                                  (element, i) => {
                                                      return (
                                                          <Card
                                                              key={i}
                                                              img={
                                                                  element.league
                                                                      .image_url
                                                              }
                                                              text={
                                                                  element.league
                                                                      .name
                                                              }
                                                              button="Info"
                                                              id={element.id}
                                                          />
                                                      );
                                                  }
                                              )
                                            : ""}
                                    </div>
                                    <ScrollBar orientation="horizontal" />
                                </ScrollArea>
                            </div>
                            Next:
                            <div className="flex items-center justify-center mb-4 rounded bg-gray-50 dark:bg-gray-800">
                                <ScrollArea className="w-auto rounded-md bottom-11rder whitespace-nowrap">
                                    <div className="flex p-4 space-x-4 w-max">
                                        {nextTournaments
                                            ? nextTournaments.map(
                                                  (element, i) => {
                                                      return (
                                                          <Card
                                                              key={i}
                                                              img={
                                                                  element.league
                                                                      .image_url
                                                              }
                                                              text={
                                                                  element.league
                                                                      .name
                                                              }
                                                              button="Info"
                                                              id={element.id}
                                                          />
                                                      );
                                                  }
                                              )
                                            : ""}
                                    </div>
                                    <ScrollBar orientation="horizontal" />
                                </ScrollArea>
                            </div>
                        </>
                    )}

                    <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
                        <p className="text-2xl text-gray-400 dark:text-gray-500"></p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                            <p className="text-2xl text-gray-400 dark:text-gray-500"></p>
                        </div>
                        <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                            <p className="text-2xl text-gray-400 dark:text-gray-500"></p>
                        </div>
                        <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                            <p className="text-2xl text-gray-400 dark:text-gray-500"></p>
                        </div>
                        <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                            <p className="text-2xl text-gray-400 dark:text-gray-500"></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
