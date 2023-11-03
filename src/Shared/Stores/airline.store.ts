import { action, makeObservable, observable } from 'mobx'
import { IAirlinesData } from '../Interface/airline.intertface'

export class AirlineStore {
    airlines: IAirlinesData[] = []
    rootStore

    constructor(rootStore: any) {
        makeObservable(this, {
            airlines: observable,
            setAirlineData: action,
        })
        this.rootStore = rootStore
    }
    setAirlineData = (airlineData: IAirlinesData[]) => {
        console.log(airlineData)
        this.airlines = airlineData
    }
}
