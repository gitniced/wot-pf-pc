import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'

class ResourceStore {
    constructor() {
        makeAutoObservable(this)
        makePersistable(this, {
            name: 'resourceStore',
            properties: [],
            storage: window.localStorage,
        })
    }
}

const resourceStore = new ResourceStore()

export default resourceStore
