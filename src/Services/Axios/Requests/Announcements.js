import apiRequests from "../Configs/configs";

const addAnnouncement = newAnnouncement => {
    return apiRequests.post('/Announcements', newAnnouncement)
        .then(res => res)
        .catch(err => err)
}

const getAnnouncements = () => {
    return apiRequests.get('/Announcements' , {
        params : {
            select : '*'
        }
    })
        .then(res => res.data)
        .catch(err => err)
}

const deleteAnnouncement = id => {
    return apiRequests.delete('/Announcements', {
        params: {
            id: `eq.${id}`
        }
    }).then(res => res.data)
        .catch(err => err)
}

const updateAnnouncement = (id, announcementObj) => {
    return apiRequests.patch('/Announcements', announcementObj, {
        params: {
            id: `eq.${id}`
        }
    }).then(res => res)
        .catch(err => err)
}

export {getAnnouncements  , addAnnouncement , updateAnnouncement , deleteAnnouncement}