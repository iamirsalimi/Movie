import apiRequests from "./../Configs/configs";

const addCast = newCast => {
    return apiRequests.post('/Casts', newCast)
        .then(res => res)
        .catch(err => err)
}

const getCasts = async () => {
    return await apiRequests.get('/Casts', {
        params: {
            select: '*'
        }
    })
        .then(res => res.data)
        .catch(err => err)
}

const getCastById = async id => {
    return await apiRequests.get('/Casts', {
        params: {
            id: `eq.${id}`
        }
    })
        // to return movie Obj
        .then(res => res.data)
        .catch(err => err)
}

const deleteCast = id => {
    return apiRequests.delete('/Casts', {
        params: {
            id: `eq.${id}`
        }
    }).then(res => res.data)
        .catch(err => err)
}

const updateCast = (id, movieObj) => {
    return apiRequests.patch('/Casts', movieObj, {
        params: {
            id: `eq.${id}`
        }
    }).then(res => res)
        .catch(err => err)
}

export { getCasts, getCastById, addCast, updateCast, deleteCast }