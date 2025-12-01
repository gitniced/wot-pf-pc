/**
 * 试卷列表
 */
import { useEffect, useState } from 'react'
import { Alert, Button, Modal, message } from 'antd'
import TableList from './components/Main/TableList'
import ModalProvider from '@/components/ModalProvider'
import TitleBlock from '@/components/TitleBlock'
import Hooks from './hooks/useTableSearch'
import { config } from './config'
import http from '@/servers/http'
import API from '@/servers/apis'
import useModalControl from './hooks/useModalControl'
import type { TableDataType, PublishType } from './interface'
import { ModalType } from './enums'
import { PlusOutlined } from '@ant-design/icons'
import styles from './index.module.less'
import { findSiteData } from '@/utils/valueGet'
import useSiteStore from '@/hooks/useSiteStore'
import useMasterHistory from '@/hooks/userMasterHistory'
import useCommonParams from '@/hooks/useCommonParams'
import { getTitleByType } from '../../utils'
import { SUBJECT_TYPE_ENUM } from '@/pages/question/[type]/constants'
import usePageParams from '@/hooks/usePageParams'

const Examine = () => {
    const siteStore = useSiteStore()
    const masterHistory = useMasterHistory()
    const commonParams = useCommonParams()
    const urlParams = usePageParams()

    const hooks = Hooks()
    const { handleClose, handleConfirm, modalData, setModalData } = useModalControl()
    const pageTitle = getTitleByType(commonParams)
    const { subject } = commonParams

    // 是否显示提示
    const [showRemind, setShowRemind] = useState<boolean>(false)
    // 显示的提示内容
    const [remindText, setRemindText] = useState<string>()

    /**
     * 发布
     * @param checked 切换状态
     * @param data 列表行数据
     * @returns
     */
    const handlePublish = async (checked: boolean, data: TableDataType, reload: any) => {
        if (data.publishState !== '0' && checked) {
            message.warning('非草稿状态不能操作！')
            return
        }
        const res = (await http(API.examinePublish, 'post', {
            paperCode: data.code,
            state: Number(checked),
            ...commonParams,
        })) as unknown as PublishType
        if (res.success) {
            reload()
        } else {
            setModalData({
                visible: true,
                dataSource: res.failReasons,
                type: ModalType.PUBLISH,
            })
        }
    }
    const handleDownload = (data: TableDataType) => {
        setModalData({ visible: true, dataSource: data, type: ModalType.DOWNLOAD })
    }

    const handlePreview = (data: TableDataType) => {
        setModalData({ visible: true, dataSource: data, type: ModalType.PREVIEW })
    }

    const handleDelete = (data: TableDataType, reload: any) => {
        Modal.confirm({
            centered: true,
            content: '删除后无法找回，是否确定删除？',
            okText: '确定',
            cancelText: '取消',
            onOk: async () => {
                await http(API.examineDelete, 'post', { paperCode: data.code, ...useCommonParams })
                message.success('删除成功')
                reload()
            },
        })
    }

    const createExamine = () => {
        masterHistory.push(`./create?${urlParams}`)
    }

    useEffect(() => {
        // 从站点信息获取是否需要显示提示以及提示的内容
        setShowRemind(findSiteData(siteStore.siteData, 'kp_paper_remind')?.value === '1')
        setRemindText(findSiteData(siteStore.siteData, 'kp_paper_remind_text')?.value)

        const siteName = findSiteData(siteStore.siteData, 'name', { findKey: 'baseInfo' })
        document.title = `${pageTitle}-${siteName}`
    }, [])

    return (
        <div className={styles.list_wrapper}>
            <TitleBlock title={pageTitle} />
            {/* 提示 */}
            {subject && [SUBJECT_TYPE_ENUM.REAL, SUBJECT_TYPE_ENUM.COMPETITION].includes(subject) && showRemind && (
                <Alert showIcon type="warning" description={remindText} />
            )}

            <TableList
                hooks={hooks}
                handlePublish={handlePublish}
                handleDownload={handleDownload}
                handlePreview={handlePreview}
                handleDelete={handleDelete}
                optionBar={() => (
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        style={{ margin: '8px 0 16px' }}
                        onClick={createExamine}
                    >
                        新建
                    </Button>
                )}
            />

            {modalData.visible && (
                <ModalProvider
                    {...modalData}
                    config={config}
                    handleClose={handleClose}
                    handleConfirm={handleConfirm}
                />
            )}
        </div>
    )
}

export default Examine
