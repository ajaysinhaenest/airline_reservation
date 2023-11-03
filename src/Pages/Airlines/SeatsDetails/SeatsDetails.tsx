import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import {
    IAirlinesData,
    ISeats,
} from '../../../Shared/Interface/airline.intertface'

interface Props {
    airlineStore?: any
    selectedFlightDetails: IAirlinesData
}
interface ISeat {
    seatNumber: string
    isTaken: boolean
}
const SeatsDetails = observer(
    ({ selectedFlightDetails, airlineStore }: Props) => {
        console.log(selectedFlightDetails)
        const [seats, setSeats] = useState<ISeat[]>([])
        useEffect(() => {
            const seats = selectedFlightDetails?.seats.map((seat: any) => {
                const isTaken = selectedFlightDetails.passaenger.some(
                    (p: any) => seat.seatNumber === p.seatNumber,
                )
                return { ...seat, isTaken }
            })
            setSeats(seats)
        }, [selectedFlightDetails])

        console.log(seats)
        return (
            <div style={{ display: 'flex', flexWrap: 'wrap', width: 300 }}>
                {seats?.map((seat: ISeat) => (
                    <>
                        {seat.isTaken ? (
                            seat.seatNumber === airlineStore.alotedSeat ? (
                                <div
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
                                </div>
                            ) : (
                                <div
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
                                </div>
                            )
                        ) : (
                            <div
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
                            </div>
                        )}
                    </>
                ))}
            </div>
        )
    },
)

export default inject('airlineStore')(SeatsDetails)
