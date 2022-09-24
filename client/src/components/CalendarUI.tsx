import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react"
import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { updateEvent } from "../API"

type Props = {
  events: IEventCalendar[],
  fullName: string,
  firstName: string,
  lastName: string,
  newStartTime: Date,
  newEndTime: Date,
  modal: boolean,
  toggleModal: (e: any) => void,
  handleUpdateTime: (e: any, id: string) => void
  handleSubmitUpdate: () => void,
  handleSubmitCancel: () => void
}

const CalendarUI: React.FC<Props> = ({ events, fullName, firstName, lastName, 
                                       newStartTime, newEndTime, modal,handleSubmitCancel,
                                       toggleModal, handleUpdateTime, handleSubmitUpdate
                                    }) => {
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
        <>
            {events.length > 0 &&
                <h3 style={{ textAlign: "center"}}>{`${fullName}'s Calendar`}</h3>
        
            }
            <Calendar 
                localizer={localizer} 
                startAccessor="start" 
                endAccessor="end" 
                style={{ height: 500, width: 800, margin: "75px" }}
                events={events}
                views={["month", "agenda"]}
                onDoubleClickEvent={(e) => toggleModal(e)}
            />

            {modal &&
                <div className="modal-content">
                    <h2>Update Schedule</h2>
                    <DatePicker 
                        id="newStartTime"
                        placeholderText="New Start Time"
                        selected={newStartTime}
                        showTimeSelect
                        onChange={(e, id) => handleUpdateTime(e, "newStartTime")}
                        dateFormat="MM/dd/yyyy h:mm a"
                    />
                    <DatePicker 
                        id="newEndTime"
                        placeholderText="New End Time"
                        selected={newEndTime}
                        showTimeSelect
                        onChange={(e, id) => handleUpdateTime(e, "newEndTime")}
                        dateFormat="MM/dd/yyyy h:mm a"
                    />

                    <div className="popup-btns">
                        <button 
                            className="update-btn" 
                            onClick={handleSubmitUpdate}
                        >
                            Update Meeting
                        </button>

                        <button 
                            className="cancel-btn"
                            onClick={handleSubmitCancel}
                        >
                            Cancel Meeting
                        </button>
                    </div>

                    <button className="close-modal" onClick={toggleModal}>
                        <span aria-hidden="true">&#10006;</span>
                    </button>
                </div>
            }
        </>
    )

} 

export default CalendarUI