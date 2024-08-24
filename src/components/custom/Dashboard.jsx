import React from "react";
import { Button } from "../ui/button";
import API from "../../API.js";
import { SideBar } from "./SideBar";

export function Dashboard(props) {
    const clicca = async () => {
        await API.prova();
    };

    return (
        <>
            <div className="">
                <SideBar/>
                <Button>
                    Ciao
                </Button>
            </div>
        </>
    );
}
