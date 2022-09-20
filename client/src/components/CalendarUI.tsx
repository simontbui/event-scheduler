import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React from "react"
import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css";

type Props = {
  events: IEventCalendar[],
  fullName: string
}

const CalendarUI: React.FC<Props> = ({ events, fullName }) => {
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

    return (
        <div>
            {events.length > 0 &&
                <h1 style={{ textAlign: "center"}}>{`${fullName}'s Calendar`}</h1>
        
            }
            <Calendar 
                localizer={localizer} 
                startAccessor="start" 
                endAccessor="end" 
                style={{ height: 500, margin: "50px" }}
                events={events}
                views={["month", "agenda"]}
            />
        </div>
    )

} 

export default CalendarUI