import styles from './index.module.less'
import { RightOutlined, DownOutlined, SearchOutlined } from '@ant-design/icons'
import {
    Tabs,
    Button,
    Dropdown,
    Form,
    Input,
    Select,
    Checkbox,
    Progress,
    Pagination,
    Spin,
    message,
    Tooltip,
    Modal,
} from 'antd'
import type { MenuProps } from 'antd'
import TeacherManagementModal from './components/TeacherManagementModal'
import CopyTemplateCourseModal from './components/CopyTemplateCourseModal'
import { useEffect, useState } from 'react'
import { history } from 'umi'
import { usePagination, useUpdateEffect } from 'ahooks'
import http from '@/servers/http'
import Empty from '@/components/Empty'
import api from './api'
import { useMajorList } from '@/modules/major/hooks'
import { useSaasTitle } from '@wotu/wotu-components'
import HrefLink from '@/components/HrefLink'
import HrefContainer from '@/components/HrefContainer'
import CoverNameCombine from '../../../components/CoverNameCombine'

enum STATUS_KEY {
    all = '0', //全部
    under_design = '1', //设计中
    in_use = '2', //使用中
}

export const levelListMap: Record<string, any> = {
    10: { label: '中级技能层次', abbreviation: '中级' },
    20: { label: '高级技能层次', abbreviation: '高级' },
    30: { label: '预备技师（技师）层次', abbreviation: '预备技师（技师）' },
}

