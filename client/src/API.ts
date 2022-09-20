import axios, { AxiosResponse } from 'axios'

const APIURI: string = "http://localhost:8000"

export const getEvent = async(firstName1: string, lastName1: string): Promise<AxiosResponse<{events: IEvent[]}>> => {
    try {
        const events = await axios.get(`${APIURI}/events/${firstName1}/${lastName1}`)
        return events
    } catch (error) {
        throw error
    }
}
