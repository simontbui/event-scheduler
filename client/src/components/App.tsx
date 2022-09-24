import React, { useState, useCallback } from 'react';
import AddEvent from './AddEvent'
import GetEvent from './GetEvent'
import CalendarUI from './CalendarUI'
import { getEvent, addEvent, updateEvent, deleteEvent } from '../API'
import { calculateNewValue } from '@testing-library/user-event/dist/utils';

const App: React.FC = () => {
    //state variables for adding to schedule
    const [startTime, setStartTime] = useState<any>()
    const [endTime, setEndTime] = useState<any>()

    //state variables for check/GETing someone's schedule
    const [events, setEvents] = useState<IEventCalendar[]>([])
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [fullName, setFullName] = useState<string>("")

    //state variable of meetings on calendarUI
    const [firstName2, setFirstName2] = useState<string>("")
    const [lastName2, setLastName2] = useState<string>("")
    const [currStartTime, setCurrStartTime] = useState<any>()
    const [currEndTime, setCurrEndTime] = useState<any>()
    const [newStartTime, setNewStartTime] = useState<any>()
    const [newEndTime, setNewEndTime] = useState<any>()

    //GET meetings for a person
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
            .catch(err => console.log(err))
      }

    const handleGetNameChange = (e: any): void => {
        if (e.target.id === "firstName") {
            setFirstName(e.target.value)
        } else if (e.target.id === "lastName") {
            setLastName(e.target.value)
        }
    }
    //-----------------END GET MEETING

    // const onDoubleClickEvent = useCallback((calEvent:any) => {
    //   console.log(calEvent)
    //     setFirstName2(calEvent.title.split(" ")[0])
    //     setLastName2(calEvent.title.split(" ")[1])
    //     setCurrStartTime(new Date(calEvent.start))
    //     setCurrEndTime(new Date(calEvent.end))
    //     // console.log(firstName2)
    // }, [])

    //Add meeting
    const handleDateSelect = (e: any, id: string): void => {
      if (id === "startTime") {
          setStartTime(e)
      } else if (id === "endTime") {
          setEndTime(e)
      }
  }

    const handleSubmitSchedule = (e: any): void => {
        e.preventDefault()
        const firstName1: string = e.target[0].value
        const lastName1: string = e.target[1].value
        const firstName2: string = e.target[2].value
        const lastName2: string = e.target[3].value
        const startTime: Date = e.target[4].value
        const endTime: Date = e.target[5].value

        addEvent({firstName1, lastName1, firstName2, lastName2, startTime, endTime})
            .then(res => { 
                const newEvent: IEventCalendar = {
                    "title": `${res.data.Event1.firstName1} ${res.data.Event1.firstName2}`,
                    "start": new Date(res.data.Event1.startTime),
                    "end": new Date(res.data.Event1.endTime)
                }
                if (events) {
                    setEvents([...events, newEvent])
                } else {
                  setEvents([newEvent])
                }
            })
            .catch(err => console.log(err))
    }
    // ------------------------------------------------END ADD EVENT

    //Updating/Deleting meeting on CalendarUI
    const [modal, setModal] = useState<boolean>(false)

    const toggleModal = (e: any) => {
        if ("title" in e && "start" in e && "end" in e) {
            setFirstName2(e.title.split(" ")[0])
            setLastName2(e.title.split(" ")[1])
            setCurrStartTime(new Date(e.start))
            setCurrEndTime(new Date(e.end))
        }
        setModal(!modal)
    }

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    const handleUpdateTime = (e: any, id: string) => {
      if (id === "newStartTime") {
          setNewStartTime(new Date(e))
      } else if (id === "newEndTime") {
          setNewEndTime(new Date(e))
      }        
  }

    const handleSubmitUpdate = (): void => {
        if (newStartTime instanceof Date && newEndTime instanceof Date) {
            updateEvent(firstName, lastName, firstName2, lastName2, currStartTime, currEndTime,
                        newStartTime, newEndTime)
                .then(res => {
                    const newEvents: IEventCalendar[] = events.map(obj => {
                        if (obj.title === `${firstName2} ${lastName2}`
                        && obj.start.getTime() === currStartTime.getTime() 
                        && obj.end.getTime() == currEndTime.getTime()
                        ) {
                          return {"title": `${firstName2} ${lastName2}`,
                                  "start": newStartTime,
                                  "end": newEndTime
                                }
                          }
                        return obj 
                    })
                    setEvents(newEvents)
                    setModal(!modal)
                })
                .catch(err => console.log(err))
        }
  }

    const handleSubmitCancel = (): void => {
        deleteEvent(firstName, lastName, firstName2, lastName2, currStartTime, currEndTime)
            .then(() => {
                const newEvents: IEventCalendar[] = events.filter(obj => {
                    if (obj.title != `${firstName} ${lastName}` &&
                        obj.start.getTime() != currStartTime.getTime() &&
                        obj.end.getTime() != currEndTime.getTime()
                       ) return obj
                })
                setEvents(newEvents)
                setModal(!modal)
            })
            .catch(err => console.log(err))
    }
    //----------------------------------END UPDATE/DELETE EVENT

    return (
        <div className="parent-container">
            <div className="calendar-div">
                <CalendarUI
                    events={events}
                    fullName={fullName}
                    firstName={firstName}
                    lastName={lastName}  
                    modal={modal}
                    toggleModal={toggleModal}
                    handleUpdateTime={handleUpdateTime}
                    handleSubmitUpdate={handleSubmitUpdate}
                    handleSubmitCancel={handleSubmitCancel}
                    newStartTime={newStartTime}
                    newEndTime={newEndTime}
                />
            </div>

            <div className="add-get-forms">
                <AddEvent
                    handleSubmitSchedule={handleSubmitSchedule}
                    handleDateSelect={handleDateSelect}
                    startTime={startTime}
                    endTime={endTime}
                />
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
