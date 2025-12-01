const getLastPath = (path: string, symblo: string = ','): string => {
    return path?.split(symblo)?.at(-1) || ''
}

export { getLastPath }
