import { useEffect, useState } from 'react'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import {
    IAirlinesData,
    IPassenger,
} from '../../../Shared/Interface/airline.intertface'

interface Props {
    airlineStore?: any
    selectedFlightName: string
    setSelectedFlightName: React.Dispatch<React.SetStateAction<string>>
    selectedFlightDetails: IAirlinesData
    selectedPassangerName: string
    setSelectedPassangerName: React.Dispatch<React.SetStateAction<string>>
}

const PassengersInfo = observer(
    ({
        airlineStore,
        selectedFlightName,
        setSelectedFlightName,
        selectedFlightDetails,
        selectedPassangerName,
        setSelectedPassangerName,
    }: Props) => {
        // console.log(selectedFlightDetails)
        // console.log(alotedSeat)
        // console.log(selectedFlightDetails)
        useEffect(() => {
            const passanger = selectedFlightDetails?.passaenger.filter(
                (p: IPassenger) => p.name === selectedPassangerName,
            )
            // console.log(passanger)
            airlineStore.setAlotedSeat(passanger[0]?.seatNumber)
        }, [selectedPassangerName])
        return (
            <div>
                <div>
                    <span>select flights : </span>
                    <select
                        className='px-2 mr-4 text-gray-700 font-medium '
                        name='classes'
                        value={selectedFlightName}
                        onChange={(e) => setSelectedFlightName(e.target.value)}
                    >
                        <option value=''></option>
                        {airlineStore.airlines.map(
                            (flight: IAirlinesData, i: number) => (
                                <option value={flight.flights} key={i}>
                                    {flight.flights}
                                </option>
                            ),
                        )}
                    </select>
                </div>
                <div>
                    <span>select passanger : </span>
                    <select
                        className='px-2 mr-4 text-gray-700 font-medium '
                        name='classes'
                        value={selectedPassangerName}
                        onChange={(e) =>
                            setSelectedPassangerName(e.target.value)
                        }
                    >
                        <option value=''></option>
                        {selectedFlightDetails?.passaenger.map(
                            (passanger: IPassenger, i: number) => (
                                <option value={passanger.name} key={i}>
                                    {passanger.name}
                                </option>
                            ),
                        )}
                    </select>
                    <p>Passanger Seat: {airlineStore.alotedSeat}</p>
                </div>
            </div>
        )
    },
)

export default inject('airlineStore')(PassengersInfo)
