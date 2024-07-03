import { API_URL } from "./api/config";

const endpoint = API_URL

export const userCreateUrl = `${endpoint}/users/register/`
export const userEmailConfirmUrl = email => `${endpoint}/users/${email}/confirm/`
export const userTokensURL = `${endpoint}/token/`
export const userStatusUpdate = id => `${endpoint}/users/status/${id}/update/`
