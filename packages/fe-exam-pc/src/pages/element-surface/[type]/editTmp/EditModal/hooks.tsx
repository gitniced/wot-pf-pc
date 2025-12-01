import { useEffect } from 'react'
import Http from '@/servers/http'
import { message } from 'antd'
import type { editType } from './interface'
import { history } from 'umi'
import { authenticateRanges } from '../AddModal/api'
export default (form: any, props: any) => {
    const { recordId } = history.location.query || {}
    const { getDetail, editData, handleCancel } = props || {}
    const { code: editDataId } = editData || {}
    const handleOk = () => {
        form.validateFields().then(async (values: editType) => {
            const { rate } = values || {}
            const params = {
                code: editDataId,
                authenticateCode: recordId,
                type: rate ? 1 : 2,
                ...values,
            }
            Http(`${authenticateRanges}/edit_range_point`, 'POST', params).then(() => {
                message.success('修改成功！')
                getDetail()
                handleCancel()
            })
        })
    }
    const limitDecimals = (value: any) => {
        //只可输入0.5倍数
        const val = typeof value === 'string' ? value : String(value)
        let str = val.replace(/[^\d.]/g, '')
        const pointIndex = str.search(/\./)
        if (-1 !== pointIndex) {
            str = str.substr(0, pointIndex + 1).replace(/\./, '.5')
        }
        return str
    }
    useEffect(() => {}, [])
    return {
        handleOk,
        limitDecimals,
    }
}
