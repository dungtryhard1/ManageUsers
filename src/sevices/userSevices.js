import myAxios from './customizeAxios';

const fetchAllUser = (page) => {
    return myAxios.get(`/api/users?page=${page}`)
}

const postCreateUser = (name , job) => {
    return myAxios.post("/api/users", {name , job})
}

const putUpdateUser = (name , job) => {
    return myAxios.put("/api/users/2", {name , job})
}

const deleteUser = (id) => {
    return myAxios.delete(`/api/users/${id}`)
}

const loginApi = (email, password) => {
    return myAxios.post("/api/login", {email, password})
} 

export { fetchAllUser , postCreateUser , putUpdateUser , deleteUser, loginApi };