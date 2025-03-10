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