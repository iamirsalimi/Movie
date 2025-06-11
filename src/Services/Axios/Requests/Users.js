import apiRequests from "../Configs/configs";

const registerUser = newUser => {
    return apiRequests.post('/users', newUser)
        .then(res => res)
        .catch(err => err)
}

const checkUserName = userName => {
    return apiRequests.get('/users' , {
        params : {
            userName : `eq.${userName}`
        }
    }).then(res => res.data)
    .catch(err => err)
}

const updateUser = (id , userObj) => {
    return apiRequests.patch('/users' , userObj , {
        params : {
            id : `eq.${id}`
        }
    }).then(res => res)
    .catch(err => err)
}

export { registerUser , checkUserName , updateUser }