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
        const body = req.body as Pick<IEvent, "firstName1" | "lastName1" | "firstName2" | "lastName2" | "time">
        console.log(req.body)
        console.log("===================================")
        const event1 = new Event({
            firstName1: body.firstName1,
            lastName1: body.lastName1,
            firstName2: body.firstName2,
            lastName2: body.lastName2,
            time: body.time, 
        })

        const event2 = new Event({
            firstName1: body.firstName2,
            lastName1: body.lastName2,
            firstName2: body.firstName1,
            lastName2: body.lastName1,
            time: body.time, 
        })

        const existingEvent = await Event.findOne({event1})
        console.log(existingEvent)
        if (existingEvent) {
            res.status(201).json({ message: "Event already exists" })
        } 

        await event1.save()
        await event2.save()
        //const allEvents: IEvent[] = await Event.find()

        res
            .status(201)
            .json({ message: "Event added" }) //, event: newEvent, events: allEvents })
    } catch (error) {
        throw error
    }
}

const updateEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<IEvent, "firstName1" | "lastName1" | "firstName2" | "lastName2" | "time">

        const query1 = {
            firstName1: body.firstName1,
            lastName1: body.lastName1,
            firstName2: body.firstName2,
            lastName2: body.lastName2
        }
       
        const query2 = {
            firstName1: body.firstName2,
            lastName1: body.lastName2,
            firstName2: body.firstName1,
            lastName2: body.lastName1
        }

        await Event.findOneAndUpdate(query1, { time: body.time })
        await Event.findOneAndUpdate(query2, { time: body.time })

        res
        .status(200)
        .json({ message: "Event updated" }) 

    } catch (error) {
        throw error
    }
}

const deleteEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick<IEvent, "firstName1" | "lastName1" | "firstName2" | "lastName2" | "time">
        
        const query1 = {
            firstName1: body.firstName1,
            lastName1: body.lastName1,
            firstName2: body.firstName2,
            lastName2: body.lastName2,
            time: body.time
        }
       
        const query2 = {
            firstName1: body.firstName2,
            lastName1: body.lastName2,
            firstName2: body.firstName1,
            lastName2: body.lastName1,
            time: body.time
        }

        await Event.findOneAndDelete(query1)
        await Event.findOneAndDelete(query2)

        res.status(200).json({ message: "Event deleted"})

    } catch (error) {
        throw error
    }
}

export { getEvents, addEvent, updateEvent, deleteEvent }