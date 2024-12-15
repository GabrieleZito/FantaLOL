import { useEffect } from "react";
import { useParams } from "react-router-dom";

export function Auction(props) {
    const { leadId } = useParams();


    return (
        <div className="p-4 sm:ml-64">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">CIAO</div>
        </div>
    );
}
