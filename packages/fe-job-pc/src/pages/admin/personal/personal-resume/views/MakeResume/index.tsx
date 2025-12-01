import React, { useState } from 'react'
import { FormOutlined, CheckCircleFilled, DownOutlined } from '@ant-design/icons'
import { Button, Space, Modal, Input } from 'antd'
import styles from './index.module.less'
import ModuleAndSort from '../../components/ModuleAndSort'
// @ts-ignore
import { SketchPicker } from 'react-color'
import jobCollect from './config'
import EnhancePopover from '../../components/EnhancePopover'

interface Isort {
    key: string
    title: string
    base: boolean
    open: number
    sort: number
}

const Index = ({ store, setMode }: any) => {
    const [_open, setOpen] = useState(false)

    const [color, setColor] = useState('#fff')

    // 模块开关排序弹窗
    const [_sortOpen, setSortOpen] = useState(false)

    // 重命名简历弹窗
    const [isModalOpen, setIsModalOpen] = useState(false)

    const _handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen)
    }

    const _handleSortOpenChange = (newOpen: boolean) => {
        setSortOpen(newOpen)
    }

    // 重命名简历成功回调
    const handleOk = () => {}

    // 重命名简历取消回调
    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const onCascaderChange = () => {
        //store.queryCitys(e)
    }

    // 根据上级行业code查询行业
    const loadIndustryData = ([{ value }]: any) => {
        store.getIndustryList(value)
    }

    // 根据上级职业类型code查询职业类型
    const loadCapacityData = ([{ value }]: any) => {
        store.getTree(value)
    }

    // 根据上级地区code查询地区
    const loadCityData = ([{ value }]: any) => {
        store.queryCitys(value)
    }

    // 颜色选择器的点击事件的回调
    const colorChange = (_color: any) => {
        setColor(_color.hex)
    }

    return (
        <div className={styles.make_resume_container}>
            <Modal title="重命名简历" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Input placeholder="请输入简历名称" maxLength={30} showCount />
            </Modal>
            <div className={styles.function_field}>
                <div className={styles.resume_title}>
                    <div className={styles.title}>
                        <span>产品经理</span>
                        <Button
                            onClick={() => setIsModalOpen(true)}
                            type="link"
                            icon={<FormOutlined />}
                        />
                    </div>
                    <div className={styles.tips}>
                        <Space>
                            <CheckCircleFilled style={{ color: '#52C41A' }} />
                            <span>简历已实时保存成草稿，点击</span>
                        </Space>
                    </div>
                </div>
                <div className={styles.function_group}>
                    <Space>
                        <Button>切换模版</Button>
                        {/* <Popover
                            content={<SketchPicker />}
                            trigger="click"
                            open={open}
                            style={{ padding: 0 }}
                            overlayInnerStyle={{ padding: 0 }}
                            onOpenChange={handleOpenChange}
                        >
                            <Button type="plain">
                                主题色 <DownOutlined />
                            </Button>
                        </Popover> */}

                        <EnhancePopover
                            content={
                                <SketchPicker
                                    color={color}
                                    onChange={colorChange}
                                    disableAlpha={true}
                                />
                            }
                        >
                            <Button type="ghost">
                                主题色
                                <div
                                    style={{
                                        display: 'inline-block',
                                        width: 14,
                                        height: 14,
                                        backgroundColor: color,
                                        borderRadius: 2,
                                    }}
                                />{' '}
                                <DownOutlined />
                            </Button>
                        </EnhancePopover>

                        <EnhancePopover
                            content={
                                <ModuleAndSort
                                    menuActive={store.menuActive}
                                    userMenuConfig={store.userMenuConfig}
                                    saveMenuConfig={store.saveMenuConfig}
                                />
                            }
                        >
                            <Button type="ghost">
                                模块/排序 <DownOutlined />
                            </Button>
                        </EnhancePopover>
                        <Button>下载</Button>
                        <Button type="primary">保存为文件</Button>
                        <Button onClick={() => setMode('baseInfo')} type="ghost">
                            返回
                        </Button>
                    </Space>
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.edit}>
                    {store.userMenuConfig.map((item: Isort) => {
                        const jobCollectObj: Record<string, React.ReactElement> = jobCollect({
                            key: item.key,
                            store,
                            onCascaderChange,
                            loadCityData,
                            loadCapacityData,
                            loadIndustryData,
                        })
                        return jobCollectObj[item.key] as React.ReactElement
                    })}
                </div>
                <div className={styles.preview}>
                    <h5>hello world</h5>
                </div>
            </div>
        </div>
    )
}

export default Index