const Home: React.FC = () => {
    useSaasTitle(`首页`)

    const [form] = Form.useForm()

    const [teacherManagementModalOpen, setTeacherManagementModalOpen] = useState(false)
    const [copyTemplateCourseModalOpen, setCopyTemplateCourseModalOpen] = useState(false)
    const [activeKey, setActiveKey] = useState(STATUS_KEY.all)
    const [courseInfo, setCourseInfo] = useState<Record<string, any> | null>(null)
    const { majorList } = useMajorList()
    const [levelList, setLevelList] = useState<Record<string, any>[]>([])
    const [countByMajorList, setCountByMajorList] = useState<Record<string, any>[]>([])
    const [coursesStatusCount, setCoursesStatusCount] = useState([
        { status: '0', count: 0 },
        { status: '1', count: 0 },
        { status: '2', count: 0 },
    ])

    const getCoursesStatusCount = () => {
        http(api.coursesStatusCount, 'post', {}).then((res: any) => {
            setCoursesStatusCount(res)
        })
    }

    const getCoursesList = async ({
        current,
        pageSize,
    }: {
        current: number
        pageSize: number
    }): Promise<{ total: number; list: Record<string, any>[] }> => {
        const formData = form.getFieldsValue()
        const params = {
            pageNo: current,
            pageSize,
            qualityStatus: formData?.check?.includes('1') ? '1' : '0',
            templateStatus: formData?.check?.includes('2') ? '1' : '0',
            name: formData?.name,
            status: activeKey,
            majorCode: formData?.majorCode,
            levelCode: formData?.levelCode,
        }

        if (+params.levelCode === 0) {
            delete params.levelCode
        }
        if (+params.majorCode === 0) {
            delete params.majorCode
        }

        getCoursesStatusCount()
        return http(api.coursesPage, 'post', params).then((res: any) => {
            return {
                total: res?.totalCount || 0,
                list: res?.data || [],
            }
        })
    }

    const init = () => {
        http(api.countByMajor, 'post', {}).then((res: any) => {
            setCountByMajorList(res?.filter((ele: any) => ele?.majorName))
        })
    }

    const getLevelList = (code: string) => {
        http(api.listByMajorCode + `?majorCode=${code}`, 'post', {}).then((res: any) => {
            if (res?.length) {
                setLevelList([
                    { value: '0', label: '全部层次' },
                    ...res.map((item: Record<string, any>) => ({
                        value: item?.code,
                        label: levelListMap?.[item?.level]?.label,
                    })),
                ])
            } else {
                setLevelList([])
            }
        })
    }

    const { data, pagination, loading, refresh, run } = usePagination(getCoursesList)

    const search = () => {
        run({ current: 1, pageSize: 10 })
    }

    const coursesUse = async (code: string) => {
        http(api.coursesUse, 'post', { code }).then(() => {
            message.success('操作成功！')
            refresh()
        })
    }

    const coursesCancelUse = async (code: string) => {
        http(api.coursesCancelUse, 'post', { code }).then(() => {
            message.success('操作成功！')
            refresh()
        })
    }

    const coursesDelete = async (code: string) => {
        http(`${api.coursesDelete}?code=${code}`, 'post', {}).then(() => {
            message.success('删除成功！')
            refresh()
        })
    }

    const options = [
        { label: '优质', value: '1' },
        { label: '模板', value: '2' },
    ]

    const addCourseItems: MenuProps['items'] = [
        {
            label: '直接新建',
            key: '1',
        },
        {
            label: '复制模板课程',
            key: '2',
        },
    ]

    const addCourseMenuProps = {
        items: addCourseItems,
        onClick: (e: any) => {
            if (e.key === '1') {
                history.push('/assistant/course/create')
            }

            if (e.key === '2') {
                setCourseInfo(null)
                setCopyTemplateCourseModalOpen(true)
            }
        },
    }

    const moreMenuProps = (record: Record<string, any>) => {
        let moreItems: MenuProps['items'] = []

        if (+record?.status === +STATUS_KEY.in_use) {
            moreItems = [
                {
                    label: '撤销使用',
                    key: '4',
                },
            ]
        } else {
            moreItems = [
                {
                    label: '使用课程',
                    key: '1',
                },
                {
                    label: '编辑基本信息',
                    key: '2',
                },
            ]

            if (record?.currentCreated) {
                moreItems.push({
                    label: '管理教师',
                    key: '3',
                })
                moreItems.push({
                    label: '删除',
                    key: '5',
                })
            }
        }

        return {
            items: moreItems,
            onClick: (e: any) => {
                e.domEvent.stopPropagation()
                setCourseInfo(record)

                if (e.key === '1') {
                    coursesUse(record?.code)
                }

                if (e.key === '2') {
                    setCopyTemplateCourseModalOpen(true)
                }

                if (e.key === '3') {
                    setTeacherManagementModalOpen(true)
                }
                if (e.key === '4') {
                    coursesCancelUse(record?.code)
                }
                if (e.key === '5') {
                    Modal.confirm({
                        title: '删除课程后无法找回，是否确定删除？',
                        onOk: () => {
                            coursesDelete(record?.code)
                        },
                    })
                }
            },
        }
    }

    useUpdateEffect(() => {
        search()
    }, [activeKey])

    useEffect(() => {
        init()
    }, [])

    return (
        <div className={styles.assistant_home}>
            <div className={styles.assistant_home_left}>
                <div className={styles.header}>
                    <div className={styles.header_left}>
                        <div className={styles.header_line} />
                        <div>工学一体化课程</div>
                    </div>
                </div>

                <Tabs
                    style={{ marginTop: '6px' }}
                    onChange={e => {
                        setActiveKey(e as STATUS_KEY)
                    }}
                    activeKey={activeKey}
                    items={[
                        {
                            label: `全部(${coursesStatusCount?.[STATUS_KEY.all]?.count})`,
                            key: STATUS_KEY.all,
                        },
                        {
                            label: `设计中(${
                                coursesStatusCount?.[STATUS_KEY.under_design]?.count
                            })`,
                            key: STATUS_KEY.under_design,
                        },
                        {
                            label: `使用中(${coursesStatusCount?.[STATUS_KEY.in_use]?.count})`,
                            key: STATUS_KEY.in_use,
                        },
                    ]}
                />

                <div className={styles.action_bar}>
                    <Dropdown menu={addCourseMenuProps}>
                        <Button type="primary">
                            新建课程
                            <DownOutlined />
                        </Button>
                    </Dropdown>
                    <Form form={form} autoComplete="off" initialValues={{ majorCode: '0' }}>
                        <div className={styles.action_bar_right}>
                            <Form.Item name="check" style={{ margin: '0' }}>
                                <Checkbox.Group options={options} onChange={search} />
                            </Form.Item>
                            <Form.Item name="name" style={{ margin: '0' }}>
                                <Input
                                    style={{ width: '192px', height: '32px' }}
                                    placeholder="输入课程名称搜索"
                                    suffix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    onBlur={search}
                                    onPressEnter={search}
                                />
                            </Form.Item>

                            <Form.Item name="majorCode" style={{ margin: '0' }}>
                                <Select
                                    style={{ width: 140 }}
                                    placeholder="请选择"
                                    options={[{ code: '0', name: '全部专业' }, ...majorList].map(
                                        item => ({
                                            value: item.code,
                                            label: item.name,
                                        }),
                                    )}
                                    onChange={e => {
                                        form.setFieldsValue({
                                            levelCode: undefined,
                                        })
                                        getLevelList(e)
                                        search()
                                    }}
                                />
                            </Form.Item>
                            <Form.Item name="levelCode" style={{ margin: '0' }}>
                                <Select
                                    style={{ width: 140 }}
                                    placeholder="请选择"
                                    options={levelList}
                                    onChange={search}
                                />
                            </Form.Item>
                        </div>
                    </Form>
                </div>

                <div className={styles.course_card}>
                    {loading && (
                        <Spin
                            style={{
                                position: 'fixed',
                                top: '50%',
                                left: 'calc((100% - 320px) /2)',
                                zIndex: '9',
                            }}
                        />
                    )}

                    {data && data?.list?.length > 0 ? (
                        <>
                            {data?.list?.map(item => {
                                const hrefUrl =
                                    +item?.status === +STATUS_KEY.under_design
                                        ? `/assistant/course/${item?.code}/design/conversion`
                                        : `/assistant/course/${item?.code}/preview?stylistic=1`

                                return (
                                    <HrefContainer
                                        url={hrefUrl}
                                        className={styles.card}
                                        key={item?.code}
                                    >
                                        <div className={styles.card_left}>
                                            <div className={styles.tag}>
                                                {+item?.templateStatus === 1 && (
                                                    <div className={styles.template_tag}>模板</div>
                                                )}
                                                {+item?.qualityStatus === 1 && (
                                                    <div className={styles.high_quality_tag}>
                                                        优质
                                                    </div>
                                                )}
                                            </div>
                                            <CoverNameCombine
                                                name={item?.name}
                                                width={284}
                                                coverUrl={item?.coverUrl}
                                                radius={8}
                                            />
                                        </div>
                                        <div className={styles.card_right}>
                                            <div className={styles.top}>
                                                <div className={styles.title}>
                                                    <div className={styles.text}>{item?.name}</div>

                                                    {+item?.status === +STATUS_KEY.under_design && (
                                                        <div className={styles.under_design_tag}>
                                                            设计中
                                                        </div>
                                                    )}

                                                    {+item?.status === +STATUS_KEY.in_use && (
                                                        <div className={styles.in_use}>使用中</div>
                                                    )}
                                                </div>
                                                <div className={styles.more}>
                                                    <Dropdown menu={moreMenuProps(item)}>
                                                        <Button
                                                            onClick={e => {
                                                                e.stopPropagation()
                                                                e.preventDefault()
                                                            }}
                                                        >
                                                            更多
                                                            <DownOutlined />
                                                        </Button>
                                                    </Dropdown>
                                                </div>
                                            </div>

                                            <div className={styles.content}>
                                                <div className={styles.row}>
                                                    <div className={styles.lable}>所属层级：</div>
                                                    <div className={styles.text}>
                                                        {item?.majorName} {item?.levelName && '·'}{' '}
                                                        {item?.levelName}
                                                    </div>
                                                </div>
                                                <div className={styles.row}>
                                                    <div className={styles.lable}>教师姓名：</div>
                                                    <div className={styles.text}>
                                                        <div>
                                                            {item?.teacherList?.length ? (
                                                                <>
                                                                    {item?.teacherList?.map(
                                                                        (ele: any, i: number) => (
                                                                            <span key={ele?.name}>
                                                                                {ele?.name}
                                                                                {+ele?.createStatus ===
                                                                                    1 &&
                                                                                    ele?.name && (
                                                                                        <Tooltip title="创建者">
                                                                                            <img src="https://static.zpimg.cn/public/fe-engineer-pc/images/user_tag_n.png" />
                                                                                        </Tooltip>
                                                                                    )}
                                                                                {i + 1 !==
                                                                                    item
                                                                                        ?.teacherList
                                                                                        ?.length &&
                                                                                    '、'}
                                                                            </span>
                                                                        ),
                                                                    )}
                                                                </>
                                                            ) : (
                                                                '-'
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className={styles.row}>
                                                    {+item?.status === +STATUS_KEY.under_design && (
                                                        <>
                                                            <div className={styles.lable}>
                                                                体例完成度：
                                                            </div>
                                                            <div className={styles.text}>
                                                                <div style={{ width: '155px' }}>
                                                                    <Progress
                                                                        percent={item?.rate || 0}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}

                                                    {+item?.status === +STATUS_KEY.in_use && (
                                                        <>
                                                            <div className={styles.lable}>
                                                                学生人数：
                                                            </div>
                                                            <div className={styles.text}>
                                                                {item?.stuCount || 0}
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </HrefContainer>
                                )
                            })}
                        </>
                    ) : (
                        <Empty type="page" />
                    )}
                </div>

                <Pagination
                    current={pagination.current}
                    pageSize={pagination.pageSize}
                    total={data?.total}
                    onChange={pagination.onChange}
                    onShowSizeChange={pagination.onChange}
                    showQuickJumper
                    showSizeChanger
                    style={{ marginTop: 24, textAlign: 'right' }}
                    showTotal={(total: number) => `共${total}个项目`}
                />
            </div>
            <div className={styles.assistant_home_right}>
                <div className={styles.header} style={{ marginBottom: 24 }}>
                    <div className={styles.header_left}>
                        <div className={styles.header_line} />
                        <div>资源库</div>
                    </div>
                    <div className={styles.header_right}>
                        <HrefLink url="/assistant/resource">
                            更多 <RightOutlined />
                        </HrefLink>
                    </div>
                </div>

                {/* <div style={{ marginTop: '24px', marginBottom: '16px' }}>
                    <ResourceCreateDropdown
                        onRefresh={() => {
                            refresh()
                        }}
                        majorCode={majorCode}
                        majorList={majorList}
                    />
                </div> */}

                {countByMajorList?.length ? (
                    <>
                        {countByMajorList?.map(item => (
                            <div className={styles.resource_ibrary_card} key={item?.majorCode}>
                                <div className={styles.resource_ibrary_card_title}>
                                    {item?.majorName || '-'}
                                </div>
                                <div className={styles.personal_resources}>
                                    <div className={styles.resources}>
                                        <div /> 个人资源
                                    </div>
                                    <div className={styles.num}>{item?.personalCount || 0}</div>
                                </div>
                                <div className={styles.public_resources}>
                                    <div className={styles.resources}>
                                        <div /> 公共资源
                                    </div>
                                    <div className={styles.num}>{item?.commonCount || 0}</div>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <Empty />
                )}
            </div>

            {teacherManagementModalOpen && (
                <TeacherManagementModal
                    isModalOpen={teacherManagementModalOpen}
                    handleOk={() => {}}
                    handleCancel={() => {
                        setTeacherManagementModalOpen(false)
                    }}
                    courseInfo={courseInfo}
                    refreshHome={refresh}
                />
            )}

            {copyTemplateCourseModalOpen && (
                <CopyTemplateCourseModal
                    isModalOpen={copyTemplateCourseModalOpen}
                    handleOk={() => {
                        refresh()
                        setCopyTemplateCourseModalOpen(false)
                    }}
                    handleCancel={() => {
                        setCopyTemplateCourseModalOpen(false)
                    }}
                    courseInfo={courseInfo}
                />
            )}
        </div>
    )
}

export default Home
