const getAllRoutes = (routes: any[]) => {
    const allRoutes: any[] = []
    const pathRoutes = routes || []
    const getMapRouteList = (tempRoutes: any[]) => {
        tempRoutes
            .filter((item: any) => item.path)
            .map((item: any) => {
                if (item?.routes?.length) {
                    getMapRouteList(item?.routes || [])
                } else {
                    allRoutes.push(item)
                }
            })
    }
    getMapRouteList(pathRoutes)
    return allRoutes
}

export default getAllRoutes
