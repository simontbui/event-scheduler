import { IEvent } from "../types/event";
import { model, Schema, connect } from "mongoose";

const eventSchema: Schema = new Schema(
    {
    firstName1: { type: String, required: true },
    lastName1: { type: String, required: true },
    firstName2: { type: String, required: true },
    lastName2: { type: String, required: true },    
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true }
    },
)

eventSchema.index({'firstName1': 1, 'lastName1': 1,
                   'firstName2': 1, 'lastName2': 1,
                   'startTime': 1, 'endTime': 1},
                  { unique: true })

export default model<IEvent>("Event", eventSchema)