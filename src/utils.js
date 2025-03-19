
// random number for id
function getRandom(length) {
    return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
}

// class for making new comment Object for reply or adding 
class CommentObj {
    constructor(userId , userName, userRule, commentText, hasSpoil, replied, repliedTo,) {
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
const addCommentHandler = (userId , userName ,userRule , commentText, hasSpoil, replied, repliedTo) => {
    let newCommentObj = new CommentObj(userId , userName, userRule , commentText, hasSpoil, replied, repliedTo)

    return newCommentObj
}

export {addCommentHandler}