import React from 'react';

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
            <input
                type="datetime-local" placeholder="Start Time"
                id="startTime"
            />
            <input
                type="datetime-local" placeholder="End Time"
                id="endTime"
            />
        </div>
        </>
    );
}

export default AddEvent
