import { Modal } from 'antd'
import styles from './index.module.less'
import { SuperTable } from '@wotu/wotu-components'
import type { ColumnsType } from '@wotu/wotu-components/dist/esm/SuperTable/interface'
import { observer } from 'mobx-react'
import Http from '@/servers/http'
import dayjs from 'dayjs'
import { getCookie } from '@/storage'
import { useEffect, useState } from 'react'
import type { ImageTextCategoryAndCountRespDto } from '@/@types/business'

interface IChoiceCategoryModalProps {
    closeDialog: () => void
    visible: boolean
    data?: any
    fixPreviewList?: (data: any) => void
    onSubmit?: (data: any) => void
    mode: 'mobile' | 'pc'
}

/**  选择分类modal  */
const ChoiceCategoryModal = ({
    visible,
    closeDialog,
    data,
    fixPreviewList,
    onSubmit,
    mode,
}: IChoiceCategoryModalProps) => {
    /**  当前选择的分类的id  */
    const [category, setCategory] = useState<string[]>([])
    /**  当前选择的行数据  */
    const [selectedRow, setSelectedRow] = useState<ImageTextCategoryAndCountRespDto[]>([])

    /** 打开modal 回显选择的数据  */
    useEffect(() => {
        data?.selectCategory?.[0]?.id && setCategory([data?.selectCategory?.[0]?.id])
    }, [data?.selectCategory, data?.codes])

    /**  获取列表数据  */
    const getCategoryList = async (params: any) => {
        const res = await Http('/business/imagetext_category/pageCategoryAndCount', 'post', params)
        return res
    }
    /**  根据分类获取最新的4条图文数据  */
    const getLastImgText = async () => {
        let params = {
            pageNo: 1,
            pageSize: 10,
            organizationCode: getCookie('SELECT_ORG_CODE') || '',
            categoryCodes: [selectedRow?.[0]?.id],
        }
        const res = await Http('/business/front/imagetext/page', 'post', params)

        const { data: LastImgTextArr = [] } = res || {}

        return LastImgTextArr || []
    }

    /**  modal ok 事件  */
    const onModalOk = async () => {
        let res = await getLastImgText()
        res = mode === 'pc' ? res : res?.slice(0, 4) || []

        onSubmit?.(selectedRow)
        selectedRow &&
            selectedRow?.length &&
            fixPreviewList &&
            fixPreviewList({
                ...data,
                codes: res,
                selectCategory: selectedRow,
            })
        closeDialog()
    }

    const columns = (): ColumnsType<ImageTextCategoryAndCountRespDto> => {
        return [
            {
                title: '分类名称',
                dataIndex: 'name',
                render: (_, { name }) => <>{name || '-'}</>,
            },
            {
                title: '图文数量',
                dataIndex: 'imageTextCount',
                render: (_, { imageTextCount }) => <>{imageTextCount}</>,
            },
            {
                title: '创建时间',
                dataIndex: 'createdAt',
                render: (_, { createdAt }) => (
                    <>{createdAt ? dayjs(createdAt).format('YYYY-MM-DD HH:mm:ss') : '-'}</>
                ),
            },
        ]
    }

    return (
        <Modal
            title={'选择分类'}
            open={visible}
            onCancel={closeDialog}
            width={1000}
            onOk={onModalOk}
            destroyOnClose={true}
            maskClosable={false}
            className={styles.choice_category_modal_props}
            // okButtonProps={{
            //     disabled: selectedRow?.[0]?.imageTextCount === 0,
            // }}
        >
            <SuperTable
                scroll={{ y: 300 }}
                indentSize={30}
                columns={columns()}
                search={false}
                params={{ organizationCode: getCookie('SELECT_ORG_CODE') || '' }}
                rowKey="id"
                rowSelection={
                    {
                        type: 'radio',
                        selectedRowKeys: category,

                        preserveSelectedRowKeys: true,
                        onChange: (
                            selectedRowKeys: string[],
                            selectedRows: ImageTextCategoryAndCountRespDto[],
                        ) => {
                            setCategory(selectedRowKeys)
                            setSelectedRow(selectedRows)
                        },
                        // getCheckboxProps: (record: ImageTextCategoryAndCountRespDto) => {
                        //     return {
                        //         // disabled: record.imageTextCount === 0,
                        //     }
                        // },
                    } as any
                }
                request={getCategoryList as any}
            />
        </Modal>
    )
}

export default observer(ChoiceCategoryModal)
