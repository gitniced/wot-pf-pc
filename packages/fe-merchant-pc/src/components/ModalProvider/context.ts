import { createContext } from 'react'

export const ModalValueContext = createContext<{
    dataSource: any
}>({
    dataSource: {},
})

export const ModalCallbackContext = createContext<{
    confirmValueCallback?: (args: any) => void
}>({})
