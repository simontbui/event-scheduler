import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import express from "express"
import React, { useState, useCallback } from "react"
import { getEvent } from '../API'
import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css";
import { date2Time } from "../date2Time"

function GetEvent() {
    const [events, setEvents] = useState<IEventCalendar[]>([])
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [fullName, setFullName] = useState<string>("")

    const locales = {
        "en-US": require("date-fns/locale/en-US"),
    };

    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales,
    });

    // const eventPropGetter = useCallback(
    //     (event:any, start:any, end:any, isSelected:any) => ({
    //         style: {fontSize: '12px', fontWeight: "bold"}
    //     }),[]
    // )

    const handleSubmit = (e: any) => {
        e.preventDefault()
        getEvent(firstName, lastName)
        .then(res => {
            let newData: IEventCalendar[] = []
            setFullName(`${res.data.events[0].firstName1} ${res.data.events[0].lastName1}`)
            res.data.events.forEach(obj => 
                newData.push({"title": `${obj.firstName2} ${obj.lastName2}`,
                              "start": new Date(obj.startTime),
                              "end": new Date(obj.endTime)
             })
            )
            setEvents(newData)
        })
        .catch(e => console.log(e))
        console.log(events)
    }

    return (
        <div style={{marginTop: "50px"}}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    id="firstName" 
                    type="text" placeholder="First Name" 
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                    id="lastName"
                    type="text" placeholder="Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                />
                <input type="submit" value="Submit"/>
            </form>

            <div>
                {events.length > 0 &&
                    <h1 style={{ textAlign: "center"}}>{`${fullName}'s Calendar`}</h1>

                }
                <Calendar localizer={localizer} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }}
                events={events}
                views={["month", "agenda"]}
                />
            </div>
        </div>
    )
}

export default GetEvent