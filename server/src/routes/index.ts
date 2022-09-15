import { Router } from "express"
import { getEvents, addEvent, updateEvent, deleteEvent } from "../controllers/events"

const router: Router = Router()

router.get("/events", getEvents)

router.post("/add-event", addEvent)

router.put("/update-event", updateEvent)

router.delete("/delete-event", deleteEvent)
export default router