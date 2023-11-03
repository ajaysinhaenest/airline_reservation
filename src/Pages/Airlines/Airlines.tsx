import { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'
import { airlineData } from '../../Shared/Utils/Constant'
import { Box, Container } from '@mui/material'
import PassengersInfo from './AirlineInfo/PassengersInfo'
import SeatsDetails from './SeatsDetails/SeatsDetails'
import { IAirlinesData } from '../../Shared/Interface/airline.intertface'

const Airlines = observer(({ airlineStore }: any) => {
    const [selectedFlightName, setSelectedFlightName] = useState('')
    const [selectedPassangerName, setSelectedPassangerName] = useState('')
    const [selectedFlightDetails, setselectedFlightDetails] =
        useState<IAirlinesData>({
            flights: '',
            passaenger: [],
            totalSeats: 0,
            seats: [],
        })

    useEffect(() => {
        airlineStore.setAirlineData(airlineData)
    }, [])

    useEffect(() => {
        const selectedFlight = toJS(airlineStore.airlines).filter(
            (flight: IAirlinesData) => flight.flights === selectedFlightName,
        )
        setselectedFlightDetails(selectedFlight[0])
    }, [selectedFlightName, airlineStore.airlines])

    console.log(selectedFlightName)
    console.log(selectedPassangerName)

    return (
        <Container>
            <Box
                my={2}
                display='flex'
                flexDirection='row-reverse'
                justifyContent='space-between'
            >
                <PassengersInfo
                    selectedFlightDetails={selectedFlightDetails}
                    selectedFlightName={selectedFlightName}
                    setSelectedFlightName={setSelectedFlightName}
                    selectedPassangerName={selectedPassangerName}
                    setSelectedPassangerName={setSelectedPassangerName}
                />
                <SeatsDetails selectedFlightDetails={selectedFlightDetails} />
            </Box>
        </Container>
    )
})

export default inject('airlineStore')(Airlines)
