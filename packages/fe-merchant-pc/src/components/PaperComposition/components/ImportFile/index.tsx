import { Alert, Button, Modal, Spin, Tooltip, Progress, Table, Space, Typography } from 'antd'
import { useState } from 'react'
import { ImportStatus } from './const'
import GlobalUpload from '@/components/GlobalUpload'
import http from '@/servers/http'
import API from './api'
import styles from './index.module.less'
import { DownloadOutlined, InfoCircleFilled } from '@ant-design/icons'
import useUserStore from '@/hooks/useUserStore'
import useSiteStore from '@/hooks/useSiteStore'
import useCommonParams from '@/hooks/useCommonParams'

interface ChildrenProps {
    uploadData: any
    importData: any
    rate: number
    setImportStatus: React.Dispatch<React.SetStateAction<any>>
    setUploadData: React.Dispatch<React.SetStateAction<any>>
    setImportData: React.Dispatch<React.SetStateAction<any>>
    setRate: React.Dispatch<React.SetStateAction<number>>
    onCancel: () => void
    continueImport: () => void
}

/**
 * 导入状态
 */
const PaddingModal = (props: ChildrenProps) => {
    const userStore = useUserStore()
    const commonParams = useCommonParams()

    const { uploadData, setUploadData, setImportData, setImportStatus, setRate } = props || {}
    const [startImportDisabled, setStartImportDisabled] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(false)
    /**
     * 上传文件改变
     */
    const uploadChange = (file: any = []) => {
        if (file.length === 0) {
            setStartImportDisabled(true)
            setUploadData({ url: '', name: '' })
            return
        }
        const { name, url } = file?.[0]?.response ?? {}
        if (name && url) {
            setStartImportDisabled(false)
            setUploadData({ name, url })
            return
        }
    }
    // 同步阻塞
    const sleep = (delay: number) => {
        return new Promise<void>(res => {
            setTimeout(() => {
                res()
            }, delay * 1000)
        })
    }
    /**
     * 开始批量导入
     * @param params 导入参数
     */
    const importFile = async () => {
        return (
            (await http(API.importFile, 'post', {
                fileName: uploadData?.name,
                fileUrl: uploadData?.url,
                type: 3, // 1 组织成员导入 2 批量删除 3 试题导入
                organizationCode: userStore?.selectedOrganization || userStore?.defaultOrganization,
                ...commonParams,
            })) || ''
        )
    }
    /**
     * 获得导入结果
     */
    const getImportData = async (code: string) => {
        const res = ((await http(`${API.excelResult}/${code}`, 'get', {})) as unknown as any) || {}
        res.successCount = res?.totalCount - res?.failCount || 0
        return res
    }
    const pollingImportResult = async (code: any) => {
        let importResult = await getImportData(code)
        // 如果状态不为 2 | 3 的话，说明还没有导入结束
        // 2 导入状态结束，可能是成功，也可能是部分失败
        // 3 例如execl格式异常失败
        while (![2, 3].includes(importResult.status as number)) {
            await sleep(2) // 延迟2s
            importResult = await getImportData(code)
            // 动态设置百分比
            setRate(parseInt(importResult.rate as unknown as string))
        }
        // 设置结果状态
        if (importResult.failCount === 0 && importResult.totalCount! > 0) {
            // 全部成功
            setImportStatus(ImportStatus.resolved)
        } else {
            // 失败  包括部分失败跟全部失败
            setImportStatus(ImportStatus.rejected)
        }
        setImportData(importResult)
    }
    /**
     * 开始导入，获取导入结果
     */
    const excelImport = async () => {
        setLoading(true)
        const code = await importFile()
        setImportStatus(ImportStatus.loading)
        // 需要轮询获取的结果接口
        await pollingImportResult(code)
        setLoading(false)
    }

    return (
        <div className={styles.padding_modal}>
            <div className={styles.padding_content}>
                <Alert
                    message="套题导入功能说明："
                    description={
                        <div>
                            <p>1.请按照模板文件内的相关说明，进行内容填写；</p>
                            <p>
                                2.将填写好的导入文件上传，系统会校验导入内容是否符合规定的数据格式。校验通过，会入库保存。如未通过，则会反馈提示；
                            </p>
                            <p>
                                3.若库中存在相同题目/题干的试题，则会直接关联已有试题，不会重复导入。
                            </p>
                        </div>
                    }
                    className={styles.alert}
                    type="info"
                    showIcon
                    icon={<InfoCircleFilled />}
                />
                <div className={styles.template}>
                    <div>
                        <p className={styles.num}>下载模板</p>
                        <p className={styles.text}>请填写后再上传</p>
                    </div>
                    <Button
                        onClick={() =>
                            window.open(
                                'https://i.zpimg.cn/public_read/%E8%AF%95%E9%A2%98%E6%89%B9%E9%87%8F%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx',
                            )
                        }
                    >
                        <Space>
                            <DownloadOutlined />
                            <span>下载模板</span>
                        </Space>
                    </Button>
                </div>
                <div className={styles.content}>
                    <svg
                        className="icon"
                        style={{ width: '48px', height: '48px', fill: 'var(--primary-color)' }}
                        aria-hidden="true"
                    >
                        <use xlinkHref={`#Container`} />
                    </svg>
                    <span className={styles.text}>仅支持xls、xlsx格式文件</span>
                    <div className={styles.upload}>
                        <GlobalUpload
                            onChange={uploadChange}
                            type={13}
                            otherProps={{
                                listType: 'text',
                                showUploadList: true,
                            }}
                            accept={['excel']}
                            amount={1}
                            drag={false}
                            size={1}
                        >
                            <Button disabled={!startImportDisabled} style={{ marginTop: '12px' }}>
                                点击上传
                            </Button>
                        </GlobalUpload>
                    </div>
                </div>
            </div>
            <div className={styles.start_import}>
                <Button
                    onClick={excelImport}
                    loading={loading ?? false}
                    type="primary"
                    disabled={startImportDisabled}
                >
                    开始导入
                </Button>
            </div>
        </div>
    )
}
/**
 * loading 导入中
 */
