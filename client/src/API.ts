import axios, { AxiosResponse } from 'axios'

const APIURI: string = "http://localhost:8000"

export const getEvent = async(): Promise<AxiosResponse<IEvent[]>> => {
    try {
        const event: AxiosResponse = await axios.get(
            APIURI + '/events'
        )
        //console.log("======================")
        //console.log(event.data.event)
        //"firstName1":"Simon","lastName1":"BuiABC"
        return event.data.events
    } catch (error) {
        throw error
    }
}
