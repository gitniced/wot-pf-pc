import styles from './index.module.less'
import { Button, Input, Select, Table, Tabs } from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePagination } from 'ahooks'
import { getTeacherClassList, getTeacherCourseList, getTeacherSemesterList } from './service'
import type { ClassInfoByTeacherDto, TeacherCourseGroupDto, TeacherSemesterDto } from './types'
import classNames from 'classnames'
import { history } from 'umi'
import { inject, observer } from 'mobx-react'
import type { PageProps } from '@/types'
import { useSaasTitle } from '@wotu/wotu-components'
import { LEVEL_MAP } from '../mine-lesson/const'
import CoverNameCombine from '@/components/CoverNameCombine'

const MineClass = (props: PageProps) => {
    useSaasTitle('我的班级')
    const { userStore } = props
    const { teacherData } = userStore! || {}

    const [teacherClass, setTeacherClass] = useState<TeacherCourseGroupDto[]>([])
    const [activeSemester, setActiveSemester] = useState<TeacherSemesterDto>()
    const [activeTab, setActiveTab] = useState<string>('')
    const [activeCourse, setActiveCourse] = useState<string>('')
    const [activeScheduleCode, setActiveScheduleCode] = useState<string>('')
    const [className, setClassName] = useState<string>('')
    const [semesterList, setSemesterList] = useState<TeacherSemesterDto[]>([])
    const tabItems = useMemo(() => {
        return teacherClass.map(item => ({
            key: item.majorCode!,
            label: item.majorName!,
        }))
    }, [teacherClass])

    const courseList = useMemo(() => {
        return teacherClass.find(item => item.majorCode === activeTab)?.courses || []
    }, [teacherClass, activeTab])

    useEffect(() => {
        if (!teacherData?.code) return
        getTeacherSemesterList({ teacherCode: teacherData.code }).then(res => {
            setSemesterList(res || [])
            const curSemester = res?.find?.(item => item.curSemester) || null
            if (curSemester) {
                setActiveSemester(curSemester)
            }
        })
    }, [teacherData?.code])

    useEffect(() => {
        if (!teacherData?.code || !activeSemester) return
        getTeacherCourseList({
            teacherCode: teacherData.code,
            academicYear: activeSemester.academicYear!,
            academicYearType: activeSemester.academicYearType!,
        }).then(res => {
            setTeacherClass(res)
            if (res[0]) {
                setActiveTab(res[0].majorCode!)
                if (res[0].courses && res[0].courses.length > 0) {
                    setActiveCourse(res[0].courses[0].courseCode!)
                    setActiveScheduleCode(res[0].courses[0].scheduleCode!)
                }
            }
        })
    }, [teacherData?.code, activeSemester])

    useEffect(() => {
        if (activeTab && teacherClass.length > 0) {
            const currentCourses =
                teacherClass.find(item => item.majorCode === activeTab)?.courses || []
            if (currentCourses.length > 0) {
                setActiveCourse(currentCourses[0].courseCode!)
                setActiveScheduleCode(currentCourses[0].scheduleCode!)
            }
        }
    }, [activeTab, teacherClass])

    const getList = useCallback(
        async (params: Parameters<Parameters<typeof usePagination>[0]>[0]) => {
            if (!activeCourse || !teacherData?.code || !activeSemester) {
                return { total: 0, list: [] as ClassInfoByTeacherDto[] }
            }
            const res = await getTeacherClassList({
                academicYear: activeSemester.academicYear!,
                academicYearType: activeSemester.academicYearType!,
                courseCode: activeCourse,
                className: className || undefined,
                pageNo: params.current,
                pageSize: params.pageSize,
                teacherCode: teacherData.code,
            })
            return {
                total: res.totalCount,
                list: res.data || [],
            }
        },
        [activeCourse, className, activeSemester],
    )

    const { data, pagination, loading, run } = usePagination(getList, {
        manual: true,
        refreshDeps: [activeCourse, className],
        debounceWait: 300,
    })

    useEffect(() => {
        if (!activeCourse) return
        run({ current: 1, pageSize: 10 })
    }, [activeCourse])

    return (
        <div className={styles.mine_class}>
            <div className={styles.title}>
                <div className={styles.title_left}>我的班级</div>
                <div className={styles.title_right}>
                    <Select
                        options={semesterList.map(item => ({
                            label: item.semesterName,
                            value: item.id,
                        }))}
                        style={{ minWidth: '8em' }}
                        value={activeSemester?.id}
                        onChange={key => {
                            // eslint-disable-next-line @typescript-eslint/no-shadow
                            const item = semesterList.find(item => item.id === key)
                            setActiveSemester(item)
                        }}
                        placeholder="请选择学期"
                    />
                </div>
            </div>

            <Tabs
                className={styles.tabs}
                items={tabItems}
                activeKey={activeTab}
                onChange={key => setActiveTab(key)}
            />

            <div className={styles.course}>
                {courseList.map(item => (
                    <div
                        className={classNames(styles.course_item, {
                            [styles.active]: activeCourse === item.courseCode,
                        })}
                        key={item.courseCode}
                        onClick={() => {
                            setActiveCourse(item.courseCode!)
                            setActiveScheduleCode(item.scheduleCode!)
                        }}
                    >
                        <CoverNameCombine
                            name={item.courseName}
                            coverUrl={item.coverUrl}
                            width={131}
                            radius={6}
                            style={{ overflow: 'hidden' }}
                        />

                        <div className={styles.course_item_right}>
                            <div className={styles.course_item_name}>{item.courseName}</div>
                            <div className={styles.course_item_info}>{item.totalHours}学时</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.class}>
                <div className={styles.class_operation}>
                    <div className={styles.class_operation_input}>
                        <span>班级名称：</span>
                        <Input
                            size="large"
                            placeholder="请输入"
                            value={className}
                            onChange={e => setClassName(e.target.value)}
                        />
                    </div>
                    <div className={styles.class_operation_btn}>
                        <Button
                            size="large"
                            onClick={() => {
                                setClassName('')
                                run({ current: 1, pageSize: pagination.pageSize || 10 })
                            }}
                        >
                            重置
                        </Button>
                        <Button
                            type="primary"
                            size="large"
                            onClick={() => {
                                run({ current: 1, pageSize: pagination.pageSize || 10 })
                            }}
                        >
                            查询
                        </Button>
                    </div>
                </div>

                <Table
                    className={styles.class_table}
                    loading={loading}
                    columns={[
                        {
                            title: '班级名称',
                            dataIndex: 'className',
                            key: 'className',
                        },
                        {
                            title: '培养层次',
                            dataIndex: 'trainLevel',
                            key: 'trainLevel',
                            render: (_, item) => {
                                return LEVEL_MAP[
                                    item.trainLevel as unknown as keyof typeof LEVEL_MAP
                                ]
                            },
                        },
                        {
                            title: '学制',
                            dataIndex: 'trainLevelEdu',
                            key: 'trainLevelEdu',
                        },
                        {
                            title: '操作',
                            dataIndex: 'operation',
                            key: 'operation',
                            render: (_, item) => (
                                <Button
                                    type="link"
                                    onClick={e => {
                                        e.stopPropagation()
                                        console.log(item)
                                        history.push(`/mine-lesson/${activeScheduleCode}`)
                                    }}
                                    style={{ padding: 0 }}
                                >
                                    教学管理
                                </Button>
                            ),
                        },
                    ]}
                    dataSource={data?.list || []}
                    rowKey="classCode"
                    pagination={pagination}
                />
            </div>
        </div>
    )
}

export default inject('userStore')(observer(MineClass))
