import axios from 'axios'
import { userCreateUrl, userEmailConfirmUrl } from '../constant'


export const userSignUp = async ({ formData }) => {
    const response = await axios.post(userCreateUrl, formData)
    return response.data
}

export const userEmailConfirm = async ({ formData }) => {
    const response = await axios.post(userEmailConfirmUrl, formData)
    return response.data
}