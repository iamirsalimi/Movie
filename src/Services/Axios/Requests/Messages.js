import apiRequests from "../Configs/configs";

const addMessage = newMessage => {
    return apiRequests.post('/ticketMessages', newMessage)
        .then(res => res)
        .catch(err => err)
}

const getMessages = () => {
    return apiRequests.get('/ticketMessages' , {
        params : {
            select : '*'
        }
    })
        .then(res => res.data)
        .catch(err => err)
}

const getMessagesByTicketId = ticketId => {
    return apiRequests.get('/ticketMessages' , {
        params : {
            ticket_id : `eq.${ticketId}`
        }
    })
        .then(res => res.data)
        .catch(err => err)
}

export {getMessages , getMessagesByTicketId , addMessage}