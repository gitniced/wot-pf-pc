import styles from './index.modules.less'
import { Form, Modal, Row, Tabs, Alert, Table, Switch, Button } from 'antd'
import { Hooks } from './hooks'
import { useEffect, useState } from 'react'
import SelectClassifyModal from './components/selectClassifyModal'
import SettingStore from './store'
import { observer, useLocalObservable } from 'mobx-react'
import type { IRoute } from 'umi'
import { useLocation, history } from 'umi'
import { EditOutlined, DeleteOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { message } from 'antd'
import { items } from './const'
import { FooterBtn } from './FooterBtn'
import { cloneDeep } from 'lodash'
import type { ColumnsType } from 'antd/lib/table'
import { TYPE_ENUM } from '../event-management/components/superTables/const'
import CustomFieldModal from './components/CustomFieldModal'
import EnrollDetails from './components/EnrollDetails'
import CustomTitle from '@/components/CustomTitle'
import { setPageTitle } from '@/utils/setDocTitle'

interface IProps {
    store: SettingStore
}

const formLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 10 },
}

// 添加依赖关系配置
const FIELD_PARENT_CHILD: Record<string, string[]> = {
    // key是父字段，value是子字段数组
    ORIGINAL_CERTIFICATE: [
        'ORIGINAL_CERTIFICATE_OCCUPATION',
        'ORIGINAL_CERTIFICATE_JOB_TYPE',
        'ORIGINAL_CERTIFICATE_LEVEL',
        'ORIGINAL_CERTIFICATE_NUMBER',
        'CERTIFICATE_PHOTO',
        'CERTIFICATION_TIME',
        'ORIGINAL_CERTIFICATE_ISSUING_UNIT',
    ],
    PROFESSIONAL_TITLE_CERTIFICATE: [
        'CURRENT_PROFESSIONAL_TITLE',
        'CURRENT_PROFESSIONAL_LEVEL',
        'CURRENT_PROFESSIONAL_NUMBER',
        'CURRENT_PROFESSIONAL_CERTIFICATE_DATE',
        'CURRENT_PROFESSIONAL_CERTIFICATE_ISSUING_UNIT',
        'CURRENT_PROFESSIONAL_JOB_CERTIFICATE',
    ],
}

