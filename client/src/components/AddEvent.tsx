import React from 'react';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

type Props = {
    handleSubmitSchedule: (e: any) => void,
    handleDateSelect: (e: any, id: any) => void,
    startTime: Date,
    endTime: Date
}

const AddEvent: React.FC<Props> = ({ handleSubmitSchedule, handleDateSelect, startTime, endTime }) => {
    return (
        <>
            <p>Schedule Meeting</p>
            <form onSubmit={(e) => handleSubmitSchedule(e)}>      
                <div className="add-first-person">
                    <input
                        type='text' placeholder="First Name"
                        id="firstName1"
                    />
                    <input
                        type="text" placeholder="Last Name"
                        id="lastName1"
                    />
                </div>
                <div className="add-second-person">
                    <input
                        type='text' placeholder="First Name"
                        id="firstName1"
                    />
                    <input
                        type="text" placeholder="Last Name"
                        id="lastName1"
                    />
                </div>
                <div>
                    <DatePicker 
                    id="startTime"
                    selected={startTime}
                    placeholderText="Start Time" 
                    showTimeSelect 
                    onChange={(e, id) => handleDateSelect(e, "startTime")}
                    dateFormat="MM/dd/yyyy h:mm a"
                    />

                    <DatePicker
                    id="endTime" 
                    selected={endTime}
                    placeholderText="End Time" 
                    showTimeSelect
                    onChange={(e, id) => handleDateSelect(e, "endTime")}
                    dateFormat="MM/dd/yyyy h:mm a"
                    />
                </div>
                <button>Schedule</button>
            </form>
        </>
    );
}

export default AddEvent
