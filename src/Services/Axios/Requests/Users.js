import apiRequests from "../Configs/configs";

const registerUser = newUser => {
    return apiRequests.post('/users', newUser)
        .then(res => res)
        .catch(err => err)
}

const getUsers = async () => {
    return await apiRequests.get('/users' , {
        params : {
            select : '*'
        }
    })
        .then(res => res.data)
        .catch(err => err)
}

const getUserByToken = userToken => {
    return apiRequests.get('/users' , {
        params : {
            userToken : `eq.${userToken}`
        }
        // to return userObj
    }).then(res => res.data[0])
    .catch(err => err)
}

const getUserById = id => {
    return apiRequests.get('/users' , {
        params : {
            id : `eq.${id}`
        }
        // to return userObj
    }).then(res => res.data)
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

export { registerUser , getUsers , checkUserName ,getUserByToken, getUserById , updateUser }