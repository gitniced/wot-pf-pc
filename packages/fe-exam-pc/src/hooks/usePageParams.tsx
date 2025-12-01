import { clone } from 'lodash'
import { history } from 'umi'

const usePageParams = (omitParamKeys?: string[]) => {
    const routeQuery = clone(history.location.query as any)
    omitParamKeys?.map(key => {
        delete routeQuery[key]
    })

    const params = new URLSearchParams(routeQuery as unknown as Record<string, string>)
    const urlParams = params.toString()

    return urlParams
}

export default usePageParams
