function promiseIteration(list: Promise<any>[]): Promise<any> {
    const listLength: number = list.length
    let listIndex: number = 0
    const listResult: any[] = []

    return new Promise(resolve => {
        const doPromise = () => {
            if (listIndex < listLength) {
                list[listIndex]?.()
                    .then((res: any) => {
                        console.log(res)
                        listResult.push(res)
                        listIndex++
                        doPromise()
                    })
                    .catch((err: any) => {
                        listResult.push(err)
                        listIndex++
                        doPromise()
                    })
            } else {
                resolve(listResult)
            }
        }

        doPromise()
    })
}
export default promiseIteration
