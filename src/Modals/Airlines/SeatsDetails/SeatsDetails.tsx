import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import {
    IAirlinesData,
    IPassenger,
    ISeats,
} from '../../../Shared/Interface/airline.intertface'

interface Props {
    airlineStore?: any
    selectedFlightDetails: IAirlinesData
    isChangeSeat: boolean
    setIsChangeSeat: React.Dispatch<React.SetStateAction<boolean>>
    selectedPassangerName: string
    setselectedFlightDetails: any
}
interface ISeat {
    seatNumber: number
    isTaken: boolean
}
const SeatsDetails = observer(
    ({
        selectedFlightDetails,
        setselectedFlightDetails,
        airlineStore,
        isChangeSeat,
        setIsChangeSeat,
        selectedPassangerName,
    }: Props) => {
        const [seats, setSeats] = useState<ISeat[]>([])

        useEffect(() => {
            // debugger
            const seats = selectedFlightDetails?.seats.map((seat: ISeats) => {
                const isTaken = selectedFlightDetails.passaenger.some(
                    (p: IPassenger) => seat.seatNumber === p.seatNumber,
                )
                return { ...seat, isTaken }
            })
            setSeats(seats)
        }, [selectedFlightDetails])

        const changeSeatNumber = (seatNumber: number) => {
            setIsChangeSeat(false)
            const airlineData = JSON.parse(
                localStorage.getItem('airlineData') || 'null',
            )
            console.log(airlineData)

            const updateData = selectedFlightDetails?.passaenger.map(
                (p: IPassenger) => {
                    if (p.name === selectedPassangerName) {
                        return {
                            ...p,
                            seatNumber: seatNumber,
                        }
                    }
                    return p
                },
            )
            console.log(updateData)

            const updatedData = airlineData.map((data: IAirlinesData) => {
                if (data.flights === selectedFlightDetails.flights) {
                    return {
                        ...selectedFlightDetails,
                        passaenger: updateData,
                    }
                } else {
                    return data
                }
            })

            console.log('updated Data -- ', updatedData)
            localStorage.setItem('airlineData', JSON.stringify(updatedData))

            setselectedFlightDetails({
                ...selectedFlightDetails,
                passaenger: updateData,
            })

            airlineStore.setAlotedSeat(seatNumber)

            console.log(seatNumber)
        }
        // console.log(selectedFlightDetails)
        // console.log(seats)

        return (
            <div
                style={{
                    border: '1px solid gray',
                    padding: 2,
                    display: 'flex',
                    flexWrap: 'wrap',
                    width: 300,
                    height: 300,
                }}
            >
                {seats?.map((seat: ISeat, i: number) => (
                    <React.Fragment key={i}>
                        {isChangeSeat ? (
                            seat.isTaken ? (
                                seat.seatNumber === airlineStore.alotedSeat ? (
                                    <button
                                        onClick={() => setIsChangeSeat(false)}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            backgroundColor: 'green',
                                            width: 40,
                                            height: 40,
                                            margin: 10,
                                        }}
                                    >
                                        <p>{seat.seatNumber}</p>
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => setIsChangeSeat(false)}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            backgroundColor: 'red',
                                            width: 40,
                                            height: 40,
                                            margin: 10,
                                        }}
                                    >
                                        <p>{seat.seatNumber}</p>
                                    </button>
                                )
                            ) : (
                                <button
                                    onClick={() =>
                                        changeSeatNumber(seat.seatNumber)
                                    }
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        backgroundColor: 'blue',
                                        width: 40,
                                        height: 40,
                                        margin: 10,
                                    }}
                                >
                                    <p>{seat.seatNumber}</p>
                                </button>
                            )
                        ) : seat.isTaken ? (
                            seat.seatNumber === airlineStore.alotedSeat ? (
                                <button
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        backgroundColor: 'green',
                                        width: 40,
                                        height: 40,
                                        margin: 10,
                                    }}
                                >
                                    <p>{seat.seatNumber}</p>
                                </button>
                            ) : (
                                <button
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        backgroundColor: 'red',
                                        width: 40,
                                        height: 40,
                                        margin: 10,
                                    }}
                                >
                                    <p>{seat.seatNumber}</p>
                                </button>
                            )
                        ) : (
                            <button
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    backgroundColor: 'blue',
                                    width: 40,
                                    height: 40,
                                    margin: 10,
                                }}
                            >
                                <p>{seat.seatNumber}</p>
                            </button>
                        )}
                    </React.Fragment>
                ))}
            </div>
        )
    },
)

export default inject('airlineStore')(SeatsDetails)
