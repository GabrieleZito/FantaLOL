import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const URL = "http://localhost:3000";

const login = () => {
    axios
        .get(URL + "/get")
        .then((res) => console.log(res))
        .catch((res) => console.log(res));
};

const API = { login };

export default API;
