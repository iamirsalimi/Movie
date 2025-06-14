import apiRequests from "./../Configs/configs";

const addRequest = newRequest => {
    return apiRequests.post('/requests', newRequest)
        .then(res => res)
        .catch(err => err)
}

const getRequests = () => {
    return apiRequests.get('/requests' , {
        params : {
            select : '*'
        }
    })
        .then(res => res.data)
        .catch(err => err)
}

const getRequestsByUserId = userId => {
    return apiRequests.get('/requests', {
        params: {
            userId: `eq.${userId}`
        }
    })
        // to return movie Obj
        .then(res => res.data)
        .catch(err => err)
}

const updateRequest = (id, requestObj) => {
    return apiRequests.patch('/requests', requestObj, {
        params: {
            id: `eq.${id}`
        }
    }).then(res => res)
        .catch(err => err)
}

export {getRequests , getRequestsByUserId , addRequest , updateRequest}