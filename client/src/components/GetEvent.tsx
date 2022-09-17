import React, { useEffect, useState } from "react"
import { getEvent } from '../API'

function GetEvent() {
    const [events, setEvents] = useState<IEvent[]|any>([])
    
    const handleGetEvent = (): void => {
        getEvent()
        .then(res => setEvents(res))
        .catch(e => console.log(e))
    }

    return (
        <div>
            <p>HELLO</p>
            <button onClick={handleGetEvent}>GET</button>
            {events.length > 0 &&
                <div>
                    <span>{events[0].firstName1 + " "}</span>
                    <span>{events[0].lastName1 + " "}</span>
                    <span>{events[0].startTime + " "}</span>
                    <span>{events[0].endTime}</span>
                </div>
            }
        </div>
    )
}

export default GetEvent