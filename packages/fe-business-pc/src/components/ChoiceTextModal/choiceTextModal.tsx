import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Space, Button, Table, message, Tag } from 'antd'
import styles from './index.module.less'
import { useLocalObservable, Observer } from 'mobx-react'
import type { ColumnsType } from 'antd/es/table'
import type { ItemType } from './interface'
import Hooks from './store'
import dayjs from 'dayjs'
import MoreSelect from '@/components/MoreSelect'
import { getCookie } from '@/storage'
import { cloneDeep } from 'lodash'
import type { PreviewItem } from '@/pages/gateway/components/utils/interface'
import { LAYOUT_STYLE } from '@/pages/gateway/components/utils/interface.d'

interface PropsType {
    visible: boolean
    onCancel: () => void
    onSubmit: (data: any) => void
    selectionType: string
    selectKey?: string[]
    setSelectKey?: any
    valData?: any
    data?: PreviewItem
}

export default (props: PropsType) => {
    const organizationCode = getCookie('SELECT_ORG_CODE')

    const hooks = useLocalObservable(() => new Hooks())
    const [okButton, setOkButton] = useState<boolean>(true) //确定有没有选择数据 没有设置为true

    const { visible, onCancel, onSubmit, selectionType, selectKey, setSelectKey, valData, data } =
        props

    const [choiceVal, setChoiceVal] = useState<any>([]) //选择得 数据

    const [choiceKeys, setChoiceKeys] = useState<any>([])

    const [form] = Form.useForm()

    const limitCount = data?.layoutStyle === LAYOUT_STYLE.IMAGE_LEFT_TITLE_RIGHT ? 5 : 10

    useEffect(() => {
        if (visible && selectionType === 'checkbox') {
            setChoiceVal(valData)
            setChoiceKeys(selectKey)
        }
    }, [visible])

    const Finish = () => {
        if (choiceVal.length > limitCount) {
            message.error(`最多添加${limitCount}条`)
        } else {
            selectionType === 'checkbox' && setSelectKey(choiceKeys)
            onSubmit(choiceVal)
        }
    }

    useEffect(() => {
        if (!visible) {
            form.resetFields()
            hooks.resetData()
            setOkButton(true)
        } else {
            // hooks.getDefaultGraphicData(props.selectKey as string[])
            hooks.getGraphicData()
        }
    }, [visible])

    const rowSelection = {
        selectedRowKeys: choiceKeys,
        onChange: (selectedRowKeys: React.Key[]) => {
            if (selectedRowKeys.length !== 0) {
                setOkButton(false)
            }
        },

        onSelect: (record: any, selected: any) => {
            if (selected) {
                if (choiceKeys?.length > limitCount - 1) {
                    message.error(`最多添加${limitCount}条`)
                    return
                }

                if (selectionType === 'checkbox') {
                    setChoiceVal((v: any) => {
                        return v.concat(record)
                    })
                    setChoiceKeys((v: any) => {
                        return v.concat(record.code)
                    })
                    hooks.choiceLength = choiceVal.length
                } else {
                    setChoiceKeys([record?.code])
                    setChoiceVal([record])
                }
            }
            if (!selected) {
                let productListSelected = cloneDeep(choiceVal)

                let delIndex = null
                for (let i = 0; i < productListSelected.length; i++) {
                    if (productListSelected[i].code === record.code) {
                        delIndex = i
                        break
                    }
                }
                if (delIndex !== null) {
                    productListSelected.splice(delIndex, 1)
                    let filterArr = productListSelected?.map(i => {
                        return i.code
                    })
                    setChoiceVal(productListSelected)
                    selectionType === 'checkbox' && setChoiceKeys(filterArr)
                    hooks.choiceLength = choiceVal.length
                }
            }
        },
        onSelectAll: (selected: any, selectedRows: any, changeRows: any) => {
            if (selected) {
                if (choiceKeys?.length > limitCount - 1) {
                    message.error(`最多添加${limitCount}条`)
                    return
                }
                // store.selectedRows = store.selectedRows.concat(changeRows)
                setChoiceVal((v: any) => {
                    return v.concat(changeRows)
                })
                let filterArr = changeRows?.map(i => {
                    return i.code
                })
                setChoiceKeys((v: any) => {
                    return v.concat(filterArr)
                })
            }
            if (!selected) {
                let productListSelected = cloneDeep(choiceVal)
                console.log('🍊!selected:', productListSelected)
                let delIndex = []
                for (let i = 0; i < productListSelected.length; i++) {
                    for (let j = 0; j < changeRows.length; j++) {
                        if (changeRows[j].code === productListSelected[i].code) {
                            delIndex.push(i)
                            break
                        }
                    }
                }
                for (let k = delIndex.length - 1; k >= 0; k--) {
                    productListSelected.splice(delIndex[k], 1)
                }
                let pureProductListSelected = productListSelected.filter((item: any) => {
                    return item !== undefined
                })

                setChoiceVal(pureProductListSelected)
                let filterArr = pureProductListSelected?.map(i => {
                    return i.code
                })
                setChoiceKeys(filterArr)
            }
        },
    }

    //表格数据
    const columns: ColumnsType<ItemType> = [
        {
            title: '图文标题',
            align: 'center',
            dataIndex: 'title',
            width: '32%',
            render(col: string) {
                return <div className={styles.title}>{col ? col : '-'}</div>
            },
        },
        {
            title: '分类',
            align: 'center',
            dataIndex: 'categoryNameList',
            width: '32%',
            render(col: []) {
                return (
                    <>
                        {col?.length !== 0
                            ? col?.map(item => {
                                  return (
                                      <Tag
                                          key={item}
                                          color="default"
                                          style={{
                                              marginRight: 4,
                                              marginBottom: 4,
                                          }}
                                      >
                                          {item}
                                      </Tag>
                                  )
                              })
                            : '-'}
                    </>
                )
            },
        },
        {
            title: '发布时间',
            align: 'center',
            dataIndex: 'publishTime',
            width: '32%',
            render(col: number) {
                return <>{col ? dayjs(col).format('YYYY-MM-DD HH:mm:ss') : '-'}</>
            },
        },
    ]

    // 过滤重复数据
    const filterSameData = (listA: any[], listB: any[]) => {
        const tempListA = cloneDeep(listA)
        const tempListB = cloneDeep(listB)
        tempListA.map(listAItem => {
            tempListB.map((listBItem: any, idx: number) => {
                if (listAItem?.code === listBItem?.code) {
                    tempListB.splice(idx, 1)
                }
            })
        })
        return tempListA.concat(tempListB)
    }

    return (
        <div className={styles.page}>
            <Modal
                forceRender
                title={'选择图文'}
                visible={visible}
                onCancel={onCancel}
                width={1000}
                onOk={Finish}
                className={styles.boxModal}
                destroyOnClose
                maskClosable={false}
                okButtonProps={{
                    disabled: okButton,
                }}
            >
                <div style={{ marginBottom: 24 }}>
                    <Form layout="inline" form={form}>
                        <Form.Item label="图文标题" name="title">
                            <Input placeholder="请输入" />
                        </Form.Item>
                        <Form.Item label="分类" name="categoryCodes" style={{ minWidth: 250 }}>
                            <MoreSelect
                                all={false}
                                placeholder="请选择"
                                valueKey={'code'}
                                requestParams={{ organizationCode }}
                                requestUrl={'/business/imagetext_category/page'}
                                className={styles.view}
                                beforeChange={(_, selectItem: any) => {
                                    form.setFieldValue('categoryCodes', selectItem?.code)
                                }}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Space>
                                <Button
                                    type="primary"
                                    onClick={() => hooks.searchData(form.getFieldsValue())}
                                >
                                    查询
                                </Button>
                                <Button
                                    onClick={() => {
                                        form.resetFields()
                                        hooks.resetData()
                                    }}
                                >
                                    重置
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </div>
                <Button
                    style={{ marginBottom: 16 }}
                    type="primary"
                    onClick={() => {
                        onCancel()
                        setTimeout(() => {
                            window.open('/content/graphic/add-graphic', '_blank')
                        }, 100)
                    }}
                >
                    新建图文
                </Button>
                <Observer>
                    {() => {
                        return (
                            <Table
                                columns={columns}
                                // TODO 过滤重复数据
                                dataSource={filterSameData(hooks.dataSource, hooks.oldSource)}
                                pagination={{
                                    current: hooks.pageNo,
                                    pageSize: hooks.pageSize,
                                    total: hooks.totalCount,
                                    onChange: hooks.pageHandelr,

                                    showQuickJumper: true,
                                    // showSizeChanger: true,
                                }}
                                rowSelection={{
                                    preserveSelectedRowKeys: true,
                                    type: selectionType,
                                    ...rowSelection,
                                }}
                                rowKey={record => record?.code}
                            />
                        )
                    }}
                </Observer>
            </Modal>
        </div>
    )
}
