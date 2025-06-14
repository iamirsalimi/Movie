import dayjs from 'dayjs'

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

const calculateAge = actorBirthDate => {
  const today = new Date()
  const birthDate = new Date(actorBirthDate)

  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDifference = today.getMonth() - birthDate.getMonth()

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  return age
}

const checkUserSubscriptionStatus = async userObj => {
  // which means user has no vip plan so it's not necessary to check user vipPlan  
  if (!userObj.subscriptionExpiresAt) {
    return false
  }

  const now = dayjs()
  const expireDate = dayjs(userObj.subscriptionExpiresAt);

  if (expireDate.isBefore(now)) {
    const updatedUser = {
      ...userObj,
      subscriptionStatus: 'expired',
      subscriptionPlan: {},
      subscriptionExpiresAt: '',
    }

    return updatedUser
  }

  // user still has subscription
  return false
}

const checkUserBanStatus = async userObj => {
  // user isn't banned 
  if (userObj.accountStatus != 'temporary-banned') return false

  const now = dayjs()
  const banEnd = dayjs(userObj.ban_expiration_date)

  if (banEnd.isBefore(now)) {
    const updatedUser = {
      ...userObj,
      accountStatus: 'active',
      isBanned: false,
      banReason: "",
      banDuration: null,
      ban_expiration_date: null,
    }

    return updatedUser
  }


  // user is still banned 
  return false
}

export { findArrayByIds, setCookie, getCookie, deleteCookie, calculateAge, checkUserSubscriptionStatus , checkUserBanStatus }