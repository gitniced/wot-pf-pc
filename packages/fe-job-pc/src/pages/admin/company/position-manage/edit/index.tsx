import type { IRoute } from 'umi'
import { PositionCreate } from '../create'

const PositionEdit = () => {
    return <PositionCreate />
}

const observePage: IRoute = PositionEdit
observePage.title = '编辑职位'
export default observePage
