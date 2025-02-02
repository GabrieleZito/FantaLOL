import { Card } from "@/components/ui/card";

export function Howto(props) {
    const tutorialSections = [
        {
            title: "Getting Started",
            content:
                "Lorem ipsum odor amet, consectetuer adipiscing elit. Habitasse parturient tristique facilisis cursus interdum congue. Maecenas mollis etiam augue euismod, dictum at." +
                " Nam nostra rhoncus mauris adipiscing purus. Etiam quis vestibulum fermentum conubia primis quisque imperdiet ultricies",
            imageAlt: "Getting Started",
        },
        {
            title: "Core Concepts",
            content:
                "Lorem ipsum odor amet, consectetuer adipiscing elit. Habitasse parturient tristique facilisis cursus interdum congue. Maecenas mollis etiam augue euismod, dictum at." +
                " Nam nostra rhoncus mauris adipiscing purus. Etiam quis vestibulum fermentum conubia primis quisque imperdiet ultricies",
            imageAlt: "Core Concepts diagram",
        },
        {
            title: "Advanced Techniques",
            content:
                "Lorem ipsum odor amet, consectetuer adipiscing elit. Habitasse parturient tristique facilisis cursus interdum congue. Maecenas mollis etiam augue euismod, dictum at." +
                " Nam nostra rhoncus mauris adipiscing purus. Etiam quis vestibulum fermentum conubia primis quisque imperdiet ultricies",
            imageAlt: "Advanced Techniques visualization",
        },
        {
            title: "Best Practices",
            content:
                "Lorem ipsum odor amet, consectetuer adipiscing elit. Habitasse parturient tristique facilisis cursus interdum congue. Maecenas mollis etiam augue euismod, dictum at." +
                " Nam nostra rhoncus mauris adipiscing purus. Etiam quis vestibulum fermentum conubia primis quisque imperdiet ultricies",
            imageAlt: "Best Practices checklist",
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
                                <img
                                    src={`/api/placeholder/600/400`}
                                    alt={section.imageAlt}
                                    className="rounded-lg shadow-lg w-full"
                                />
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
