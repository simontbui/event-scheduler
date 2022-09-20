import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"


function AddEvent() {
    return (
        <>
        <div>
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
            placeholderText="Start Date" 
            showTimeSelect 
            onChange={(e) => (console.log(e))}
            />

            <DatePicker 
            placeholderText="End Date" 
            showTimeSelect
            onChange={(e) => (console.log(e))}
            />
        </div>
        </>
    );
}

export default AddEvent
