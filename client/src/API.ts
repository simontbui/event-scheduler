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

export const addEvent = async(event: IEvent): Promise<AxiosResponse<any>> => {
    try {
        const newEvent = await axios.post(`${APIURI}/add-event`, event)
        return newEvent
    } catch (error) {
        throw error
    }
}

export const updateEvent = async(firstName1: string, lastName1: string,
                                 firstName2: string, lastName2: string,
                                 startTime: Date, endTime: Date,
                                 newStartTime: Date, newEndTime: Date): 
                            Promise<AxiosResponse> => {
    try {
        const data = {
            "firstName1": firstName1, "lastName1": lastName1,
            "firstName2": firstName2, "lastName2": lastName2,
            "startTime": startTime, "endTime": endTime,
            "newStartTime": newStartTime, "newEndTime": newEndTime
        }

        const updatedEvent: AxiosResponse = await axios.put(`${APIURI}/update-event`, data)
        return updatedEvent

    } catch (error) {
        throw error
    }
}

export const deleteEvent = async(firstName1: string, lastName1: string,
                                 firstName2: string, lastName2: string,
                                 startTime: Date, endTime: Date): Promise<void> => {
    try {
        const event: IEvent = {
            "firstName1": firstName1, "lastName1": lastName1,
            "firstName2": firstName2, "lastName2": lastName2,
            "startTime": startTime, "endTime": endTime,
        }

        await axios.delete(`${APIURI}/delete-event`, { data: event })
    } catch (error) {
        throw error
    }
}