const LoadingModal = (props: ChildrenProps) => {
    const siteStore = useSiteStore()

    const { uploadData, rate } = props || {}
    // 打开用户中心
    const openUserPCPage = () => {
        window.open(`${siteStore?.siteData?.data?.baseInfo?.loginUrl}/organization/action`)
    }
    return (
        <div className={styles.loading_modal}>
            <Spin className={styles.loading_icon} spinning={true} />
            <div className={styles.loading_waitting}>导入中，请稍候...</div>
            <Tooltip title={uploadData?.name} className={styles.filename}>
                {uploadData?.name}
            </Tooltip>
            <Progress className={styles.loading} percent={rate} size="small" />
            <Button className={styles.btn} type="primary" onClick={openUserPCPage}>
                批量操作记录
            </Button>
        </div>
    )
}
/**
 * 成功状态
 */
const ResolvedModal = (props: ChildrenProps) => {
    const { importData, onCancel } = props || {}
    return (
        <div className={styles.resolved_modal}>
            <div className={styles.content}>
                <svg className="icon" style={{ width: '35px', height: '35px' }} aria-hidden="true">
                    <use xlinkHref={`#yiwancheng`} />
                </svg>
                <span className={styles.text}>
                    成功导入
                    <span className={styles.success_count}>{importData?.successCount}条</span>
                    记录
                </span>
            </div>
            <div className={styles.buttons}>
                <Button className={styles.button} onClick={onCancel}>
                    关闭
                </Button>
            </div>
        </div>
    )
}
/**
 * 失败状态
 */
