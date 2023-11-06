import { ISeats } from '../Interface/airline.intertface'

const getSeatNumber = (seats: ISeats[]) => {
    const randomIndex = Math.floor(Math.random() * seats.length)
    const randomObject = seats[randomIndex]
    return randomObject.seatNumber
}

export { getSeatNumber }
