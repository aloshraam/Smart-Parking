import commonAPI from './commonAPI'
import SERVER_URL from './SERVERURL'


// register API
export const registerAPI = async (reqBody) =>{
    return await commonAPI("POST", `${SERVER_URL}/register`, reqBody)
}

// login API
export const loginAPI = async (reqBody) =>{
    return await commonAPI("POST", `${SERVER_URL}/login`, reqBody)
}

// udpate profile API
export const updateProfileAPI = async (reqHeader,reqBody) =>{
    return await commonAPI("PATCH", `${SERVER_URL}/update-profile`,reqHeader,reqBody)
}

// gets all the booked slot in the paticular data
export const getBookedSlotsAPI = async(reqBody, reqHeader) => {
    return await commonAPI("POST", `${SERVER_URL}/booked-details`, reqBody, reqHeader)
}

// booking slot api
export const newSlotBookingAPI = async(reqBody, reqHeader) => {
    return await commonAPI("POST", `${SERVER_URL}/booking`, reqBody, reqHeader)
}