const EnrollSetting: React.FC<IProps> = () => {
    const [form] = Form.useForm()
    // 监听数据
    const openPay = Form.useWatch('openPay', form)
    // const status = Form.useWatch('status', form)
    const entryCodeInteger = Form.useWatch('entryCodeInteger', form)
    const cancelFlag = Form.useWatch('cancelFlag', form)
    const store = useLocalObservable(() => new SettingStore())
    // @ts-ignore
    const { query } = useLocation() || {}

    /**
     * code 活动code
     * exam | career | train | school 业务线的code标识
     * bizType 活动类型
     */
    const { code = '', tab = 0 } = query || {}

    /** 关闭报名弹窗   */
    const [controls, setControls] = useState(false)
    /** 选择分类弹窗    */
    const [selectClassify, setSelectClassify] = useState(false)
    /**  selectKey  */
    const [selectKey, setSelectKey] = useState(items[tab].key)

    /**   Hooks  */
    const { getFields, scrollToAnchor, getBasicInformation, disBtn } = Hooks({
        setSelectClassify,
        store,
        form,
        setSelectKey,
        entryCodeInteger,
        isOpenEnrollPay: store.isOpenEnrollPay,
    })
    /**
     *
     * openType 控制开启/关闭展示的switch
     * closeType 代表是否可以更改 对应的openType开关
     * requiredType 控制开启/关闭必填的switch
     * editType 代表是否可以更改 对应的requiredType开关
     */
    const handleChange = (
        field: 'openType' | 'requiredType',
        value: any,
        pos: number,
        record: { closeType: number; editType: number; alias: string; name?: string },
    ) => {
        // 当有已报人数 appliedNum
        if (Number(store?.echoDetail?.appliedNum)) {
            const fields = [
                'ATTACHMENT_DOC', // 附件材料
                'HOUSEHOLD_REGISTRATION_LOCATION', // 户籍所在地
                'REGISTERED_RESIDENCE_NATURE', // 户籍性质
            ]
            if (fields.includes(record?.alias)) {
                return message.error('该字段不可修改')
            }
        }

        if (field === 'openType' && record.closeType === 0) {
            return message.error(`该字段不可${value ? '关闭' : '开启'}`)
        }

        if (field === 'openType') {
            // 检查是否是父字段
            const isParentField = FIELD_PARENT_CHILD[record.alias]
            // 检查是否是子字段
            const parentField = Object.entries(FIELD_PARENT_CHILD).find(([, children]) =>
                children.includes(record.alias),
            )?.[0]

            if (value) {
                // 开启字段
                if (parentField) {
                    // 如果是子字段被开启，自动开启父字段
                    const parentIndex = store.fields.findIndex(f => f.alias === parentField)
                    if (parentIndex !== -1 && !store.fields[parentIndex].openType) {
                        store.updateField('openType', 1, parentIndex)
                    }
                }
            } else {
                // 关闭字段
                if (isParentField) {
                    // 如果是父字段，检查是否有子字段开启
                    const childFields = FIELD_PARENT_CHILD[record.alias]
                    const hasOpenChildren = childFields.some(childAlias => {
                        const childField = store.fields.find(f => f.alias === childAlias)
                        return childField?.openType === 1
                    })

                    if (hasOpenChildren) {
                        return message.error(`已开启${record.name}相关字段，不支持关闭`)
                    }
                }
                //  else if (parentField) {
                //     // 如果是子字段被关闭，检查其他子字段状态
                //     const siblingFields = FIELD_PARENT_CHILD[parentField]
                //     const hasOtherOpenSiblings = siblingFields.some(siblingAlias => {
                //         if (siblingAlias === record.alias) return false // 排除当前正在关闭的字段
                //         const siblingField = store.fields.find(f => f.alias === siblingAlias)
                //         return siblingField?.openType === 1
                //     })

                //     // 如果没有其他开启的子字段，自动关闭父字段
                //     if (!hasOtherOpenSiblings) {
                //         const parentIndex = store.fields.findIndex(f => f.alias === parentField)
                //         if (parentIndex !== -1) {
                //             store.updateField('openType', 0, parentIndex)
                //         }
                //     }
                // }
            }
        }

        if (field === 'requiredType') {
            //@ts-ignore
            if (record.openType === 0) {
                return message.error('请先开启字段展示')
            }

            if (record.editType === 0) {
                return message.error('该字段不可调整')
            }
        }

        // 更新字段状态
        store.updateField(field, value, pos)
    }
    /**
     * 生成报名表单
     */
    const renderEnrollFormSetting = () => {
        const { fields } = store
        let tempFields = cloneDeep(fields)
        const hasApplay = Number(store?.echoDetail?.appliedNum)

        // 按字段类型分组并计算rowspan
        const fieldGroups = tempFields.reduce((acc: any, curr: any) => {
            if (!acc[curr.fieldType]) {
                acc[curr.fieldType] = {
                    items: [],
                    rowSpan: 0,
                    fieldTypeDesc: curr.fieldTypeDesc,
                }
            }
            acc[curr.fieldType].items.push(curr)
            acc[curr.fieldType].rowSpan++
            return acc
        }, {})

        const columns: ColumnsType<any> = [
            {
                title: '字段类型',
                dataIndex: 'fieldTypeDesc',
                onCell: record => {
                    const group = fieldGroups[record.fieldType]
                    const groupIndex = group.items.findIndex(
                        (item: any) => item.alias === record.alias,
                    )

                    return {
                        rowSpan: groupIndex === 0 ? group.rowSpan : 0,
                        style: { verticalAlign: 'top', paddingTop: '12px' },
                    }
                },
                render: (text, record) => {
                    const group = fieldGroups[record.fieldType]
                    const isFirstInGroup = group.items[0].alias === record.alias

                    return (
                        <div className={styles.field_type_cell}>
                            <div className={styles.field_type_content}>{text}</div>
                            {isFirstInGroup && (
                                <Button
                                    className={styles.add_field_btn}
                                    size="small"
                                    onClick={() => {
                                        if (hasApplay) {
                                            return message.error('已有报名信息，不支持新增字段')
                                        }
                                        store.showCustomFieldModal(
                                            record.fieldType,
                                            record.fieldTypeDesc,
                                        )
                                    }}
                                >
                                    + 添加字段
                                </Button>
                            )}
                        </div>
                    )
                },
            },
            {
                title: '字段名称',
                dataIndex: 'name',
                render: (text, record) => {
                    if (record.customField) {
                        return (
                            <div className={styles.field_name_cell}>
                                <span className={styles.field_name_text}>{text}</span>
                                <div className={styles.field_actions}>
                                    <EditOutlined
                                        className={styles.edit_icon}
                                        onClick={() => {
                                            if (hasApplay) {
                                                return message.error('已有报名信息，不支持编辑')
                                            }
                                            store.showEditFieldModal(record)
                                        }}
                                    />
                                    <DeleteOutlined
                                        className={styles.delete_icon}
                                        onClick={() => {
                                            if (hasApplay) {
                                                return message.error('已有报名信息，不支持删除')
                                            }
                                            store.showDeleteConfirm(record)
                                        }}
                                    />
                                </div>
                            </div>
                        )
                    }
                    return text
                },
            },
            {
                title: '开启/关闭展示',
                dataIndex: 'openType',
                render: (text, record, index) => {
                    return (
                        <Switch
                            checked={!!text}
                            onChange={value => handleChange('openType', value, index, record)}
                        />
                    )
                },
            },
            {
                title: '开启/关闭必填',
                dataIndex: 'requiredType',
                render: (text, record, index) => {
                    return (
                        <Switch
                            checked={!!text}
                            onChange={value => handleChange('requiredType', value, index, record)}
                        />
                    )
                },
            },
        ]

        return (
            <>
                <Table
                    bordered
                    columns={columns}
                    dataSource={tempFields}
                    pagination={false}
                    onChange={() => {
                        console.log('改变')
                    }}
                />
                <CustomFieldModal
                    visible={store.customFieldModalVisible}
                    onCancel={store.hideCustomFieldModal}
                    onOk={store.addCustomField}
                    loading={store.customFieldLoading}
                    editingField={store.editingField}
                    customFieldType={store.customFieldType}
                />
            </>
        )
    }
    /** 编辑获取详情  */
    const init = async () => {
        if (code) {
            await store.getEnrollSetDetail(code)
        } else {
            await store.getBizEventDetails(query)
        }
        await store.setDetailFieldList(store.enrollSetDetail?.fieldDtoList)
        form.setFieldsValue(store.echoDetail)
        /** 最大报名人数   */
        if (!store.echoDetail.quota) {
            form.setFieldsValue({ quota: '' })
        }
        /**  富文本回显  */
        store.editorText = store.echoDetail?.detail as string
    }

    useEffect(() => {
        if (entryCodeInteger) {
            // 获取报名设置表单
            store.getEnrollFormSetting(entryCodeInteger, code)
        }
    }, [entryCodeInteger])
    /**  编辑获取详情  */
    useEffect(() => {
        store.getSiteDetail()
        init()

        setPageTitle(code ? '编辑报名' : '新建报名')
    }, [code])

    useEffect(() => {
        setSelectKey(items[tab].key)
    }, [tab])

    useEffect(() => {
        const flag = !!store?.selectedCategoryList?.length || 0
        /**
         *  报名项目 为通用
         * 'openType' | 'requiredType',
         */
        if (entryCodeInteger === TYPE_ENUM.COMMON) {
            if (flag) {
                handleChange('openType', true, 0, {
                    closeType: 1,
                    editType: 1,
                    alias: 'REGISTRATION_CATEGORY_COMMON',
                })
                handleChange('requiredType', true, 0, {
                    closeType: 1,
                    editType: 1,
                    alias: 'REGISTRATION_CATEGORY_COMMON',
                })
            } else {
                handleChange('openType', false, 0, {
                    closeType: 1,
                    editType: 1,
                    alias: 'REGISTRATION_CATEGORY_COMMON',
                })
                handleChange('requiredType', false, 0, {
                    closeType: 1,
                    editType: 1,
                    alias: 'REGISTRATION_CATEGORY_COMMON',
                })
            }
        }
    }, [store?.selectedCategoryList?.length])

    /**
     * 提交关闭报名
     */
    const onSubMit = async () => {
        await store.closeActivity(code)
        setControls(false)
        history.goBack()
        message.success('关闭报名成功')
    }

    /**
     *    保存     保存并发布
     * @param isRelease 0保存 1保存并发布 2取消发布
     */
    const onFinishSubmit = async (isRelease: number) => {
        // form.setFieldsValue({ detail: store.editorText })
        form.setFieldsValue({ categoryCode: store.selectedCategoryList })

        let info = await form.validateFields().catch(err => {
            console.log(err)
            message.error(err?.errorFields?.[0]?.errors?.[0])
        })
        if (!info) return

        /**  取消报名截止时间晚于【认定考试开始时间/培训开始时间】  */
        // let { cancelEnd, activityStart } = info || {}
        // let cancelTime = cancelEnd ? dayjs(cancelEnd).valueOf() : 0
        // let applyTime = dayjs(activityStart).valueOf()
        // let flag = cancelTime > applyTime || false

        // if (flag && isRelease !== 2) {
        //     Modal.confirm({
        //         title: '提示',
        //         icon: <ExclamationCircleOutlined />,
        //         content:
        //             '当前设置的取消报名截止时间晚于【认定考试开始时间/培训开始时间】，可能会存在已经参加活动又取消报名的情况，是否继续保存？',
        //         onOk() {
        //             store.onSave(info, isRelease)
        //         },
        //         onCancel() {
        //             console.log('Cancel')
        //         },
        //         okText: '继续',
        //         cancelText: '取消',
        //     })
        // } else {
        store
            .onSave({ ...info, courseCode: info?.courseCode?.value }, isRelease)
            .then(enrollCode => {
                const renderContent = (
                    <div>
                        <Row>更多功能：</Row>
                        <Row>
                            · &nbsp;报名表单设置 &nbsp;
                            <a
                                onClick={() => {
                                    history.replace(`/enroll-setting?code=${enrollCode}&tab=1`)
                                    Modal.destroyAll()
                                }}
                            >
                                前往&gt;&gt;
                            </a>
                        </Row>
                        <Row>
                            · &nbsp;详情页设计 &nbsp;
                            <a
                                onClick={() => {
                                    history.replace(`/enroll-setting?code=${enrollCode}&tab=2`)
                                    Modal.destroyAll()
                                }}
                            >
                                前往&gt;&gt;
                            </a>
                        </Row>
                        {isRelease === 1 && (
                            <Row>
                                · &nbsp;报名推广 &nbsp;
                                <a
                                    onClick={() => {
                                        history.replace(
                                            `/event-management/generalization?code=${enrollCode}&type=3`,
                                        )
                                        Modal.destroyAll()
                                    }}
                                >
                                    前往&gt;&gt;
                                </a>
                            </Row>
                        )}
                    </div>
                )
                console.log(enrollCode)
                if (isRelease === 0 && enrollCode) {
                    Modal.confirm({
                        title: '保存成功',
                        icon: <CheckCircleOutlined style={{ color: 'green' }} />,
                        content: renderContent,
                        okText: '再次新建',
                        cancelText: '返回列表',
                        centered: true,
                        onOk: () => {
                            form.resetFields()
                            store.resetForm()
                        },
                        onCancel: () => history.replace('/event-management'),
                    })
                } else if (isRelease === 1 && enrollCode) {
                    Modal.confirm({
                        title: '发布成功',
                        icon: <CheckCircleOutlined style={{ color: 'green' }} />,
                        content: renderContent,
                        okText: '再次新建',
                        cancelText: '返回列表',
                        centered: true,
                        onOk: () => {
                            form.resetFields()
                            store.resetForm()
                        },
                        onCancel: () => history.replace('/event-management'),
                    })
                    message.success('发布成功')
                } else if (isRelease === 2) {
                    message.success('取消发布成功')
                    history.replace('/event-management')
                } else {
                    message.success('保存成功')
                    history.replace('/event-management')
                }
            })
        // }
    }

    return (
        <>
            <div className={styles.enroll_setting}>
                <div className={styles.main}>
                    <div className={styles.enroll_top}>
                        {/* 报名设置头部,新增的时候没有关闭报名 */}
                        {code && (
                            <div
                                className={styles.main_title}
                                style={{ paddingBottom: code ? 0 : 16 }}
                            >
                                <CustomTitle title={code ? '编辑' : '新增'} marginBottom={6} />
                                {/* {(status === ACTIVITY_STATUS_ENUM.DRAFT ||
                                status === ACTIVITY_STATUS_ENUM.RELEASE) && (
                                    <span
                                        className={styles.closeRegistration}
                                        onClick={() => setControls(true)}
                                    >
                                        <PoweroffOutlined />
                                        <span className={styles.close}>关闭报名</span>
                                    </span>
                                )} */}
                                {/* 选择某个内容区 */}
                                <Tabs
                                    className={styles.tabs}
                                    onChange={scrollToAnchor}
                                    activeKey={selectKey}
                                    items={items}
                                />
                            </div>
                        )}
                    </div>
                    {/* 内容详情 */}
                    <Form
                        layout="horizontal"
                        className={styles.form}
                        form={form}
                        name="password"
                        validateTrigger={'onBlur'}
                        // onFinish={onFinishSubmit}
                        scrollToFirstError={true}
                        preserve={false}
                        initialValues={{
                            openAudit: 1, //是否开启审核
                            openPay: 0, //是否开启支付
                            cancelFlag: 0, // 取消报名
                        }}
                        {...formLayout}
                    >
                        <div
                            className={styles.enroll_content}
                            id="enroll_content"
                            style={{
                                display: selectKey !== 'enrollDetails' ? 'block' : 'none',
                                height: code ? 'calc(100vh - 290px)' : '100%',
                            }}
                        >
                            <div
                                style={{
                                    display: selectKey === 'basicInformation' ? 'block' : 'none',
                                }}
                            >
                                {getBasicInformation()}
                                {getFields(openPay, cancelFlag)}
                            </div>
                            {code && (
                                <div
                                    style={{
                                        display:
                                            selectKey === 'enrollFormSetting' ? 'block' : 'none',
                                    }}
                                >
                                    <Alert
                                        className={styles.alert}
                                        message="可开启用户报名时需要填写的字段，以及字段是否必填。字段过多可能会降低用户的填写意愿，请适当增加哦~"
                                        type="warning"
                                        showIcon
                                    />
                                    {renderEnrollFormSetting()}
                                </div>
                            )}
                        </div>
                    </Form>
                    {code && (
                        <div style={{ display: selectKey === 'enrollDetails' ? 'block' : 'none' }}>
                            <EnrollDetails form={form} store={store} />
                        </div>
                    )}
                </div>
                {/* @ts-ignore */}
                <FooterBtn store={store} disBtn={disBtn} onFinishSubmit={onFinishSubmit} />
                {/* 关闭报名modal */}
                <Modal
                    title="关闭报名"
                    open={controls}
                    onCancel={() => setControls(false)}
                    onOk={onSubMit}
                    centered
                >
                    <p>关闭后用户将不能提交在线报名，确定要关闭吗？</p>
                </Modal>

                {/* 选择分类modal selectClassifyModal */}
                <SelectClassifyModal
                    visible={selectClassify}
                    onCancel={() => {
                        /**  没点确定选的值 清空  */
                        let isChoice = form.getFieldValue('categoryCode') || ''
                        if (!isChoice) {
                            store.changeSelectClassify()
                        }
                        setSelectClassify(false)
                    }}
                    store={store}
                    form={form}
                    setSelectClassify={setSelectClassify}
                />
            </div>
        </>
    )
}

const ObservePage: IRoute = observer(EnrollSetting)
ObservePage.title = '报名设置'
export default ObservePage
