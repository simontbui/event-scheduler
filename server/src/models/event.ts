import { IEvent } from "../types/event";
import { model, Schema, connect } from "mongoose";

const eventSchema: Schema = new Schema(
    {
    firstName1: { type: String, required: true },
    lastName1: { type: String, required: true },
    firstName2: { type: String, required: true },
    lastName2: { type: String, required: true },    
    time: { type: Date, required: true },
    },
    //{ timestamps: true }
)

eventSchema.index({'firstName1': 1, 'lastName1': 1,
                   'firstName2': 1, 'lastName2': 1,
                   'time': 1},
                  { unique: true })

export default model<IEvent>("Event", eventSchema)