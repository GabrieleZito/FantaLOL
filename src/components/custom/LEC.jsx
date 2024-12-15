import API from "@/API";
import { useQuery } from "@tanstack/react-query";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export function LEC(props) {
    const lec = useQuery({
        queryKey: ["LEC"],
        queryFn: API.getLEC,
    });
    console.log(lec.data);

    return (
        <>
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    {lec.data ? (
                        <>
                            <Accordion type="multiple">
                                {lec.data.map((l) => (
                                    <AccordionItem
                                        value={l.name}
                                        key={l.pageid}
                                    >
                                        <AccordionTrigger>
                                            {l.name}
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="flex justify-between">
                                                <div>Start: {l.startdate}</div>
                                                <div>End: {l.enddate}</div>
                                            </div>
                                            <div>
                                                {l.participants.map((p) => (
                                                    <div key={p.objectname}>{p.opponentname}</div>
                                                ))}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </>
    );
}
