import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Trophy, Users, Crown, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import background from "@/assets/bg.png";
//TODO è tutto un placeholder

export function Home(props) {
    const topLeagues = [
        {
            name: "LCK",
            region: "Korea",
            players: 125000,
            prize: "$10,000",
            nextMatch: "T1 vs GEN",
            startTime: "Tomorrow 18:00",
        },
        {
            name: "LPL",
            region: "China",
            players: 180000,
            prize: "$12,000",
            nextMatch: "JDG vs BLG",
            startTime: "Tomorrow 20:00",
        },
        {
            name: "LEC",
            region: "Europe",
            players: 95000,
            prize: "$8,000",
            nextMatch: "G2 vs FNC",
            startTime: "Saturday 19:00",
        },
    ];

    const features = [
        {
            icon: <Users className="h-8 w-8 text-blue-500" />,
            title: "Create Custom Leagues",
            description:
                "Start a private league with friends or join public competitions",
        },
        {
            icon: <TrendingUp className="h-8 w-8 text-green-500" />,
            title: "Real-Time Scoring",
            description: "Points update live during professional matches",
        },
        {
            icon: <Trophy className="h-8 w-8 text-yellow-500" />,
            title: "Weekly Rewards",
            description: "Win points based on your team's performance",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Main Content */}
            <div className="container mx-auto flex-col px-4 py-12">
                {/* Features Section */}
                <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
                    {features.map((feature, index) => (
                        <Card key={index} className="text-center">
                            <CardContent className="pt-6">
                                <div className="mb-4 flex justify-center">
                                    {feature.icon}
                                </div>
                                <h3 className="mb-2 text-xl font-semibold">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">
                                    {feature.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Featured Leagues */}
                <Card className="mb-12">
                    <CardHeader className="border-b">
                        <CardTitle className="flex items-center gap-2">
                            <Crown className="text-yellow-500" />
                            Popular Pro Leagues
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y">
                            {topLeagues.map((league) => (
                                <div
                                    key={league.name}
                                    className="p-6 transition-colors hover:bg-gray-50"
                                >
                                    <div className="flex flex-wrap items-center justify-between gap-6">
                                        <div className="min-w-[200px] flex-1">
                                            <h3 className="mb-1 text-2xl font-bold">
                                                {league.name}
                                            </h3>
                                            <p className="text-gray-600">
                                                {league.region}
                                            </p>
                                        </div>
                                        <div className="min-w-[200px] flex-1">
                                            <div className="mb-1 text-sm text-gray-500">
                                                Active Players
                                            </div>
                                            <div className="text-lg font-bold">
                                                {league.players.toLocaleString()}
                                            </div>
                                        </div>
                                        <div className="min-w-[200px] flex-1">
                                            <div className="mb-1 text-sm text-gray-500">
                                                Prize Pool
                                            </div>
                                            <div className="text-lg font-bold text-blue-600">
                                                {league.prize}
                                            </div>
                                        </div>
                                        <div className="min-w-[200px] flex-1">
                                            <div className="mb-1 text-sm text-gray-500">
                                                Next Match
                                            </div>
                                            <div className="font-medium">
                                                {league.nextMatch}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {league.startTime}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* CTA Section */}
                <div className="rounded-xl bg-blue-50 p-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold">
                        Ready to Build Your Dream Team?
                    </h2>
                    <p className="mb-8 text-xl text-gray-600">
                        Join thousands of managers competing in Fantasy League
                        of Legends
                    </p>
                    <button className="rounded-lg bg-blue-600 px-8 py-4 font-semibold text-white transition-colors hover:bg-blue-700">
                        Get Started Now
                    </button>
                </div>
            </div>
        </div>
    );
}
