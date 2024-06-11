import { writable } from 'svelte/store'

export interface userDataType {
    [key: string]: any
}

let data: userDataType = {
    category: undefined,
    minutes: 1,
    numberOfActors: 1,
    numberOfLocations: 1,
    vfxMultiplier: 1,
}

export const userData = writable(data)

export const filledTo = writable(1)
