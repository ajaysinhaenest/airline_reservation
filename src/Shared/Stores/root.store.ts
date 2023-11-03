import { AirlineStore } from './airline.store'

class RootStore {
    airlineStore
    constructor() {
        this.airlineStore = new AirlineStore(this)
    }
}

export default RootStore
