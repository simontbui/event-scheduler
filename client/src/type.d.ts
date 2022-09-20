interface IEvent {
    firstName1: string
    lastName1: string
    firstName2: string
    lastName2: string
    startTime: Date
    endTime: Date
}

interface IEventCalendar {
    title: string
    start: Date
    end: Date
}

type EventProps = {
    event: IEvent
}
