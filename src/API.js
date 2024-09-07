import axios from "axios";

const URL = "http://localhost:3000";

const axiosConf = axios.create({
    withCredentials: true,
});

const register = (user) => {
    return axiosConf.post(URL + "/auth/register", user).then((res) => res.data);
};

const login = (credentials) => {
    return axiosConf
        .post(URL + "/auth/login", credentials)
        .then((res) => res.data);
};

const currentTournaments = () => {
    return axiosConf
        .get(URL + "/league/tournaments/currentTournaments")
        .then((res) => res.data);
};

const nextTournaments = () => {
    return axiosConf
        .get(URL + "/league/tournaments/nextTournaments")
        .then((res) => res.data);
};

const tournamentFromId = (id) => {
    return axiosConf
        .get(URL + "/league/tournaments/" + id)
        .then((res) => res.data);
};

const sendRequest = (search) => {
    return axiosConf
        .post(URL + `/users/${search}/request`)
        .then((res) => res.data);
};

const logout = () => {
    return axiosConf.delete(URL + "/auth/logout").then((res) => res.data);
};

const checkNotifications = () => {
    return axiosConf.get(URL + "/users/notifications").then((res) => res.data);
};

const getFriendRequests = () => {
    return axiosConf
        .get(URL + "/users/friend-requests")
        .then((res) => res.data);
};

const API = {
    register,
    login,
    currentTournaments,
    nextTournaments,
    tournamentFromId,
    sendRequest,
    logout,
    checkNotifications,
    getFriendRequests,
};

export default API;
