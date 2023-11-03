import { action, makeObservable, observable } from 'mobx'
import { IAirlinesData } from '../Interface/airline.intertface'

export class AirlineStore {
    airlines: IAirlinesData[] = []
    alotedSeat: number = 0
    rootStore

    constructor(rootStore: any) {
        makeObservable(this, {
            airlines: observable,
            alotedSeat: observable,
            setAirlineData: action,
            setAlotedSeat: action,
        })
        this.rootStore = rootStore
    }
    setAirlineData = (airlineData: IAirlinesData[]) => {
        console.log(airlineData)
        this.airlines = airlineData
    }
    setAlotedSeat = (passanger: number) => {
        this.alotedSeat = passanger
    }
}
