import { Modal } from 'antd'
import { useEffect, useState } from 'react'
// import styles from './index.module.less'
import { SuperTable } from '@wotu/wotu-components'
import { cloneDeep } from 'lodash'
import { utils } from './utils'

interface ISelectQuizContentModalProps {
    visible: boolean
    onCancel?: () => void
    choiceData?: any //选择的数据为了回显
    onOk: (e: any) => void
    type?: 'checkbox' | 'radio' // 多选单选框
}
export const API = {
    getBrhQstData: '/question/front/practice/page',
}

/**   刷题modal  */
const SelectQuizContentModal: React.FC<ISelectQuizContentModalProps> = ({
    visible,
    onCancel,
    choiceData = [],
    onOk,
    type = 'checkbox',
}) => {
    /**   判断有没有选择数据 没有设置为true  */
    const [okButton, setOkButton] = useState<boolean>(true)
    /**  多选  选择的数据  */
    const [selectRows, setSelectRows] = useState<any>([])

    useEffect(() => {
        const selectLength = selectRows?.length || 0
        if (selectLength > 0) {
            setOkButton(false)
        } else {
            setOkButton(true)
        }
    }, [selectRows])

    useEffect(() => {
        if (visible) {
            let newSelectData = cloneDeep(choiceData)
            setSelectRows(newSelectData)
        } else {
            setSelectRows([])
        }
    }, [visible, choiceData])

    /**
     * finish   ok确定事件
     * columns  列 columns
     * tableRequest  table 列表数据请求
     * rowSelection  多选的框操作
     */
    const { finish, columns, tableRequest, rowSelection } = utils(
        selectRows,
        setOkButton,
        onOk,
        setSelectRows,
    )

    return (
        <Modal
            forceRender
            title={'选择练习'}
            open={visible}
            onCancel={onCancel}
            width={1000}
            onOk={finish}
            destroyOnClose
            maskClosable={false}
            okButtonProps={{
                disabled: okButton,
            }}
        >
            <SuperTable
                scroll={{ y: 300 }}
                columns={columns}
                request={tableRequest as any}
                layout="inline"
                formProps={{
                    labelCol: { span: 8 },
                }}
                rowKey={'code'}
                rowSelection={{
                    type: type,
                    ...rowSelection(type),
                    preserveSelectedRowKeys: true,
                }}
            />
        </Modal>
    )
}

export default SelectQuizContentModal
