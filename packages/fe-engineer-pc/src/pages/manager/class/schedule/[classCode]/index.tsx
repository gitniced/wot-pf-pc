import React, { useEffect, useCallback, useMemo, useRef } from 'react'
import { debounce } from 'lodash'
import { Button, Descriptions, Space, Modal, Table, Select, Spin } from 'antd'
import { useSaasTitle } from '@wotu/wotu-components'
import { observer, useLocalObservable } from 'mobx-react'
import CustomTitle from '@/components/CustomTitle'
import { getSelectedCourseTableColumns } from './column'
import { TRAIN_LEVEL_MAP, START_POINT_MAP } from '../../class/const'
import styles from './index.module.less'
import { useParams, history } from 'umi'
import CoverNameCombine from '@/components/CoverNameCombine'
import Store from './store'

const Index = observer(() => {
    useSaasTitle('排课')
    const { classCode } = useParams<{ classCode: string }>()
    const store = useLocalObservable(() => new Store())
    const handleUpdateCourse = useCallback((courseCode: string, field: string, value: any) => {
        store.updateCourse(courseCode, field, value)
    }, [])

    const handleAddCourse = useCallback(
        (value: any, option: any) => {
            if (!option || !classCode) return
            store.addCourse(classCode, option)
        },
        [classCode],
    )

    const debouncedFetchCourseOptions = useRef(
        debounce((value: string) => {
            store.fetchCourseOptions(value)
        }, 500),
    ).current

    const handleCourseSearch = useCallback(
        (value: string) => {
            debouncedFetchCourseOptions(value)
        },
        [debouncedFetchCourseOptions],
    )

    // 组件卸载时取消防抖函数
    useEffect(() => {
        return () => {
            debouncedFetchCourseOptions.cancel()
        }
    }, [debouncedFetchCourseOptions])

    // 格式化课程选项，显示封面和详细信息
    const courseOptionsWithRichContent = useMemo(() => {
        return store.courseOptions.map(item => ({
            ...item,
            label: (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                    }}
                >
                    <CoverNameCombine coverUrl={item.coverUrl} name={item.name} width={60} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                            style={{
                                fontSize: 14,
                                color: '#000',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {item.name}
                        </div>
                        <div
                            style={{
                                fontSize: 12,
                                color: '#999',
                                marginTop: 2,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {item.majorName}
                        </div>
                    </div>
                </div>
            ),
        }))
    }, [store.courseOptions])

    const handleCourseSelect = useCallback(
        (value: string, option: any) => {
            console.log('选择的值:', value)
            console.log('选择的选项:', option)

            if (!option) {
                console.log('没有找到选项数据')
                return
            }

            const selectedCourse = courseOptionsWithRichContent.find(
                course => course.value === value,
            )
            console.log('找到的课程数据:', selectedCourse)

            if (selectedCourse) {
                handleAddCourse(value, selectedCourse)
                store.resetSelectValue()
            }
        },
        [handleAddCourse, courseOptionsWithRichContent],
    )

    const handleDeleteCourse = useCallback((courseCode: string) => {
        Modal.confirm({
            type: 'warning',
            title: '删除后学生和教师将不可见该课程，确定要删除吗？',
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                store.deleteCourse(courseCode)
            },
        })
    }, [])

    const handleSave = async () => {
        if (!classCode) return

        const success = await store.saveCourseSchedule(classCode)
        if (success) {
            history.goBack()
        }
    }

    const handleCancel = () => {
        history.goBack()
    }

    const columns = useMemo(
        () =>
            getSelectedCourseTableColumns(
                handleUpdateCourse,
                store.semesterOptions,
                handleDeleteCourse,
                store,
            ),
        [handleUpdateCourse, store.semesterOptions, handleDeleteCourse, store],
    )

    useEffect(() => {
        if (classCode) {
            store.init(classCode).then(() => {
                if (classCode) {
                    store.fetchCourseList(classCode)
                    store.fetchCourseOptions()
                }
            })
        }
        return () => {
            store.reset()
            debouncedFetchCourseOptions.cancel()
        }
    }, [classCode])

    if (store.loading || !store.classInfo) {
        return <div>加载中...</div>
    }

    return (
        <div className={styles.page}>
            <CustomTitle title="排课" marginBottom={24} />

            <Descriptions column={3} size="small">
                <Descriptions.Item label="班级名称">{store.classInfo.name}</Descriptions.Item>
                <Descriptions.Item label="专业">
                    {store.classInfo.majorName} (代码：{store.classInfo.majorNum})
                </Descriptions.Item>
                <Descriptions.Item label="培养层级">
                    {TRAIN_LEVEL_MAP[store.classInfo.trainLevel!] || '-'} (代码：
                    {store.classInfo.trainLevelNum})
                </Descriptions.Item>
                <Descriptions.Item label="起点学制">
                    {START_POINT_MAP[store.classInfo.startPoint!] || '-'} {store.classInfo.eduLen}年
                </Descriptions.Item>
                <Descriptions.Item label="入学年份">{store.classInfo.enrollYear}</Descriptions.Item>
                <Descriptions.Item label="毕业年份">
                    {store.classInfo.graduateYear}
                </Descriptions.Item>
            </Descriptions>

            <div className={styles.content}>
                <Space
                    style={{
                        width: '100%',
                        justifyContent: 'space-between',
                        marginBottom: 16,
                    }}
                >
                    <Space>
                        <span>添加课程：</span>
                        <Select
                            placeholder="请输入课程名称进行搜索"
                            style={{ width: 400 }}
                            showSearch
                            filterOption={false}
                            onSearch={handleCourseSearch}
                            onChange={(value, option) => {
                                if (value === undefined || value === null) {
                                    store.resetSelectValue()
                                } else {
                                    handleCourseSelect(value, option)
                                }
                            }}
                            options={courseOptionsWithRichContent}
                            loading={store.courseSearchLoading}
                            allowClear
                            value={store.selectValue}
                            notFoundContent={
                                store.courseSearchLoading ? <Spin size="small" /> : '暂无数据'
                            }
                        />
                    </Space>
                </Space>

                <Table
                    loading={store.tableLoading}
                    columns={columns}
                    dataSource={store.courseList}
                    rowKey="courseCode"
                    scroll={{ x: 1400 }}
                    pagination={false}
                />
            </div>

            <div className={styles.footer}>
                <Space>
                    <Button onClick={handleCancel}>取消</Button>
                    <Button
                        type="primary"
                        loading={store.saveLoading}
                        onClick={handleSave}
                        disabled={store.courseList.length === 0}
                    >
                        保存
                    </Button>
                </Space>
            </div>
        </div>
    )
})

export default Index
