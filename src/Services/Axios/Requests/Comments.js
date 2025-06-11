import apiRequests from "../Configs/configs";

const addComment = newComment => {
    return apiRequests.post('/Comments', newComment)
        .then(res => res)
        .catch(err => err)
}

const getComments = () => {
    return apiRequests.get('/Comments' , {
        params : {
            select : '*'
        }
    })
        .then(res => res.data)
        .catch(err => err)
}

const getCommentsByMovieId = movieId => {
    return apiRequests.get('/Comments', {
        params: {
            movieId: `eq.${movieId}`
        }
    })
        // to return movie Obj
        .then(res => res.data)
        .catch(err => err)
}

const getCommentsByUserId = userId => {
    return apiRequests.get('/Comments', {
        params: {
            userId: `eq.${userId}`
        }
    })
        // to return movie Obj
        .then(res => res.data)
        .catch(err => err)
}

const updateComment = (id, movieObj) => {
    return apiRequests.patch('/Comments', movieObj, {
        params: {
            id: `eq.${id}`
        }
    }).then(res => res)
        .catch(err => err)
}

export {getComments , getCommentsByMovieId , getCommentsByUserId , addComment , updateComment}