const RejectedModal = (props: ChildrenProps) => {
    const { importData, onCancel, continueImport } = props || {}
    const columns = [
        {
            title: '行数',
            dataIndex: 'line',
            key: 'line',
            width: 80,
        },
        {
            title: '题型',
            dataIndex: 'content',
            key: 'content',
            width: 130,
        },
        {
            title: '错误原因',
            dataIndex: 'reason',
            key: 'reason',
            width: 410,
        },
    ]
    // 是否全部失败
    const isAllFail = importData?.failCount === importData?.totalCount
    return (
        <div className={styles.rejected_modal}>
            <div className={styles.rejected_content}>
                <div className={styles.header}>
                    <InfoCircleFilled className={styles.icon} />
                    <div className={styles.texts}>
                        <div className={styles.content}>
                            {isAllFail ? (
                                <>
                                    <div className={styles.title}>导入失败</div>共
                                    {importData?.totalCount}条，导入失败
                                    <span className={styles.fail}>
                                        {importData?.failCount}条
                                    </span>{' '}
                                </>
                            ) : (
                                <>
                                    <div className={styles.title}>部分导入失败</div>共
                                    {importData?.totalCount}条，导入成功
                                    <span className={styles.success}>
                                        {importData?.successCount}条
                                    </span>{' '}
                                    ， 导入失败{' '}
                                    <span className={styles.fail}>{importData?.failCount}条</span>{' '}
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className={styles.content}>
                    <Alert
                        message="你可以下载明细文件查看详情，也可以在组卷保存后至编辑页查看或调整具体试题。"
                        className={styles.alert}
                        type="info"
                        showIcon
                    />
                    <div className={styles.texts}>
                        <span>明细</span>
                        {importData?.errorFileUrl ? (
                            <Typography.Link href={importData?.errorFileUrl}>
                                下载明细
                            </Typography.Link>
                        ) : null}
                    </div>
                    <Table
                        className={styles.table}
                        dataSource={importData?.errorList}
                        columns={columns}
                        rowClassName={styles.rowClassName}
                        rowKey="code"
                        pagination={{ pageSize: 5, showSizeChanger: false }}
                    />
                </div>
            </div>
            <div className={styles.buttons}>
                <Button className={styles.button} onClick={onCancel}>
                    关闭
                </Button>
                <Button type="primary" className={styles.button} onClick={continueImport}>
                    再次导入
                </Button>
            </div>
        </div>
    )
}
interface ImportFileProps {
    visible: boolean
    handleCancel: (values?: any) => void
}
const ImportFile = (props: ImportFileProps) => {
    const { visible, handleCancel } = props || {}

    const [importStatus, setImportStatus] = useState<ImportStatus>(ImportStatus.padding)
    const [uploadData, setUploadData] = useState()
    const [importData, setImportData] = useState()
    const [rate, setRate] = useState<number>(0)

    // 关闭弹窗
    const onCancel = () => {
        setRate(0) // 防止缓存rate，需要在关闭的时候设置为初始值0
        if (importStatus !== ImportStatus.loading) {
            setImportStatus(ImportStatus.padding)
            handleCancel({ uploadData, importData })
        } else {
            Modal.confirm({
                title: '弹窗关闭后，数据仍继续导入',
                content: '您可以在【组织中心-批量操作】列表页，查看具体的导入进度及结果',
                onOk: () => {
                    setImportStatus(ImportStatus.padding)
                    handleCancel()
                },
            })
        }
    }
    // 继续导入
    const continueImport = () => {
        setImportStatus(ImportStatus.padding)
        setUploadData(undefined)
        setImportData(undefined)
        setRate(0) // 清空进度条
    }
    const childrenProps = {
        uploadData,
        importData,
        rate,
        setImportStatus,
        setUploadData,
        setImportData,
        setRate,
        onCancel,
        continueImport,
    }

    return (
        <Modal
            title="套题导入"
            className={styles.import_modal}
            maskClosable={false}
            visible={visible}
            onCancel={onCancel}
            destroyOnClose={true}
            footer={null}
            width="528px"
            centered
        >
            {/* 目前只有三种状态，导入前（padding），导入中(loading)，导入后(结果展示页面)(resolved 全部成功 | reject 全部失败或者部分失败 ) */}
            {importStatus === ImportStatus.padding ? <PaddingModal {...childrenProps} /> : null}
            {importStatus === ImportStatus.resolved ? <ResolvedModal {...childrenProps} /> : null}
            {importStatus === ImportStatus.rejected ? <RejectedModal {...childrenProps} /> : null}
            {importStatus === ImportStatus.loading ? <LoadingModal {...childrenProps} /> : null}
        </Modal>
    )
}
export default ImportFile
