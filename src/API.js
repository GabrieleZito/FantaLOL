import axios from "axios";

const URL = "http://localhost:3000";

const register = async (user) => {
    try {
        const { data } = await axios.post(URL + "/auth/register", user);
        console.log(data);
        return { msg: "User registered", ...data };
    } catch (e) {
        const error = e.response.data.err;
        switch (error) {
            case "username must be unique":
                return { err: "Username already taken", field: "username" };
            case "email must be unique":
                return { err: "Email already in use", field: "email" };
        }
    }
};

const login = async (login) => {
    try {
        const { data } = await axios.post(URL + "/auth/login", login);
        console.log(data);

        return { msg: "Login successfull", ...data };
    } catch (e) {
        const err = e.response.data;
        //console.log(err);
        throw new Error("Failed to Log In");
    }
};

const currentTournaments = async () => {
    try {
        const { data } = await axios.get(URL + "/league/tournaments/currentTournaments");
        console.log(data);
        return data;
    } catch (e) {
        throw new Error("Failed to fetch current Tournaments");
    }
};

const nextTournaments = async () => {
    try {
        const { data } = await axios.get(URL + "/league/tournaments/nextTournaments");
        console.log(data);
        return data;
    } catch (e) {
        throw new Error("Failed to fetch next Tournaments");
    }
};

const tournamentFromId = async (id) => {
    try {
        const { data } = await axios.get(URL + "/league/tournaments/" + id);
        console.log(data);
        return data;
    } catch (e) {
        throw new Error("Failed to fetch tournament");
    }
};

const API = { register, login, currentTournaments, nextTournaments, tournamentFromId };

export default API;
