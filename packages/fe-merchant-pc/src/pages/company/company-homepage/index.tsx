import { observer, useLocalObservable } from 'mobx-react'
import type { IRoute } from 'umi'
import styles from './index.module.less'
import { useEffect, useRef, useState } from 'react'
import type { FC } from 'react'
import { companyInfoList } from './const'
import type { FormComponentProps } from './interface.d'
import { COMPANY_INFO_ITEM } from './interface.d'

import InfoList from './components/InfoList'
import { Button } from 'antd'
import Store from './store'

const Index: React.FC = () => {
    const store = useLocalObservable(() => new Store())
    const FormRef = useRef({
        onSubmit: () => {},
    })
    const [tab, setTab] = useState<COMPANY_INFO_ITEM>(COMPANY_INFO_ITEM.BASIC_INFO)
    const FormComponent: FC<FormComponentProps> | undefined = companyInfoList.find(
        item => item.tab === tab,
    )?.render
    const [btnLoading, setBtnLoading] = useState<boolean>(false)

    useEffect(() => {
        store.getRate()
    }, [])

    return (
        <div className={styles.page}>
            <div className={styles.content_box}>
                <InfoList tab={tab} setTab={setTab} rate={store.rate} />
                <div className={styles.content}>
                    {FormComponent && (
                        <FormComponent
                            onRef={FormRef}
                            setBtnLoading={setBtnLoading}
                            getRate={store.getRate}
                        />
                    )}
                </div>
            </div>
            <div className={styles.button_box}>
                <Button
                    type="primary"
                    onClick={() => FormRef?.current?.onSubmit()}
                    loading={btnLoading}
                >
                    保存
                </Button>
            </div>
        </div>
    )
}

const page: IRoute = observer(Index)
page.title = '公司主页'
export default page
