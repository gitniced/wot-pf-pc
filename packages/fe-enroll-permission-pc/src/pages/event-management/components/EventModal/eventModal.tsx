import { message, Modal } from 'antd'
import wrapper from '@/utils/wrapper'
import { RELEASE_TYPE } from '../superTables/const'
import Http from '@/servers/http'
import api from './api'
interface IProps {
    visible: boolean
    closeDialog: () => void
    record: any // 详情
    flag: number //   0取消发布     1 发布
    actionRef: any //刷新表格
}

/**  取消发布  发布  modal  */
const EventModal = (props: IProps) => {
    const { visible, closeDialog, record, flag, actionRef } = props || {}

    const title = flag === RELEASE_TYPE.RELEASE ? '发布' : '取消发布'
    const content =
        flag === RELEASE_TYPE.RELEASE
            ? '发布后该报名活动对用户可见，确定要发布吗？'
            : '取消发布后该报名活动对用户不可见，确定要取消发布吗？'

    const onEventSubmit = async () => {
        await Http(
            `${api.edit_publish}?code=${record.code}&status=${flag}`,
            'POST',
            {},
            { repeatFilter: false },
        )
        closeDialog()
        actionRef && actionRef.current?.reload()
        flag ? message.success('发布成功') : message.success('取消发布成功')
    }

    return (
        <Modal
            title={title}
            open={visible}
            onCancel={closeDialog}
            onOk={onEventSubmit}
            centered
            destroyOnClose={true}
        >
            <p>{content}</p>
        </Modal>
    )
}

export default wrapper(EventModal)
