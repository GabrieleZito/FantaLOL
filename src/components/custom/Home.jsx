import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Trophy, Users, Crown, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

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
            icon: <Users className="w-8 h-8 text-blue-500" />,
            title: "Create Custom Leagues",
            description: "Start a private league with friends or join public competitions",
        },
        {
            icon: <TrendingUp className="w-8 h-8 text-green-500" />,
            title: "Real-Time Scoring",
            description: "Points update live during professional matches",
        },
        {
            icon: <Trophy className="w-8 h-8 text-yellow-500" />,
            title: "Weekly Rewards",
            description: "Win prizes based on your team's performance",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="">PLACEHOLDER HOME</div>
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-blue-900 to-blue-700 text-white">
                <div className="container mx-auto px-4 py-16">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-5xl font-bold mb-6">Fantasy League of Legends</h1>
                        <p className="text-xl mb-8">
                            Draft your dream team of pro players, compete against other managers, and climb the global rankings!
                        </p>
                        <div className="space-x-4">
                            <Link to="/sign-in">
                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
                                    Sign Up Free
                                </button>
                            </Link>
                            <button className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
                                How It Works
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Banner */}
            <div className="bg-white border-b ">
                <div className="container mx-auto px-4 py-6 justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold text-blue-600">500,000+</div>
                            <div className="text-gray-600">Active Players</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-blue-600">$50,000+</div>
                            <div className="text-gray-600">Monthly Prizes</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-blue-600">12</div>
                            <div className="text-gray-600">Pro Leagues</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container flex-col mx-auto px-4 py-12">
                {/* Features Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {features.map((feature, index) => (
                        <Card key={index} className="text-center">
                            <CardContent className="pt-6">
                                <div className="flex justify-center mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
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
                                <div key={league.name} className="p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex flex-wrap items-center justify-between gap-6">
                                        <div className="flex-1 min-w-[200px]">
                                            <h3 className="text-2xl font-bold mb-1">{league.name}</h3>
                                            <p className="text-gray-600">{league.region}</p>
                                        </div>
                                        <div className="flex-1 min-w-[200px]">
                                            <div className="text-sm text-gray-500 mb-1">Active Players</div>
                                            <div className="font-bold text-lg">{league.players.toLocaleString()}</div>
                                        </div>
                                        <div className="flex-1 min-w-[200px]">
                                            <div className="text-sm text-gray-500 mb-1">Prize Pool</div>
                                            <div className="font-bold text-lg text-blue-600">{league.prize}</div>
                                        </div>
                                        <div className="flex-1 min-w-[200px]">
                                            <div className="text-sm text-gray-500 mb-1">Next Match</div>
                                            <div className="font-medium">{league.nextMatch}</div>
                                            <div className="text-sm text-gray-500">{league.startTime}</div>
                                        </div>
                                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                                            Join League
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* CTA Section */}
                <div className="text-center bg-blue-50 rounded-xl p-12">
                    <h2 className="text-3xl font-bold mb-4">Ready to Build Your Dream Team?</h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Join thousands of managers competing in Fantasy League of Legends
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
                        Get Started Now
                    </button>
                </div>
            </div>
        </div>
    );
}
