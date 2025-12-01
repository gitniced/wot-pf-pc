import styles from './index.modules.less'
import React, { useState } from 'react'
import { Modal, Alert, Button, Table, Spin, Tooltip, Progress, Typography } from 'antd'
import GlobalUpload from '@/components/GlobalUpload'
import { ImportStatus } from '../../const'
import { SUBJECT_TYPE_ENUM } from '@/constants'
import { InfoCircleFilled } from '@ant-design/icons'
import type useHook from '../../store'
import { findSiteData } from '@wotu/wotu-components'
import useSiteStore from '@/hooks/useSiteStore'

interface BulkImportProps {
    subject?: number
    importStatus: any
    setImportStatus: (e: any) => void
    Hook: useHook
    onLoadKnowledge?: () => void
    params: any
}
// bulkImport组件本身的状态类型
interface stateProps {
    rate: number
    setRate: React.Dispatch<React.SetStateAction<number>>
    continueImport: () => void
}

type ChildrenProps = BulkImportProps & stateProps

/**
 * 导入状态
 */

const PaddingModal: React.FC<ChildrenProps> = ({
    params,
    setImportStatus,
    Hook,
    setRate,
    subject,
    onLoadKnowledge,
}) => {
    const [startImportDisabled, setStartImportDisabled] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(false)
    /**.
     * 上传文件改变
     */
    const uploadChange = (file: any = []) => {
        if (file.length === 0) {
            setStartImportDisabled(true)
            Hook.updateImportParams({ url: '', name: '' })
            return
        }
        const { name, url } = file?.[0]?.response ?? {}
        if (name && url) {
            setStartImportDisabled(false)
            Hook.updateImportParams({ name, url })
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
    const pollingImportResult = async (code: any) => {
        let importResult = await Hook.getImportData(code)
        // 如果状态不为 2 | 3 的话，说明还没有导入结束
        // 2 导入状态结束，可能是成功，也可能是部分失败
        // 3 例如execl格式异常失败
        while (![2, 3].includes(importResult.status as number)) {
            await sleep(2) // 延迟2s
            importResult = await Hook.getImportData(code)
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
    }
    /**
     * 开始导入，获取导入结果
     */
    const excelImport = async () => {
        setLoading(true)
        Hook.excelImport(subject)
            .then(code => {
                setImportStatus(ImportStatus.loading)
                pollingImportResult(code).then(() => {
                    Hook.getTableData(params)
                    onLoadKnowledge?.()
                })
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <div className={styles.pointOut}>
            <Alert
                message={
                    subject === SUBJECT_TYPE_ENUM.REAL
                        ? 'Excel导入试题功能支持“单选题、多选题、判断题、填空题、简答题、组合题、计算题、论述题、案例分析题”九类题型的导入'
                        : 'Excel导入试题功能支持“单选题、多选题、判断题、组合题”四类题型的导入'
                }
                type="info"
                showIcon
            />
            <div className={styles.box}>
                <div className={styles.template}>
                    <div className={styles.title}>
                        <span className={styles.num}>1</span>
                        <span className="text">模板下载</span>
                    </div>
                    <div className={styles.content}>
                        <img
                            className={styles.image}
                            src="https://wtzp-img.oss-cn-hangzhou.aliyuncs.com/pdf/icon%EF%BC%8Ficon_excel%402x.png"
                            alt="下载模板"
                        />

                        <Typography.Link
                            href={
                                subject === SUBJECT_TYPE_ENUM.REAL
                                    ? 'https://img-test.zpimg.cn/public_read/import_question/17095681djs7g4xs.xlsx'
                                    : 'https://img-test.zpimg.cn/public_read/import_question/17103451bfl3r0u8.xlsx'
                            }
                        >
                            <Button className={styles.button}>下载模板</Button>
                        </Typography.Link>
                    </div>
                </div>

                <div className={styles.name_list}>
                    <div className={styles.title}>
                        <span className={styles.num}>2</span>
                        <span className="text">试题上传</span>
                    </div>
                    <div className={styles.content}>
                        <svg
                            className="icon"
                            style={{ width: '48px', height: '48px', fill: 'var(--primary-color)' }}
                            aria-hidden="true"
                        >
                            <use xlinkHref={`#icon-lianxi111`} />
                        </svg>
                        <span className={styles.text}>仅支持xls、xlsx格式文件</span>
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
                            size={5}
                            className={styles.upload}
                        >
                            <Button
                                disabled={!startImportDisabled}
                                style={{ marginTop: '12px' }}
                                className={styles.button}
                            >
                                选择文件
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
 * 成功状态
 */
const ResolvedModal: React.FC<ChildrenProps> = ({ setImportStatus, Hook, continueImport }) => {
    return (
        <div className={styles.resolved_modal}>
            <div className={styles.content}>
                <svg className="icon" style={{ width: '35px', height: '35px' }} aria-hidden="true">
                    <use xlinkHref={`#yiwancheng`} />
                </svg>
                <span className={styles.text}>
                    成功导入
                    <span className={styles.success_count}>{Hook.importData?.successCount}条</span>
                    记录
                </span>
            </div>
            <div className={styles.buttons}>
                <Button
                    className={styles.button}
                    onClick={() => setImportStatus(ImportStatus.none)}
                >
                    完成
                </Button>
                <Button className={styles.button} type="primary" onClick={() => continueImport()}>
                    继续导入
                </Button>
            </div>
        </div>
    )
}

/**
 * 失败状态
 */
const RejectedModal: React.FC<ChildrenProps> = ({ Hook, continueImport }) => {
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
    const isAllFail = Hook.importData?.failCount === Hook.importData?.totalCount
    return (
        <div className={styles.rejected_modal}>
            <div className={styles.header}>
                <InfoCircleFilled className={styles.icon} />
                <div className={styles.texts}>
                    <div className={styles.content}>
                        {isAllFail ? (
                            <>
                                <div className={styles.title}>导入失败</div>共
                                {Hook.importData.totalCount}条，导入失败
                                <span className={styles.fail}>
                                    {Hook.importData?.failCount}条
                                </span>{' '}
                            </>
                        ) : (
                            <>
                                <div className={styles.title}>部分导入失败</div>共
                                {Hook.importData.totalCount}条，导入成功
                                <span className={styles.success}>
                                    {Hook.importData?.successCount}条
                                </span>{' '}
                                ， 导入失败{' '}
                                <span className={styles.fail}>{Hook.importData?.failCount}条</span>{' '}
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.texts}>
                    <span>失败记录</span>
                    {Hook.importData?.errorFileUrl ? (
                        <Typography.Link href={Hook.importData?.errorFileUrl}>
                            下载记录
                        </Typography.Link>
                    ) : null}
                </div>
                <Table
                    className={styles.table}
                    // @ts-ignore
                    dataSource={Hook.importData?.errorList ?? []}
                    columns={columns}
                    rowClassName={styles.rowClassName}
                    rowKey="code"
                    pagination={{ pageSize: 5, showSizeChanger: false }}
                />
            </div>
            <div className={styles.buttons}>
                <Button type="primary" onClick={() => continueImport()}>
                    再次导入
                </Button>
            </div>
        </div>
    )
}
/**
 * loading 导入中
 */
const LoadingModal: React.FC<ChildrenProps> = ({ Hook, rate }) => {
    const siteStore = useSiteStore()

    // 打开用户中心
    const openUserPCPage = () => {
        const { siteData } = siteStore
        const merchantUserDomain = findSiteData(siteData, 'merchantUserDomain', {
            findKey: 'baseInfo',
        })

        window.open(`${merchantUserDomain}/organization/action`, '_blank')
    }

    return (
        <div className={styles.loading_modal}>
            <Spin className={styles.loading_icon} spinning={true} />
            <div className={styles.loading_waitting}>导入中，请稍候...</div>
            <Tooltip title={Hook.importParams?.name} className={styles.filename}>
                {Hook.importParams?.name}
            </Tooltip>
            <Progress className={styles.loading} percent={rate} size="small" />
            <Button className={styles.btn} type="primary" onClick={openUserPCPage}>
                批量操作记录
            </Button>
        </div>
    )
}
const BulkImport: React.FC<BulkImportProps> = props => {
    const { importStatus, setImportStatus } = props
    const [rate, setRate] = useState(0)

    React.useEffect(() => {
        return () => {}
    }, [])
    /**
     * 关闭按钮
     */
    const handleCancel = () => {
        setRate(0) // 防止缓存rate，需要在关闭的时候设置为初始值0
        if (importStatus !== ImportStatus.loading) {
            setImportStatus(ImportStatus.none)
        } else {
            Modal.confirm({
                title: '弹窗关闭后，数据仍继续导入',
                content: '您可以在【组织中心-批量操作】列表页，查看具体的导入进度及结果',
                onOk: () => {
                    setImportStatus(ImportStatus.none)
                },
            })
        }
    }
    // 继续导入
    const continueImport = () => {
        setImportStatus(ImportStatus.padding)
        setRate(0) // 清空进度条
    }
    return (
        <Modal
            title="批量导入"
            maskClosable={false}
            open={importStatus !== ImportStatus.none}
            onCancel={handleCancel}
            destroyOnClose={true}
            footer={null}
            width="648px"
        >
            {/* 目前只有三种状态，导入前（padding），导入中(loading)，导入后(结果展示页面)(resolved 全部成功 | reject 全部失败或者部分失败 ) */}
            {importStatus === ImportStatus.padding ? (
                <PaddingModal
                    {...props}
                    continueImport={continueImport}
                    rate={rate}
                    setRate={setRate}
                />
            ) : null}
            {importStatus === ImportStatus.resolved ? (
                <ResolvedModal
                    {...props}
                    continueImport={continueImport}
                    rate={rate}
                    setRate={setRate}
                />
            ) : null}
            {importStatus === ImportStatus.rejected ? (
                <RejectedModal
                    {...props}
                    continueImport={continueImport}
                    rate={rate}
                    setRate={setRate}
                />
            ) : null}
            {importStatus === ImportStatus.loading ? (
                <LoadingModal
                    {...props}
                    continueImport={continueImport}
                    rate={rate}
                    setRate={setRate}
                />
            ) : null}
        </Modal>
    )
}

export default BulkImport
