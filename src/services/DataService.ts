import axios, { AxiosResponse } from "axios"

export const DataService = {
    async getContributionDates() {
        return axios.get<AxiosResponse<Object>>(import.meta.env.VITE_API_URL)
    }
}