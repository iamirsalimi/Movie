// random number for id
function getRandom(length) {
    return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
}

// class for making new comment Object for reply or adding 
class CommentObj {
    constructor(userId, userName, userRule, commentText, hasSpoil, replied, repliedTo,) {
        this.id = getRandom(10)
        this.userId = userId
        this.userName = userName
        this.userRule = userRule
        this.commentText = commentText
        this.hasSpoil = hasSpoil
        this.likes = []
        this.replied = replied
        this.repliedTo = repliedTo
        this.replies = []
        this.date = new Date()
        this.accepted = false
    }
}

// adding comment by making an object and adding it to the comment object
const addCommentHandler = (userId, userName, userRule, commentText, hasSpoil, replied, repliedTo) => {
    let newCommentObj = new CommentObj(userId, userName, userRule, commentText, hasSpoil, replied, repliedTo)

    return newCommentObj
}

// this function will find ids in mainArray and return the main Object of Ids we use this for finding similar movies and casts , in movie object we have two property "similar" and "casts" in both we have an array of ids and we should extract the main object of each value accord ids (on casts property in movie's object , we have an array which has object per indexes but in "similar" in movie's property we have ids per indexes so we use casts flag to realize when we have to use object instead of primitive type values) 
const findArrayByIds = (idsArray, mainArray, castsFlag) => {
    let extractedArray = idsArray.reduce((prev, realId) => {
        if (castsFlag) {
            return [...prev, mainArray.find(item => item.id == realId.id)]
        }
        return [...prev, mainArray.find(item => item.id == realId)]
    }, [])

    return extractedArray
}


const setCookie = (cookieName, cookieValue, cookieDay) => {
    if (cookieDay == -1) {
        document.cookie = `${cookieName}=${cookieValue}; path=/; Expires=sesstion; SameSite=Strict; Secure`;
        return;
    }

    const date = new Date()
    date.setTime(date.getTime() + (cookieDay * 24 * 60 * 60 * 1000))
    const expires = date.toUTCString()

    document.cookie = `${cookieName}=${cookieValue}; path=/; Expires=${expires}; SameSite=Strict; Secure`;
}


const getCookie = (cookieName) => {
    const cookies = document.cookie.split('; ');

    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name === cookieName) {
            return value;
        }
    }

    return null
}

const deleteCookie = (cookieName, cookieValue) => {
    const date = new Date()
    date.setTime(date.getTime() - (10 * 24 * 60 * 60 * 1000))
    const expires = date.toUTCString()

    document.cookie = `${cookieName}=${cookieValue}; path=/; Expires=${expires}; SameSite=Strict; Secure`;
    location.reload()
}

let apiData = {
    getApi: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/users?userToken=eq.',
    api: 'https://xdxhstimvbljrhovbvhy.supabase.co/rest/v1/users',
    apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8',
    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkeGhzdGltdmJsanJob3Zidmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDY4NTAsImV4cCI6MjA2MjQ4Mjg1MH0.-EttZTOqXo_1_nRUDFbRGvpPvXy4ONB8KZGP87QOpQ8'
}

// const getUserInfo = async (token) => {
//     let userObj = null
//     await fetch(`${apiData.getApi}${token}`, {
//         headers: {
//             'apikey': apiData.apikey,
//             'Authorization': apiData.authorization
//         }
//     }).then(res => res.json())
//         .then(data => {
//             if (data.length > 0) {
//                 userObj = data[0]
//             }
//         })
//         .catch(err => {
//             userObj = null
//             console.log(err)
//         })

//     return userObj
// }

const getUserInfo = async (token) => {
  try {
    const res = await fetch(`${apiData.getApi}${token}`, {
      headers: {
        'apikey': apiData.apikey,
        'Authorization': apiData.authorization
      }
    })

    const data = await res.json();

    if (data.length === 0) {
      return null;
    }

    return data[0]
  } catch (err) {
    console.log('fetch error')
    return null
  }
};




export { addCommentHandler, findArrayByIds, setCookie, getCookie ,getUserInfo , deleteCookie }