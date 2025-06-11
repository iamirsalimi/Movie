import apiRequests from "../Configs/configs";

const addTicket = newTicket => {
    return apiRequests.post('/tickets', newTicket)
        .then(res => res)
        .catch(err => err)
}

const getTickets = async () => {
    return await apiRequests.get('/tickets' , {
        params : {
            select : '*'
        }
    })
        .then(res => res.data)
        .catch(err => err)
}

const getTicketById = async id => {
    return await apiRequests.get('/tickets', {
        params: {
            id: `eq.${id}`
        }
    })
        // to return movie Obj
        .then(res => res.data)
        .catch(err => err)
}

const getTicketByUserId = async userId => {
    return await apiRequests.get('/tickets', {
        params: {
            userId: `eq.${userId}`
        }
    })
        // to return movie Obj
        .then(res => res.data)
        .catch(err => err)
}

const deleteTicket = id => {
    return apiRequests.delete('/tickets', {
        params: {
            id: `eq.${id}`
        }
    }).then(res => res.data)
        .catch(err => err)
}

const updateTicket = (id, movieObj) => {
    return apiRequests.patch('/tickets', movieObj, {
        params: {
            id: `eq.${id}`
        }
    }).then(res => res)
        .catch(err => err)
}

export {getTickets , getTicketById ,getTicketByUserId , addTicket , updateTicket , deleteTicket}