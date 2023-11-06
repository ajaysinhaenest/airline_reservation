import { useEffect } from 'react'
import { Box } from '@mui/material'
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
        useEffect(() => {
            const passanger = selectedFlightDetails?.passaenger.filter(
                (p: IPassenger) => p.name === selectedPassangerName,
            )
            airlineStore.setAlotedSeat(passanger[0]?.seatNumber)
        }, [selectedPassangerName])

        return (
            <div>
                <Box display='flex' mb={2}>
                    <span>choose Flights : </span>
                    <select
                        className='px-2 mr-4 text-gray-700 font-medium '
                        name='classes'
                        value={selectedFlightName}
                        onChange={(e) => setSelectedFlightName(e.target.value)}
                    >
                        <option value=''>select flight</option>
                        {airlineStore?.airlines?.map(
                            (flight: IAirlinesData, i: number) => (
                                <option value={flight.flights} key={i}>
                                    {flight.flights}
                                </option>
                            ),
                        )}
                    </select>
                </Box>
                <Box display='flex'>
                    <span>choose Passanger : </span>
                    <select
                        className='px-2 mr-4 text-gray-700 font-medium '
                        name='classes'
                        value={selectedPassangerName}
                        onChange={(e) =>
                            setSelectedPassangerName(e.target.value)
                        }
                    >
                        <option value=''>select passanger</option>
                        {selectedFlightDetails?.passaenger.map(
                            (passanger: IPassenger, i: number) => (
                                <option value={passanger.name} key={i}>
                                    {passanger.name}
                                </option>
                            ),
                        )}
                    </select>
                </Box>
                <p>Passanger Seat: {airlineStore.alotedSeat}</p>
            </div>
        )
    },
)

export default inject('airlineStore')(PassengersInfo)
