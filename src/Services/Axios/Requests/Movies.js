import apiRequests from "../Configs/configs";

const addMovie = newMovie => {
    return apiRequests.post('/Movies', newMovie)
        .then(res => res)
        .catch(err => err)
}

const getMovies = () => {
    return apiRequests.get('/Movies' , {
        params : {
            select : '*'
        }
    })
        .then(res => res.data)
        .catch(err => err)
}

const getMovieById = id => {
    return apiRequests.get('/Movies', {
        params: {
            id: `eq.${id}`
        }
    })
        // to return movie Obj
        .then(res => res.data[0])
        .catch(err => err)
}

const getMovieByTitle = title => {
    return apiRequests.get('/Movies', {
        params: {
            title: `eq.${title}`
        }
    })
        // to return movie Obj
        .then(res => res.data)
        .catch(err => err)
}

const deleteMovie = id => {
    return apiRequests.delete('/Movies', {
        params: {
            id: `eq.${id}`
        }
    }).then(res => res.data)
        .catch(err => err)
}

const updateMovie = (id, movieObj) => {
    return apiRequests.patch('/movies', movieObj, {
        params: {
            id: `eq.${id}`
        }
    }).then(res => res)
        .catch(err => err)
}

export {getMovies , getMovieById , getMovieByTitle , addMovie , updateMovie , deleteMovie}