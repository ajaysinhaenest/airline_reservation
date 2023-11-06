import { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'
import { airlineData } from '../../Shared/Utils/Constant'
import { Box, Button, Container } from '@mui/material'
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

    const [isChangeSeat, setIsChangeSeat] = useState(false)

    useEffect(() => {
        airlineStore.setAirlineData(airlineData)
    }, [])

    useEffect(() => {
        const selectedFlight = toJS(airlineStore.airlines).filter(
            (flight: IAirlinesData) => flight.flights === selectedFlightName,
        )
        setselectedFlightDetails(selectedFlight[0])
    }, [selectedFlightName, airlineStore.airlines])

    // console.log(selectedFlightName)
    // console.log(selectedPassangerName)
    // console.log(selectedFlightDetails)
    return (
        <Container>
            <Box
                my={2}
                display='flex'
                flexDirection='row-reverse'
                justifyContent='space-between'
            >
                <Box>
                    <PassengersInfo
                        selectedFlightDetails={selectedFlightDetails}
                        selectedFlightName={selectedFlightName}
                        setSelectedFlightName={setSelectedFlightName}
                        selectedPassangerName={selectedPassangerName}
                        setSelectedPassangerName={setSelectedPassangerName}
                    />
                    <Button
                        variant='outlined'
                        onClick={() => setIsChangeSeat(!isChangeSeat)}
                    >
                        Change seat
                    </Button>
                    {isChangeSeat && 'select your seat'}
                </Box>
                {/* </Box> */}
                <SeatsDetails
                    selectedFlightDetails={selectedFlightDetails}
                    isChangeSeat={isChangeSeat}
                    setIsChangeSeat={setIsChangeSeat}
                    selectedPassangerName={selectedPassangerName}
                    setselectedFlightDetails={setselectedFlightDetails}
                />
            </Box>
        </Container>
    )
})

export default inject('airlineStore')(Airlines)
