import { Card } from "@/components/ui/card";
import ht1 from "@/assets/imgs/howto1.png";
import ht2 from "@/assets/imgs/howto2.png";
import ht3 from "@/assets/imgs/howto3.png";
import ht4 from "@/assets/imgs/howto4.png";
import ht5 from "@/assets/imgs/howto5.png";

export function Howto(props) {
    const tutorialSections = [
        {
            title: "Getting Started",
            content: "To start go to the leaderboard section and create your own league.",
            imageAlt: "Getting Started",
            image: ht1,
        },
        {
            title: "Create the Leaderboard",
            content:
                "Set the visibility, the League or Tournament for which you want to play, a name of your choice and the maximum amount of coins a participant starts with.",
            imageAlt: "Create the Leaderboard",
            image: ht2,
        },
        {
            title: "Invite Your friends",
            content: "Select the friends you want to invite.",
            imageAlt: "Invite Your friends",
            image: ht3,
        },
        {
            title: "Start the Auction",
            content: "Enter the auction with your friends and start betting on which player you want on your team",
            imageAlt: "Start the Auction",
            image: ht4,
        },
        {
            title: "Your Team",
            content: "Select the Players of your team you want to be active and gaining points",
            imageAlt: "Your Team",
            image: ht5,
        },
    ];

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8 text-center">Tutorial Guide</h1>

            <div className="space-y-12">
                {tutorialSections.map((section, index) => (
                    <Card key={section.title} className="p-6">
                        <div
                            className={`flex flex-col md:flex-row items-start gap-8 ${
                                index % 2 === 1 ? "md:flex-row-reverse" : ""
                            }`}
                        >
                            <div className="w-full md:w-1/2">
                                <img src={section.image} alt={section.imageAlt} className="rounded-lg shadow-lg w-full" />
                            </div>

                            <div className="w-full md:w-1/2 space-y-4 flex flex-col justify-center">
                                <div>
                                    <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                                    <p className="text-gray-700 leading-relaxed">{section.content}</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
