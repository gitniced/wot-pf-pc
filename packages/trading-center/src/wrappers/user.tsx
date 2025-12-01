import type { IRouteComponentProps } from 'umi'
import { Redirect } from 'umi'
import * as Storage from '@/storage'

export default (props: IRouteComponentProps) => {
    const userToken = Storage.getCookie('TOKEN')
    if (!userToken) {
        return <div>{props.children}</div>
    } else {
        return <Redirect to="/order" />
    }
}
