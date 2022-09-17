"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const eventSchema = new mongoose_1.Schema({
    firstName1: { type: String, required: true },
    lastName1: { type: String, required: true },
    firstName2: { type: String, required: true },
    lastName2: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true }
});
eventSchema.index({ 'firstName1': 1, 'lastName1': 1,
    'firstName2': 1, 'lastName2': 1,
    'startTime': 1, 'endTime': 1 }, { unique: true });
exports.default = (0, mongoose_1.model)("Event", eventSchema);
