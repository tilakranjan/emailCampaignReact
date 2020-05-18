
export function convertDate(date) {
    const DateObj = new Date(date)
    return `${DateObj.getMonth() + 1}/${DateObj.getDate()}/${DateObj.getFullYear()}`
}

export function convertTime(date) {
    const DateObj = new Date(date)
    const hours = DateObj.getHours()
    const min = DateObj.getMinutes()

    return `${hours > 9 ? hours : `0${hours}`}:${min > 9 ? min : `0${min}`}`
}

export const checkEmail = email => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if(!regex.test(email)) {
        return true
    }
    return false;
}

