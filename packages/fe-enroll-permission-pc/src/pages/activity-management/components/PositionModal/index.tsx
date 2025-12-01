import React, { useEffect, useState } from 'react'
import { Modal, Tabs } from 'antd'
import wrapper from '@/utils/wrapper'
import type { PositionModalProps } from './interface'
import { AllDataSuperTable, SelectSuperTable } from './hooks'

const PositionModal: React.FC<PositionModalProps> = props => {
    const { visible, closeDialog, value, submit } = props

    /**  储存选择的数据  */
    const [selectedPosition, setSelectedPosition] = useState<any>([])

    useEffect(() => {
        if (value) {
            setSelectedPosition(value)
        }
    }, [value])

    return (
        <Modal
            open={visible}
            centered
            width={1200}
            title={'选择岗位'}
            onCancel={closeDialog}
            onOk={() => {
                submit?.(selectedPosition)
                closeDialog()
            }}
        >
            <Tabs
                defaultActiveKey="1"
                items={[
                    {
                        label: `全部`,
                        key: '1',
                        children: (
                            <AllDataSuperTable
                                selectedPosition={selectedPosition}
                                setSelectedPosition={setSelectedPosition}
                            />
                        ),
                    },
                    {
                        label: `已选（${selectedPosition?.length || 0}）`,
                        key: '2',
                        children: (
                            <SelectSuperTable
                                selectedPosition={selectedPosition}
                                setSelectedPosition={setSelectedPosition}
                            />
                        ),
                    },
                ]}
            />
        </Modal>
    )
}

export default wrapper(PositionModal)
