import axiosInstance from "../../api/axiosInstance"

const userFriends = async (userData) => {
    const response = await axiosInstance.get(`/users/${userData}/detail/`)
    return response.data
}

const userFriend = async (userData) => {
    const response = await axiosInstance.get(`/users/friend/${userData}/detail/`)
    return response.data
}

const userService = {
    userFriends,
    userFriend,
}

export default userService;