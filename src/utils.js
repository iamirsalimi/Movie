
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

export { addCommentHandler, findArrayByIds }