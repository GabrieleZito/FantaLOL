import axios from "axios";

const URL = "http://localhost:3000";
//const URL = "https://fantalol-server.onrender.com"

const axiosConf = axios.create({
    withCredentials: true,
});

const register = (user) => {
    return axiosConf.post(URL + "/auth/register", user).then((res) => res.data);
};

const login = (credentials) => {
    return axiosConf.post(URL + "/auth/login", credentials).then((res) => res.data);
};

const currentTournaments = () => {
    return axiosConf.get(URL + "/league/tournaments/currentTournaments").then((res) => res.data);
};

const nextTournaments = () => {
    return axiosConf.get(URL + "/league/tournaments/nextTournaments").then((res) => res.data);
};

const tournamentFromId = (id) => {
    return axiosConf.get(URL + "/league/tournaments/" + id).then((res) => res.data);
};

const sendRequest = (search) => {
    return axiosConf.post(URL + `/users/${search}/request`).then((res) => res.data);
};

const logout = () => {
    return axiosConf.delete(URL + "/auth/logout").then((res) => res.data);
};

const checkNotifications = () => {
    return axiosConf.get(URL + "/users/notifications").then((res) => res.data);
};

const getFriendRequests = () => {
    return axiosConf.get(URL + "/users/friend-requests").then((res) => res.data);
};

const acceptFriend = (id) => {
    return axiosConf.post(URL + "/users/acceptFriend", id).then((res) => res.data);
};

const getFriends = () => {
    return axiosConf.get(URL + "/users/friends").then((res) => res.data);
};

const submitLeader = (options) => {
    return axiosConf.post(URL + "/leaderboards/new", options).then((res) => res.data);
};

const getLeaderboard = (id) => {
    return axiosConf.get(URL + `/leaderboards/${id}`).then((res) => res.data);
};

const getUserLeaderboard = (userId) => {
    return axiosConf.get(URL + "/leaderboards/user/" + userId).then((res) => res.data);
};

const getFriendsLeaderboards = (userId) => {
    return axiosConf.get(URL + "/leaderboards/user/" + userId + "/friends").then((res) => res.data);
};

const inviteFriend = (data) => {
    return axiosConf.post(URL + "/users/send-invite", data).then((res) => res.data);
};

const getInvites = () => {
    return axiosConf.get(URL + "/users/invites").then((res) => res.data);
};

const acceptInvite = (id) => {
    return axiosConf.post(URL + "/users/accept-invite", id).then((res) => res.data);
};

const getLEC = () => {
    return axiosConf.get(URL + "/league/tournaments/lec").then((res) => res.data);
};

const getInfoLead = (leadId) => {
    return axiosConf.get(URL + "/leaderboards/" + leadId + "/user").then((res) => res.data);
};

const getUserTeam = (leadId) => {
    return axiosConf.get(URL + "/leaderboards/" + leadId + "/team").then((res) => res.data);
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
    acceptFriend,
    getFriends,
    submitLeader,
    getLeaderboard,
    getUserLeaderboard,
    inviteFriend,
    getInvites,
    acceptInvite,
    getLEC,
    getFriendsLeaderboards,
    getInfoLead,
    getUserTeam
};

export default API;
