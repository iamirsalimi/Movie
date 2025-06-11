import apiRequests from "../Configs/configs";

const addRelease = newRelease => {
    return apiRequests.post('/Releases', newRelease)
        .then(res => res)
        .catch(err => err)
}

const getReleases = () => {
    return apiRequests.get('/Releases' , {
        params : {
            select : '*'
        }
    })
        .then(res => res.data)
        .catch(err => err)
}

const deleteRelease = id => {
    return apiRequests.delete('/Releases', {
        params: {
            id: `eq.${id}`
        }
    }).then(res => res.data)
        .catch(err => err)
}

const updateRelease = (id, movieObj) => {
    return apiRequests.patch('/movies', movieObj, {
        params: {
            id: `eq.${id}`
        }
    }).then(res => res)
        .catch(err => err)
}

export {getReleases , addRelease , updateRelease , deleteRelease}