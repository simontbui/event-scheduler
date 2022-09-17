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
                    <p>{events[0].firstName1}</p>
                    <p>{events[0].lastName1}</p>
                    <p>{events[0].time}</p>
                </div>
            }
        </div>
    )
}

export default GetEvent