import React, { useState } from 'react';
import AddEvent from './AddEvent'
import GetEvent from './GetEvent'
import CalendarUI from './CalendarUI'
import { getEvent } from '../API'

const App: React.FC = () => {
  const [events, setEvents] = useState<IEventCalendar[]>([])
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [fullName, setFullName] = useState<string>("")

  const handleSubmit = (e: any): void => {
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

  const handleGetNameChange = (e: any): void => {
      if (e.target.id === "firstName") {
          setFirstName(e.target.value)
      } else if (e.target.id === "lastName") {
          setLastName(e.target.value)
      }
  }

  return (
      <div className="parent-container">
        <div className="calendar-div">
          <CalendarUI
            events={events}
            fullName={fullName}
          />
        </div>
        <div className="add-get-forms">
          <AddEvent/>
          <GetEvent
            handleGetNameChange={handleGetNameChange}
            handleSubmit={handleSubmit}
            events={events}
            fullName={fullName}
          />
        </div>
      </div>
  );
}

export default App;
