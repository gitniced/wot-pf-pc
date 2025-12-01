/**
 * 试卷列表
 */
import { useEffect, useRef } from 'react'
import { Button, Modal, message } from 'antd'
import type { FormInstance } from 'antd'
import SearchForm from './components/Main/SearchForm'
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
import useMasterHistory from '@/hooks/userMasterHistory'
import useSiteStore from '@/hooks/useSiteStore'
import { useParams } from 'umi'
import type { QuestionRouteType } from '@/hooks/useCommonParams';
import useCommonParams from '@/hooks/useCommonParams'

const ExamineList = () => {
    const masterHistory = useMasterHistory()
    const siteStore = useSiteStore()

    const commonParams = useCommonParams()
    const { type } = useParams() as { type: QuestionRouteType }
    const formRef = useRef<FormInstance<any>>()

    const hooks = Hooks()

    const { handleClose, handleConfirm, modalData, setModalData } = useModalControl()

    useEffect(() => {
        hooks.searchForm({ ...commonParams })
    }, [])
    /**
     * 发布
     * @param checked 切换状态
     * @param data 列表行数据
     * @returns
     */
    const handlePublish = async (checked: boolean, data: TableDataType) => {
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
            hooks.getTableData()
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

    const handleDelete = (data: TableDataType) => {
        Modal.confirm({
            centered: true,
            content: '删除后无法找回，是否确定删除？',
            okText: '确定',
            cancelText: '取消',
            onOk: async () => {
                await http(API.examineDelete, 'post', { paperCode: data.code })
                message.success('删除成功')
                hooks.getTableData()
            },
        })
    }

    const createExamine = () => {
        masterHistory.push(`/merchant-center/paper-library/${type}/examine/create`)
    }

    useEffect(() => {
        const siteName = findSiteData(siteStore.siteData, 'name', { findKey: 'baseInfo' })
        document.title = `试卷列表-${siteName}`
    }, [])

    return (
        <div className={styles.list_wrapper}>
            <TitleBlock title="模拟卷库" />
            <SearchForm formRef={formRef} onSearch={hooks.searchForm} />
            <Button
                type="primary"
                icon={<PlusOutlined />}
                style={{ margin: '8px 0 16px' }}
                onClick={createExamine}
            >
                新建
            </Button>
            <TableList
                hooks={hooks}
                handlePublish={handlePublish}
                handleDownload={handleDownload}
                handlePreview={handlePreview}
                handleDelete={handleDelete}
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

export default ExamineList
