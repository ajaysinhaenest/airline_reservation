import { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'
import { airlineData } from '../../Shared/Utils/Constant'
import {
    Box,
    Button,
    Container,
    Typography,
    Modal,
    styled,
    TextField,
} from '@mui/material'
import PassengersInfo from './AirlineInfo/PassengersInfo'
import SeatsDetails from './SeatsDetails/SeatsDetails'
import {
    IAirlinesData,
    IPassenger,
    ISeats,
} from '../../Shared/Interface/airline.intertface'
import ColorKey from '../../Shared/Components/ColorKey'
import { getSeatNumber } from '../../Shared/Utils/helperFunctions'

const StyledModal = styled(Modal)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
})

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
    const [open, setOpen] = useState(false)
    const [addPassanger, setAddPassanger] = useState({
        firstName: '',
        lastName: '',
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

    const handleDeletePassanger = () => {
        const passangers = selectedFlightDetails?.passaenger.filter(
            (p: IPassenger) => p.name !== selectedPassangerName,
        )
        // console.log(passangers)
        setselectedFlightDetails({
            ...selectedFlightDetails,
            passaenger: passangers,
        })
    }

    const handleAddPassanger = (e: React.FormEvent) => {
        e.preventDefault()

        const seats = selectedFlightDetails?.seats.filter((seat: ISeats) => {
            const isTaken = selectedFlightDetails.passaenger.some(
                (p: IPassenger) => seat.seatNumber === p.seatNumber,
            )
            if (!isTaken) return seat
        })

        console.log(seats)

        // console.log('hello')
        // console.log(addPassanger)

        setselectedFlightDetails({
            ...selectedFlightDetails,
            passaenger: [
                ...selectedFlightDetails.passaenger,
                {
                    name: addPassanger.firstName + ' ' + addPassanger.lastName,
                    seatNumber: getSeatNumber(seats),
                },
            ],
        })
        setAddPassanger({ firstName: '', lastName: '' })

        setOpen(false)
    }
    return (
        <Container>
            <Box
                my={6}
                display='flex'
                gap={2}
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
                    <Box display='flex' gap={2} mb={3}>
                        <Button
                            disabled={
                                !selectedFlightDetails && !selectedPassangerName
                            }
                            variant='outlined'
                            onClick={() => setIsChangeSeat(!isChangeSeat)}
                        >
                            Change seat
                        </Button>
                        <Typography variant='subtitle1' color='primary'>
                            {isChangeSeat && 'Please click on an empty seat'}
                        </Typography>
                    </Box>
                    <Box display='flex' gap={2} mb={2}>
                        <Button
                            variant='outlined'
                            onClick={() => setOpen(!open)}
                        >
                            Add Passanger
                        </Button>
                        <Button
                            disabled={
                                !selectedFlightDetails && !selectedPassangerName
                            }
                            variant='outlined'
                            onClick={() => handleDeletePassanger()}
                        >
                            Delete Passanger
                        </Button>
                    </Box>
                    <Box border='1px solid gray' p={2}>
                        <ColorKey color='red' text='Seat is taken' />
                        <ColorKey color='blue' text='Seat is empty' />
                        <ColorKey
                            color='green'
                            text='Selected Passengers Seat'
                        />
                    </Box>
                </Box>
                <SeatsDetails
                    selectedFlightDetails={selectedFlightDetails}
                    isChangeSeat={isChangeSeat}
                    setIsChangeSeat={setIsChangeSeat}
                    selectedPassangerName={selectedPassangerName}
                    setselectedFlightDetails={setselectedFlightDetails}
                />
            </Box>

            <div>
                <StyledModal
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby='modal-modal-title'
                    aria-describedby='modal-modal-description'
                >
                    <Box width={400} bgcolor='white' p={3} borderRadius={4}>
                        <Typography variant='h6' color='initial'>
                            Please enter the passangers name
                        </Typography>
                        <form action=''>
                            <TextField
                                id='outlined-basic'
                                placeholder='First Name'
                                variant='outlined'
                                fullWidth
                                size='small'
                                sx={{ marginY: 2 }}
                                value={addPassanger.firstName}
                                onChange={(e) =>
                                    setAddPassanger({
                                        ...addPassanger,
                                        firstName: e.target.value,
                                    })
                                }
                            />
                            <TextField
                                id='outlined-basic'
                                placeholder='Last Name'
                                variant='outlined'
                                fullWidth
                                size='small'
                                value={addPassanger.lastName}
                                onChange={(e) =>
                                    setAddPassanger({
                                        ...addPassanger,
                                        lastName: e.target.value,
                                    })
                                }
                            />
                            <Box
                                my={3}
                                display='flex'
                                gap={3}
                                justifyContent='center'
                            >
                                <Button
                                    variant='outlined'
                                    type='submit'
                                    onClick={(e) => handleAddPassanger(e)}
                                >
                                    Save
                                </Button>
                                <Button
                                    variant='outlined'
                                    onClick={() => setOpen(false)}
                                >
                                    Cancle
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </StyledModal>
            </div>
        </Container>
    )
})

export default inject('airlineStore')(Airlines)
