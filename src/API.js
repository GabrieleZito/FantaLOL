import axios from "axios";

const URL = "http://localhost:3000";

const register = async (user) => {
    try {
        const { data } = await axios.post(URL + "/auth/register", user);
        console.log(data);
        return { msg: "User registered" };
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

const API = { register };

export default API;
