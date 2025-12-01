import { message, Modal } from 'antd'
import wrapper from '@/utils/wrapper'
import Http from '@/servers/http'
import api from './api'
interface IProps {
    visible: boolean
    closeDialog: () => void
    data: any // 详情
    actionRef: any // 刷新表格
}

const CloseEnrollModal = (props: IProps) => {
    const { closeDialog, visible, data, actionRef } = props || {}

    /**
     *  onSubMit
     */
    const onSubMit = async () => {
        await Http(`${api.close}`, 'POST', { code: data.code }, { repeatFilter: false })
        closeDialog()
        actionRef && actionRef.current?.reload()
        message.success('关闭成功')
    }

    return (
        <Modal title="关闭报名" open={visible} onCancel={closeDialog} onOk={onSubMit} centered>
            <p>关闭后用户将不能提交在线报名，确定要关闭吗？</p>
        </Modal>
    )
}

export default wrapper(CloseEnrollModal)
