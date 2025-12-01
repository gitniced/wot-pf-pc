interface PropsType {
    currentDirectorCode: string
    staffList: any[]
    directorVisible: boolean
    setDirectorVisible: (status: boolean) => void
    setDirector: () => void
    setDirectorCode: (code: string) => void
}

export { PropsType }
