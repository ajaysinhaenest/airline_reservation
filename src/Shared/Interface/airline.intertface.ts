export {}

export interface IPassenger {
    id?: number
    name: string
    seatNumber: number
}

export interface ISeats {
    id?: number
    seatNumber: number
    status?: string
}

export interface IAirlinesData {
    flights: string
    passaenger: IPassenger[]
    totalSeats: number
    seats: ISeats[]
    // alotedSeats: []
}
