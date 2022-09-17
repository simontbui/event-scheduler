import { Response, Request } from "express"
import { IEvent } from "../../types/event"
import Event from "../../models/event"

const getEvents = async (req: Request, res: Response): Promise<void> => {
    try {
        const events: IEvent[] = await Event.find()
        res.status(200).json({ events })
    } catch (error) {
        throw error
    }
}

const addEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<IEvent, "firstName1" | "lastName1" | "firstName2" | "lastName2" | "startTime" | "endTime">

        const event1 = new Event({
            firstName1: body.firstName1,
            lastName1: body.lastName1,
            firstName2: body.firstName2,
            lastName2: body.lastName2,
            startTime: body.startTime, 
            endTime: body.endTime, 
        })

        const event2 = new Event({
            firstName1: body.firstName2,
            lastName1: body.lastName2,
            firstName2: body.firstName1,
            lastName2: body.lastName1,
            startTime: body.startTime, 
            endTime: body.endTime,  
        })

        const existingEvent = await Event.findOne(body)
        if (existingEvent) {
            res.status(201).json({ message: "Event already exists" })
            return
        } 

        await event1.save()
        await event2.save()

        res
            .status(201)
            .json({ message: "Event added", Event1: event1, Event2: event2 }) 
    } catch (error) {
        throw error
    }
}

const updateEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<IEvent, "firstName1" | "lastName1" | "firstName2" | "lastName2" | "startTime" | "endTime" | "newStartTime" | "newEndTime">

        const query1 = {
            firstName1: body.firstName1,
            lastName1: body.lastName1,
            firstName2: body.firstName2,
            lastName2: body.lastName2,
            startTime: body.startTime,
            endTime: body.endTime
        }
       
        const query2 = {
            firstName1: body.firstName2,
            lastName1: body.lastName2,
            firstName2: body.firstName1,
            lastName2: body.lastName1,
            startTime: body.startTime,
            endTime: body.endTime
        }

        await Event.findOneAndUpdate(query1, { startTime: body.newStartTime, endTime: body.newEndTime })
        await Event.findOneAndUpdate(query2, { startTime: body.newStartTime, endTime: body.newEndTime })

        res
        .status(200)
        .json({ message: "Events updated", Event1: query1, Event2: query2 }) 

    } catch (error) {
        throw error
    }
}

const deleteEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<IEvent, "firstName1" | "lastName1" | "firstName2" | "lastName2" | "startTime" | "endTime">
        
        const query1 = {
            firstName1: body.firstName1,
            lastName1: body.lastName1,
            firstName2: body.firstName2,
            lastName2: body.lastName2,
            startTime: body.startTime,
            endTime: body.endTime
        }
       
        const query2 = {
            firstName1: body.firstName2,
            lastName1: body.lastName2,
            firstName2: body.firstName1,
            lastName2: body.lastName1,
            startTime: body.startTime,
            endTime: body.endTime
        }

        await Event.findOneAndDelete(query1)
        await Event.findOneAndDelete(query2)

        res.status(200).json({ message: "Events deleted", Event1: query1, Event2: query2})

    } catch (error) {
        throw error
    }
}

export { getEvents, addEvent, updateEvent, deleteEvent }