import { useEffect, useRef, useState } from 'react'
import { inject, observer, useLocalObservable } from 'mobx-react'
import styles from './index.module.less'
import type { IRoute } from 'umi'
import useStore from './store'
import BusinessTable from '@/components/BusinessTable'
import { columnsFc } from './columnsFc'
import CustomTitle from '@/components/CustomTitle'
import { getCookie, usePageListConfig } from '@wotu/wotu-components'
import { Button, Typography } from 'antd'
import BatchImport from '@/components/BatchImport'

const EventManagement: React.FC = () => {
    const formRef = useRef<any>(null)
    const actionRef = useRef<any>(null)
    const store = useLocalObservable(() => new useStore())
    const [visible, setVisible] = useState(false)
    const { getPageListConfig } = usePageListConfig()
    const organizationCode = getCookie('SELECT_ORG_CODE')

    const getExtraInitParams = () => {
        const pageParams = getPageListConfig('save_params')
        const { titleDisplay } = pageParams
        return { title: titleDisplay }
    }

    const beforeSearchSubmit = (params: any) => {
        const { title, ...rest } = params

        const _params: any = { ...rest }
        _params.titleDisplay = title ? title : null
        _params.taskCode = title ? title?.value : null

        return {..._params, organizationCode}
    }

    const closeModal = () => { setVisible(false) }
    const handleSuccess = () => { setVisible(false) }

    useEffect(() => {
        document.title = "签到任务管理"
    }, [])

    return (
        <div className={styles.task_info_page}>
            <div className={styles.task_info_member}>
                <div className={styles.main_title}>
                    <CustomTitle title="签到任务管理" marginBottom={0} />
                </div>
                <BusinessTable
                    formItemsStyle={{
                        width: '397px',
                    }}
                    formRef={formRef}
                    actionRef={actionRef}
                    columns={columnsFc()}
                    // @ts-expect-error
                    request={store.getTableData}
                    onReset={() => {
                        const url = new URL(location.href)
                        if (url.searchParams.has('activityCode')) {
                            url.searchParams.delete('activityCode')
                        }
                        window.history.replaceState({}, '', url)
                    }}
                    renderOptionBar={() => <Button type='primary' onClick={() => setVisible(true)}>批量更换基准照</Button>}
                    beforeSearchSubmit={beforeSearchSubmit}
                    extraInitParams={getExtraInitParams()}
                    formProps={{ labelCol: { span: 7 }, wrapperCol: { span: 15 } }}
                />
            </div>
            <BatchImport
                title="批量更换基准照"
                importApi="/sign_in/front/task/import_file"
                failApi="/sign_in/front/task/list_import_record"
                open={visible}
                onCancel={closeModal}
                onOk={handleSuccess}
                description={<>
                    <Typography>1、此功能将批量更换打卡用户在【未结束】且【未打卡】的所有任务的基准照</Typography>
                    <Typography>
                        2、请选择打卡用户本人近照，格式支持.jpg/.jpeg/.png；
                    </Typography>
                    <Typography>
                        3、需要导入的照片，请以【姓名_证件号码】或【证件号码】命名。（例：张三_000000000000000000.jpg或000000000000000000.jpeg）
                    </Typography>
                    <Typography>
                        4、请将全部图片直接打包生成zip压缩包（不含文件夹），再选择上传。
                    </Typography>

                </>}
                uploadTips='支持zip格式文件'
                accept='zip'
                uploadParams={{ type: 26 }}
                // importTemplate="https://i.zpimg.cn/public_read/common/practice_user.xlsx"
            />
        </div>
    )
}

const ObserverPage: IRoute = inject('userStore')(observer(EventManagement))
ObserverPage.title = '签到任务管理'
export default ObserverPage