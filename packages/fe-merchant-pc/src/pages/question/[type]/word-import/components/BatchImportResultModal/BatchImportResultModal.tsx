import React, { useEffect, useState } from 'react'
import wrapper from '../../wrapper'
import { observer } from 'mobx-react'

import { Modal, Spin, Button } from 'antd'
import wordImportStore from '../../store'
import http from '@/servers/http'
import apis from '@/servers/apis'
import styles from './BatchImportResultModal.less'
import { CheckCircleOutlined } from '@ant-design/icons'
import { SUBJECT_TYPE_ENUM } from '@/constants'
import type { AnalysisQuestionWordUsingPOSTRequest } from '../../interface'

interface BatchImportResultModalProps {
    visible: boolean
    closeDialog: () => void
    loading: boolean
    params: AnalysisQuestionWordUsingPOSTRequest
    code: string
    merchantCode: string
    request?: any
    goList: () => void
}
interface ImportDataProps {
    code?: string
    failCount?: number
    failDtoList?: any[]
    failFileName?: string
    failFileUrl?: string
    importStatus?: number
    successCount?: number
    totalCount?: number
}
const BatchImportResultModal: React.FC<BatchImportResultModalProps> = props => {
    const { loading, merchantCode, params } = props
    const [spinning, setSpinning] = useState(loading)
    const [importData, setImportData] = useState<ImportDataProps>({})
    const [status, setStatus] = useState('') // 导入成功 success ｜ 导入失败 fail

    const downlodaFail = (url?: string) => {
        let newUrl = url ? url : importData.failFileUrl
        let a = document.createElement('a') //创建a标签
        a.style.display = 'none' //使其隐藏
        a.href = newUrl! //赋予文件下载地址
        a.setAttribute('download', '《职业/工种/等级理论试题Word智能识别失败原因.doc》') //设置下载属性 以及文件名
        document.body.appendChild(a) //a标签插至页面中
        a.click() //强制触发a标签事件
        document.body.removeChild(a)
    }

    useEffect(() => {
        http(apis.wordImport, 'post', { ...params })
            .then(code => {
                http(apis.getImportResult, 'post', { businessType: 2, code, merchantCode }).then(
                    _data => {
                        const data = _data as unknown as ImportDataProps
                        if (data.failCount === 0) {
                            setStatus('success')
                        } else {
                            setStatus('fail')
                            // 自动下载失败文档
                            downlodaFail(data.failFileUrl!)
                        }
                        setSpinning(false)
                        setImportData(data)
                    },
                )
            })
            .catch((err: any) => {})
        return () => {
            wordImportStore.updateTextValue('')
        }
    }, [])

    const againImport = () => {
        // 清空文本的内容，
        wordImportStore.updateTextValue('')
        props.closeDialog()
    }
    const returnList = () => {
        props.closeDialog()
        props.goList()
    }
    const footer = () => {
        if (spinning) return null
        if (status === 'success') {
            return (
                <>
                    <Button key="returnList" onClick={returnList}>
                        返回列表
                    </Button>
                    <Button key="againImport" type="primary" onClick={againImport}>
                        继续导入
                    </Button>
                </>
            )
        } else if (status === 'fail') {
            return (
                <>
                    <Button key="againImport" onClick={againImport}>
                        返回重新录入
                    </Button>
                    <Button key="downlodaFail" type="primary" onClick={() => downlodaFail()}>
                        下载失败记录
                    </Button>
                </>
            )
        }
    }

    return (
        <Modal
            centered
            width={648}
            title={`Word智能录入${params.subject === SUBJECT_TYPE_ENUM.REAL ? '理论' : '模拟'}试题`}
            open={props.visible}
            onCancel={props.closeDialog}
            footer={footer()}
        >
            <Spin spinning={spinning}>
                {spinning && (
                    <div className={styles.loading_tips}>
                        <div>智能识别中，请稍后...</div>
                        <div>请勿关闭浏览器</div>
                    </div>
                )}
                {status === 'fail' && (
                    <div className={styles.fail}>
                        <img src="https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/public/fe-merchant-pc/fail.png" />
                        <div className={styles.content}>
                            <div className={styles.title}>
                                已识别导入 {importData.successCount}条
                                理论试题，部分理论试题识别失败
                            </div>
                            <div className={styles.tips}>
                                {importData.failCount}
                                条失败记录，将自动为您下载失败记录文档，您也可以手动下载，
                                修改试题内容后重新操作录入
                            </div>
                        </div>
                    </div>
                )}
                {status === 'success' && (
                    <div className={styles.success}>
                        <CheckCircleOutlined className={styles.checkCircle} />
                        <div className={styles.tips}>
                            成功导入 {importData.successCount} 道 理论试题
                        </div>
                    </div>
                )}
            </Spin>
        </Modal>
    )
}

export default wrapper(observer(BatchImportResultModal))
