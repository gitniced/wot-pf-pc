interface PropsType {
    importResource: (a: string, b: string) => void
    importList: any[]
    departmentCode: React.Key
    isImportVisible: boolean
    setImportVisible: (a: boolean) => void
}

export { PropsType }
