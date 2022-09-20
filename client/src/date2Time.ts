export const date2Time = (time: any) => {
    let d = new Date(time)
    const amPM = d.getHours() >= 12
    let hours = d.getHours() % 12
    if (!hours) hours += 12

    let minutes: number|any = d.getMinutes()
    if (minutes === 0) minutes = "00"

    return `${hours}:${minutes} ${amPM ? "PM" : "AM"}`
  }