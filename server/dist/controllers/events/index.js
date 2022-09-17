"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.addEvent = exports.getEvents = void 0;
const event_1 = __importDefault(require("../../models/event"));
const getEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield event_1.default.find();
        res.status(200).json({ events });
    }
    catch (error) {
        throw error;
    }
});
exports.getEvents = getEvents;
const addEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const event1 = new event_1.default({
            firstName1: body.firstName1,
            lastName1: body.lastName1,
            firstName2: body.firstName2,
            lastName2: body.lastName2,
            startTime: body.startTime,
            endTime: body.endTime,
        });
        const event2 = new event_1.default({
            firstName1: body.firstName2,
            lastName1: body.lastName2,
            firstName2: body.firstName1,
            lastName2: body.lastName1,
            startTime: body.startTime,
            endTime: body.endTime,
        });
        const existingEvent = yield event_1.default.findOne(body);
        if (existingEvent) {
            res.status(201).json({ message: "Event already exists" });
            return;
        }
        yield event1.save();
        yield event2.save();
        res
            .status(201)
            .json({ message: "Event added", Event1: event1, Event2: event2 });
    }
    catch (error) {
        throw error;
    }
});
exports.addEvent = addEvent;
const updateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const query1 = {
            firstName1: body.firstName1,
            lastName1: body.lastName1,
            firstName2: body.firstName2,
            lastName2: body.lastName2,
            startTime: body.startTime,
            endTime: body.endTime
        };
        const query2 = {
            firstName1: body.firstName2,
            lastName1: body.lastName2,
            firstName2: body.firstName1,
            lastName2: body.lastName1,
            startTime: body.startTime,
            endTime: body.endTime
        };
        yield event_1.default.findOneAndUpdate(query1, { startTime: body.newStartTime, endTime: body.newEndTime });
        yield event_1.default.findOneAndUpdate(query2, { startTime: body.newStartTime, endTime: body.newEndTime });
        res
            .status(200)
            .json({ message: "Events updated", Event1: query1, Event2: query2 });
    }
    catch (error) {
        throw error;
    }
});
exports.updateEvent = updateEvent;
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const query1 = {
            firstName1: body.firstName1,
            lastName1: body.lastName1,
            firstName2: body.firstName2,
            lastName2: body.lastName2,
            startTime: body.startTime,
            endTime: body.endTime
        };
        const query2 = {
            firstName1: body.firstName2,
            lastName1: body.lastName2,
            firstName2: body.firstName1,
            lastName2: body.lastName1,
            startTime: body.startTime,
            endTime: body.endTime
        };
        yield event_1.default.findOneAndDelete(query1);
        yield event_1.default.findOneAndDelete(query2);
        res.status(200).json({ message: "Events deleted", Event1: query1, Event2: query2 });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteEvent = deleteEvent;
