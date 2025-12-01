let self: any

export default class MyEvent {
    public events: Record<string, any> = {}
    constructor() {
        this.events = {}
    }

    on(key, fn) {
        if (this.events[key]) {
            this.events[key].push(fn)
        } else {
            this.events[key] = [fn]
        }
    }

    emit(key, ...reset) {
        if (this.events[key]) {
            this.events[key].forEach(fn => fn(...reset))
        }
    }
}

export function getEvent() {
    if (self) {
        return self
    } else {
        self = new MyEvent()
        return self
    }
}
