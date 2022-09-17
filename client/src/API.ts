import axios, { AxiosResponse } from 'axios'

const APIURI: string = "http://localhost:8000"

export const getEvent = async(): Promise<AxiosResponse<IEvent[]>> => {
    try {
        const event: AxiosResponse = await axios.get(
            APIURI + '/events'
        )
        //console.log("======================")
        //console.log(event.data.event)
        return event.data.events
    } catch (error) {
        throw error
    }
}
