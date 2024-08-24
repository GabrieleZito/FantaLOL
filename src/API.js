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
        return err;
    }
};

const prova = async () => {
    try {
        const data = await axios.get(URL + "/test");
        console.log(data);
    } catch (e) {
        console.log(e);
    }
};

const API = { register, login, prova };

export default API;
