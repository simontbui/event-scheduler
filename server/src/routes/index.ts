import { Router } from "express"
import { getAllEvents, getEvents, addEvent, updateEvent, deleteEvent } from "../controllers/events"

const router: Router = Router()

router.get("/all-events", getAllEvents)

router.get("/events/:firstName1/:lastName1", getEvents) 

router.post("/add-event", addEvent)

router.put("/update-event", updateEvent)

router.delete("/delete-event", deleteEvent)
export default router