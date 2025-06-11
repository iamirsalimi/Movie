import apiRequests from "../Configs/configs";

const addNotification = newNotification => {
    return apiRequests.post('/Notifications', newNotification)
        .then(res => res)
        .catch(err => err)
}

const getNotifications = () => {
    return apiRequests.get('/Notifications' , {
        params : {
            select : '*'
        }
    })
        .then(res => res.data)
        .catch(err => err)
}

const deleteNotification = id => {
    return apiRequests.delete('/Notifications', {
        params: {
            id: `eq.${id}`
        }
    }).then(res => res.data)
        .catch(err => err)
}

const updateNotification = (id, movieObj) => {
    return apiRequests.patch('/movies', movieObj, {
        params: {
            id: `eq.${id}`
        }
    }).then(res => res)
        .catch(err => err)
}

export {getNotifications  , addNotification , updateNotification , deleteNotification}