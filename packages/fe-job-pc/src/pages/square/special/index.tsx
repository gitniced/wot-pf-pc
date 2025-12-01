import type { IRoute } from 'umi'
import { history } from 'umi'
import styles from './index.module.less'
import { useEffect, useState } from 'react'
import Http from '@/servers/http'
import Api from '../api'
import { Button, message } from 'antd'
import { getLocalStorage } from '@/storage'

const Index: React.FC = () => {
    const {
        location: { query },
    } = history

    const [detail, setDetail] = useState<any>({})

    const getDetail = async () => {
        const sid = getLocalStorage('SID')
        const data = await Http(`${Api.subjectdetail}/${query?.keyNo}?sid=${sid ?? 0}`, 'get', {})
        setDetail(data)
    }

    const apply = async () => {
        const _data = await Http(Api.subjectapply, 'post', {
            keyNo: query?.keyNo,
        })
        message.success('报名成功')
    }

    useEffect(() => {
        getDetail()
    }, [])

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div
                    className={styles.content}
                    dangerouslySetInnerHTML={{
                        __html: detail.content,
                    }}
                />
                <div className={styles.btn_bg}>
                    <Button size="large" type="primary" className={styles.btn} onClick={apply}>
                        立即报名
                    </Button>
                </div>
            </div>
        </div>
    )
}

const Page: IRoute = Index
Page.title = '职位广场-四川就业平台'
export default Page
