import type { IRouteComponentProps } from 'umi'
import * as Storage from '@/storage'
import { getMasterHistory } from '@/utils/masterHistoryVO'

export default (props: IRouteComponentProps) => {
    const userToken = Storage.getCookie('TOKEN')
    if (!userToken) {
        return <div>{props.children}</div>
    } else {
        const masterHistoryVO = getMasterHistory()
        masterHistoryVO.masterHistory?.replace('/account')
        return <></>
    }
}
