import Http from '@/servers/http'
import { message } from 'antd'
import { authenticateRanges } from '../AddModal/api'

export default (props: any) => {
    const {
        recordId,
        type,
        tipsData,
        radioValue,
        setTipsVisible,
        setEditVisible,
        getDetail,
        handleCancel,
    } = props || {}
    const tipsHandleOk = () => {
        if (!radioValue) {
            message.warning(type === 'edit' ? '请选择编辑内容' : '请选择删除范围')
        } else if (type === 'edit') {
            setEditVisible(true)
            setTipsVisible(false)
        } else {
            const deleteId = tipsData.find((ele: any) => ele?.code === radioValue)?.code
            const level = tipsData.find((ele: any) => ele?.code === radioValue)?.level
            const object = Number(level) === 5 ? 2 : Number(level) === 4 ? 3 : 1
            Http(`${authenticateRanges}/delete_range_point`, 'POST', {
                type: object,
                code: deleteId,
                authenticateCode: recordId,
            }).then(() => {
                message.success('删除成功')
                getDetail(recordId)
                handleCancel()
            })
        }
    }

    return {
        tipsHandleOk,
    }
}
