import apiRequests from "./../Configs/configs";

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

const getNotificationById = async id => {
    return await apiRequests.get('/Notifications', {
        params: {
            id: `eq.${id}`
        }
    })
        // to return movie Obj
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

const updateNotification = (id, notifObj) => {
    return apiRequests.patch('/Notifications', notifObj, {
        params: {
            id: `eq.${id}`
        }
    }).then(res => res)
        .catch(err => err)
}

export {getNotifications  , getNotificationById , addNotification , updateNotification , deleteNotification}