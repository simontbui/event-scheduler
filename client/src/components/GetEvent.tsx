import React from "react"

type Props = {
    handleGetNameChange: (e: any) => void,
    handleSubmit: (e: any) => void
    events: IEventCalendar[],
    fullName: string
}

const GetEvent: React.FC<Props> = ({ handleGetNameChange, handleSubmit, events, fullName }) => {
    return (
        <div style={{marginTop: "50px"}}>
            <p>Check Someone's Schedule</p>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    id="firstName" 
                    type="text" placeholder="First Name" 
                    onChange={(e) => handleGetNameChange(e)}
                />
                <input
                    id="lastName"
                    type="text" placeholder="Last Name"
                    onChange={(e) => handleGetNameChange(e)}
                />
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}

export default GetEvent