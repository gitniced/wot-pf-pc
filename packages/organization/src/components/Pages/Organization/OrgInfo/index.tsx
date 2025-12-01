import React, { useEffect } from 'react'
import styles from './index.module.less'
import { Form, Input, Select, Upload, Spin } from 'antd'
import type { Scale } from './interface'
import InfoStore from './store'
import { observer, useLocalObservable } from 'mobx-react'
import ImgCrop from 'antd-img-crop'
import AreaCascader from '@/components/AreaCascader'
import LoadingCascader from '../LoadingCascader'
import 'antd/es/modal/style'
import { PlusOutlined } from '@ant-design/icons'
import { getCookie } from '@/storage'
import { ORG_INFO_STATUS } from './const'
import { history } from 'umi'

const { Option } = Select

const JUMP_URL: Record<string, string> = {
    0: '/prove',
    2: '/prove',
    1: '/change_prove',
    3: '/change_prove',
}

const SuffixInput = ({
    value,
    onChange,
    nameDisable = false,
    isShowSuffix = false,
    status, //	认证状态 0未认证 1已认证 2审批中  3"变更审核中"
}: any) => {
    const onClickTips = () => {
        let url = JUMP_URL[status]
        url && history.push(url)
    }

    const getSuffix = () => {
        const item: any = ORG_INFO_STATUS.find(u => u.id === status) || {}

        if (!item) return <></>
        return (
            <div className={styles.suffix} key={item.id}>
                <img src={item.url} />
                &nbsp;
                <span className={styles.tips} onClick={onClickTips}>
                    {item.tips}
                </span>
            </div>
        )
    }

    return (
        <>
            {isShowSuffix ? (
                <div className={styles.suffix_input}>
                    <Input
                        value={value}
                        className={styles.input}
                        disabled={nameDisable}
                        maxLength={100}
                        placeholder={'请输入机构名称'}
                        onChange={e => {
                            onChange(e.target.value)
                        }}
                    />
                    {getSuffix()}
                </div>
            ) : (
                <Input
                    value={value}
                    className={styles.input}
                    disabled={nameDisable}
                    maxLength={100}
                    placeholder={'请输入机构名称'}
                    onChange={e => {
                        onChange(e.target.value)
                    }}
                />
            )}
        </>
    )
}

const OrgInfo = observer(
    ({
        createStore,
        nameDisable,
        type,
        isShowSuffix,
        certifyStatus,
    }: {
        createStore: any
        nameDisable?: boolean
        type?: 'create' | 'edit'
        isShowSuffix?: boolean
        certifyStatus?: number
    }) => {
        let store = useLocalObservable(() => new InfoStore())
        useEffect(() => {
            store.getScaleList()
        }, [])
        let userType = getCookie('SELECT_USER_TYPE')

        const renderShortNameItem = (require: boolean) => {
            return (
                <Form.Item
                    name="shortName"
                    label="简称"
                    validateTrigger="onBlur"
                    rules={[{ required: require, message: '请输入简称' }]}
                >
                    <Input className={styles.input} maxLength={6} placeholder={'请输入简称'} />
                </Form.Item>
            )
        }
        return (
            <div className={styles.content}>
                <Form.Item
                    name="logo"
                    label="LOGO"
                    validateTrigger="onBlur"
                    extra="图片要求：文件大小≤2MB，文件格式JPG、PNG、JPEG"
                >
                    <ImgCrop rotate modalTitle={'编辑图片'} modalCancel={'取消'} modalOk={'确定'}>
                        <Upload
                            listType={'picture-card'}
                            accept={'.jpg,.png,.jpeg'}
                            showUploadList={false}
                            fileList={createStore.avatarList || ([] as any)}
                            className={styles.avatar_upload}
                            beforeUpload={e => {
                                createStore.imageUpload({
                                    image: e,
                                })
                                return false
                            }}
                            onRemove={e => {
                                createStore.removeImage({
                                    image: e,
                                })
                                return false
                            }}
                        >
                            {createStore.isUpload ? (
                                <div className={styles.avatar_loading}>
                                    <Spin />
                                </div>
                            ) : createStore.avatar ? (
                                <div
                                    className={styles.avatar}
                                    style={{
                                        backgroundImage: `url('${
                                            createStore.avatar || defaultOrgLogo
                                        }')`,
                                        backgroundSize: 'contain',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',
                                    }}
                                />
                            ) : (
                                <div className={styles.upload_btn}>
                                    <PlusOutlined />
                                    上传
                                </div>
                            )}
                        </Upload>
                    </ImgCrop>
                </Form.Item>

                <Form.Item
                    name="name"
                    label="机构名称"
                    validateTrigger="onBlur"
                    rules={[{ required: true, message: '请输入机构名称' }]}
                    // labelCol={{ span: 3 }}
                >
                    <SuffixInput
                        nameDisable={nameDisable}
                        isShowSuffix={isShowSuffix}
                        status={certifyStatus}
                    />
                </Form.Item>
                {/* </Row> */}
                {/* 资源方登录,一直简称必填 */}
                {userType === 'merchant' && renderShortNameItem(true)}
                {/* 机构登录,编辑页面展示简称,非必填 */}
                {userType === 'org' && type === 'edit' && renderShortNameItem(false)}
                {/* 编辑机构信息页面，展示法人字段 */}
                {/* {type === 'edit' && (
                    <Form.Item label="法定代表人姓名" name="legalPersonName">
                        <Input
                            className={styles.input}
                            placeholder="请输入法定代表人姓名"
                            maxLength={50}
                        />
                    </Form.Item>
                )} */}
                <Form.Item
                    name="industry"
                    label="所属行业"
                    rules={[
                        { required: true, message: '请选择所属行业' },
                        () => ({
                            validator(_, value) {
                                if (value?.length < 2) {
                                    return Promise.reject(new Error('请选择具体行业'))
                                }
                                return Promise.resolve()
                            },
                        }),
                    ]}
                >
                    <LoadingCascader
                        api="/common_data/industry/list"
                        placeholder="请选择所属行业"
                    />
                </Form.Item>
                <Form.Item
                    name="scale"
                    label="机构规模"
                    rules={[{ required: true, message: '请选择机构规模' }]}
                >
                    <Select className={styles.select} allowClear placeholder="请选择机构规模">
                        {store.scaleList.length !== 0 &&
                            store.scaleList.map((item: Scale) => {
                                return (
                                    <Option key={item.key} value={item.key}>
                                        {item.name}
                                    </Option>
                                )
                            })}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="addressList"
                    label="所在地址"
                    rules={[
                        { required: true, message: '请选择所在地址' },
                        () => ({
                            validator(_, value) {
                                if (value?.length < 3) {
                                    return Promise.reject(new Error('请选择具体城市'))
                                }
                                return Promise.resolve()
                            },
                        }),
                    ]}
                >
                    <AreaCascader type="area" changeOnSelect={false} />
                </Form.Item>
                {type === 'edit' && (
                    <Form.Item name="address" label="详细地址" validateTrigger="onBlur">
                        <Input maxLength={100} placeholder={'请输入详细地址'} />
                    </Form.Item>
                )}
            </div>
        )
    },
)

export default OrgInfo
