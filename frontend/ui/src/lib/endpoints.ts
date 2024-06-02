const api = import.meta.env.VITE_BACKEND_URI;
const dataAPI = import.meta.env.VITE_DATA_BACKEND_URI;
export const SIGNUP_API = api + "/signup";
export const LOGIN_API = api + "/login";
export const LOGOUT_API = api + "/logout";

export const HEALTHCHECK_API = api + "/healthcheck";
export const SEND_OTP_API = api + "/otp/send";
export const VERIFY_OTP_API = api + "/otp/verify";

export const healthcheckAPI = api + "/healthcheck";
export const sendOtpAPI = api + "/otp/send";
export const verifyOtpAPI = api + "/otp/verify";


export const getUserAPI = api + "/user";
export const setProviderIdAPI = api + "/user/providerId";

export const getDeals = (provider_id: string)=> `${dataAPI}/api/deals/${provider_id}`
export const getBalanceAPI = (provider_id: string)=> `${dataAPI}/api/balance/${provider_id}`
export const getPowerAPI = (provider_id: string)=> `${dataAPI}/beryx/miner_details/power/${provider_id}`
export const getDealInfo = (provider_id: string)=> `${dataAPI}/beryx/deal_info/${provider_id}`