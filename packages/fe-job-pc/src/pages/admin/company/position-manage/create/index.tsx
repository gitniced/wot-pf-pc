/* eslint-disable */
import {
    Form,
    Input,
    Button,
    Radio,
    Select,
    Spin,
    Modal,
    Space,
    DatePicker,
    TimePicker,
    Result,
    Row,
    Col,
    message,
    Typography,
    Divider,
} from 'antd'
import { debounce } from 'lodash'
import { useLocalStore, observer } from 'mobx-react'
import { useState, useEffect } from 'react'
import type { IRoute } from 'umi'
import { useLocation, history } from 'umi'
import { CloseOutlined, MinusOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import localeData from 'dayjs/plugin/localeData'
// @ts-ignore
import ReactMarkdown from 'react-markdown'
// @ts-ignore
import remarkGfm from 'remark-gfm'

import Breadcrumbs from '@/components/Breadcrumbs'

import PositionManageAddStore from './store'
import Tags from './components/Tags'
import TxMap from './components/TxMap'
import PositionType from './components/PositionType'
import WorkDay from './components/WorkDay'
import RecruiterItem from './components/RecruiterItem'

import styles from './index.module.less'
import {
    minMonthlyPay,
    calcMaxMonthlyPay,
    minInterShipPay,
    calcInterShipPay,
    partTimeCollect,
} from './config'
import CreateModal from '../../recruiter-manage/CreateModal'
import type { CreateRecruiterParams, RecruiterItemProps } from '../../recruiter-manage/interface'
import { createRecruiterApi } from './api'
import { getSessionStorage } from '@/storage'
import classNames from 'classnames'

const objectSupport = require('dayjs/plugin/objectSupport')

dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(objectSupport)

const { TextArea } = Input

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}
const tailLayout = {
    wrapperCol: { offset: 12 },
}

const salaryMonth = new Array(13).fill(12)

const intershipMonth = new Array(12).fill(1)
const intershipWeek = new Array(7).fill(1)

const handlerTime = (time?: string) => {
    try {
        const [hour, minute] = time?.split(':') ?? []
        return dayjs().startOf('day').add(Number(hour), 'hour').add(Number(minute), 'minute')
    } catch (error) {
        return undefined
    }
}

export const PositionCreate = () => {
    const [form] = Form.useForm()
    const [storeShow, setStoreShow] = useState<boolean>(true)
    const [publicSuccessShow, setPublicSuccessShow] = useState<boolean>(false)
    const [settlementFilter, setSettlementFilter] = useState<number[]>([])
    const [desc, setDesc] = useState<string>('')
    const [open, setOpen] = useState<boolean>(false)
    const [openRecruiter, setOpenRecruiter] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [isEnd, setIsEnd] = useState<boolean>(false)

    const store = useLocalStore(() => new PositionManageAddStore())
    const jobType = Form.useWatch('professionTypeId', form)
    const workTimeType = Form.useWatch(['partTimeRecruit', 'workTimeType'], form)
    const socialMinSalary = Form.useWatch(['socialRecruit', 'salaryMin'], form)
    const schoolMinSalary = Form.useWatch(['schoolRecruitDto', 'salaryMin'], form)
    const practiceMinSalary = Form.useWatch(['practiceRecruit', 'salaryMin'], form)

    const partTimeMinSalary = Form.useWatch(['partTimeRecruit', 'salaryMin'], form)
    const partTimeSalaryType = Form.useWatch(['partTimeRecruit', 'salaryType'], form)
    const settlementType = Form.useWatch(['partTimeRecruit', 'settlementType'], form)
    const recruit = Form.useWatch('recruitType', form)

    const { query }: any = useLocation()
    const { code } = query || {}

    // 是否是中台
    const isMiddle = getSessionStorage('PLATFORM') === 'middle'

    useEffect(() => {
        if (Array.isArray(store.salaryTypeOption) && store.salaryTypeOption.length > 0) {
            const salaryTypeOption = store.salaryTypeOption?.map((item: any) => item.code)
            // 0 月结 1 周结 2 日结 3 完工结
            if (settlementType === 0) {
                setSettlementFilter(salaryTypeOption.slice(-1) as [])
                form.setFieldValue(['partTimeRecruit', 'salaryType'], 4)
            } else if (settlementType === 1) {
                setSettlementFilter(salaryTypeOption.slice(0, 3) as [])
                form.setFieldValue(['partTimeRecruit', 'salaryType'], 1)
            } else if (settlementType === 2) {
                setSettlementFilter(salaryTypeOption.slice(0, 2) as [])
                form.setFieldValue(['partTimeRecruit', 'salaryType'], 1)
            } else if (settlementType === 3) {
                setSettlementFilter(salaryTypeOption as [])
                form.setFieldValue(['partTimeRecruit', 'salaryType'], 1)
            }
        }
    }, [settlementType, store.salaryTypeOption])

    useEffect(() => {
        const value = form.getFieldValue(['partTimeRecruit', 'salaryMax'])
        const isExist = partTimeCollect[partTimeSalaryType]
            ?.max(partTimeMinSalary)
            .some(item => item.value === value)
        if ((value && value <= partTimeMinSalary) || !isExist) {
            form.setFieldValue(['partTimeRecruit', 'salaryMax'], '')
        }
    }, [partTimeMinSalary])

    useEffect(() => {
        const value = form.getFieldValue(['practiceRecruit', 'salaryMax'])
        const isExist = calcInterShipPay(practiceMinSalary).some(item => item.value === value)
        if ((value && value <= practiceMinSalary) || !isExist) {
            form.setFieldValue(['practiceRecruit', 'salaryMax'], '')
        }
    }, [practiceMinSalary])

    useEffect(() => {
        const value = form.getFieldValue(['socialRecruit', 'salaryMax'])

        const isExist = calcMaxMonthlyPay(socialMinSalary)?.some(item => item.value === value)

        if ((value && value <= socialMinSalary) || !isExist) {
            form.setFieldValue(['socialRecruit', 'salaryMax'], '')
        }
    }, [socialMinSalary])

    useEffect(() => {
        const value = form.getFieldValue(['schoolRecruit', 'salaryMax'])

        const isExist = calcMaxMonthlyPay(schoolMinSalary)?.some(item => item.value === value)
        if ((value && value <= schoolMinSalary) || !isExist) {
            form.setFieldValue(['schoolRecruit', 'salaryMax'], '')
        }
    }, [schoolMinSalary])

    useEffect(() => {
        if (Reflect.has(query, 'code')) return
        if (recruit === 1) {
            form.resetFields([
                ['socialRecruit', 'experience'],
                ['socialRecruit', 'education'],
                ['socialRecruit', 'salaryMin'],
                ['socialRecruit', 'salaryMax'],
                ['socialRecruit', 'salaryMonth'],
            ])
        } else if (recruit === 2) {
            form.resetFields([
                ['schoolRecruitDto', 'experience'],
                ['schoolRecruitDto', 'education'],
                ['schoolRecruitDto', 'salaryMin'],
                ['schoolRecruitDto', 'salaryMax'],
                ['schoolRecruitDto', 'salaryMonth'],
                ['schoolRecruitDto', 'graduateTime'],
                ['schoolRecruitDto', 'requireEndTime'],
            ])
        } else if (recruit === 3) {
            form.resetFields([
                ['practiceRecruit', 'experience'],
                ['practiceRecruit', 'education'],
                ['practiceRecruit', 'salaryMin'],
                ['practiceRecruit', 'salaryMax'],
                ['practiceRecruit', 'salaryMonth'],
                ['practiceRecruit', 'workMinMonth'],
                ['practiceRecruit', 'workMinDayWeek'],
            ])
        } else if (recruit === 4) {
            form.resetFields([
                ['partTimeRecruit', 'experience'],
                ['partTimeRecruit', 'education'],
                ['partTimeRecruit', 'salaryMin'],
                ['partTimeRecruit', 'salaryMax'],
                ['partTimeRecruit', 'settlementType'],
                ['partTimeRecruit', 'salaryType'],
                ['partTimeRecruit', 'workDays'],
                ['partTimeRecruit', 'workTimeType'],
                ['partTimeRecruit', 'workTime'],
                ['partTimeRecruit', 'requireEndTime'],
            ])
        }
    }, [recruit])

    useEffect(() => {
        // 招聘单位下拉
        store.recruitCompany()
        // 教育经历下拉列表
        store.education()
        // 经验下拉列表
        store.experience()
        // 结算方式下拉列表
        store.settlementType()
        // 薪酬范围下拉列表
        store.salaryType()
        // 获取一级岗位树
        store.jobFirstLevel(0)
        //  查询组织下所有地址
        store.queryOrganizationAddress().then(() => {
            if (Reflect.has(query, 'code')) {
                store.professDetail(query.code).then((resp: any) => {
                    if (Number(resp.status) === 1) {
                        setStoreShow(false)
                    }

                    if (resp?.schoolRecruitDto) {
                        let { graduateTime, requireEndTime } = resp.schoolRecruitDto
                        graduateTime = dayjs(graduateTime)
                        requireEndTime = dayjs(requireEndTime)
                        resp.schoolRecruitDto.graduateTime = graduateTime
                        resp.schoolRecruitDto.requireEndTime = requireEndTime
                    }

                    if (resp?.partTimeRecruit) {
                        let { workTimeStart, workTimeEnd, requireEndTime } = resp.partTimeRecruit
                        resp.partTimeRecruit.requireEndTime = dayjs(requireEndTime)
                        if (resp.partTimeRecruit.workTimeType === 2) {
                            const [_hour, _minute] = workTimeStart.split(':')
                            const [_hour1, _minute1] = workTimeEnd.split(':')

                            resp.partTimeRecruit.workTime = [
                                handlerTime(workTimeStart),
                                handlerTime(workTimeEnd),
                            ]
                        }
                    }
                    form.setFieldsValue(resp)
                })
            }
        })
    }, [])

    useEffect(() => {
        document.title = `${code ? '编辑' : '新建'}职位`
    }, [history.location.pathname, code])

    const onFormChange = (value: any) => {
        if (value?.partTimeRecruit?.salaryType) {
            form.setFieldValue(['partTimeRecruit', 'salaryMin'], '')
            form.setFieldValue(['partTimeRecruit', 'salaryMax'], '')
        }

        // 切换职业的时候清空职位描述和标签
        if (value?.professionTypeId) {
            form.setFieldValue('desc', '')
            form.setFieldValue('tags', [])
        }

        // 切换结算方式的时候清空薪资范围
        if (value?.partTimeRecruit?.settlementType) {
            form.setFieldValue(['partTimeRecruit', 'salaryMin'], '')
            form.setFieldValue(['partTimeRecruit', 'salaryMax'], '')
        }
    }

    const onFinish = async (formData: any) => {
        if (formData?.partTimeRecruit?.workTime) {
            const [start, end] = formData.partTimeRecruit.workTime
            formData.partTimeRecruit.workTimeStart = dayjs(start).format('HH:mm')
            formData.partTimeRecruit.workTimeEnd = dayjs(end).format('HH:mm')
        }
        if (formData?.schoolRecruitDto?.graduateTime) {
            formData.schoolRecruitDto.graduateTime = dayjs(
                formData.schoolRecruitDto.graduateTime,
            ).valueOf()
        }

        if (formData?.schoolRecruitDto?.requireEndTime) {
            formData.schoolRecruitDto.requireEndTime = dayjs(
                formData.schoolRecruitDto.requireEndTime,
            ).valueOf()
        }

        if (formData?.partTimeRecruit?.workTime) {
            const [start, end] = formData.partTimeRecruit.workTime
            formData.partTimeRecruit.workTimeStart = dayjs(start).format('HH:mm')
            formData.partTimeRecruit.workTimeEnd = dayjs(end).format('HH:mm')
        }

        if (formData?.partTimeRecruit?.requireEndTime) {
            formData.partTimeRecruit.requireEndTime = dayjs(
                formData.partTimeRecruit.requireEndTime,
            ).valueOf()
        }

        if (formData?.socialRecruit) {
            formData.socialRecruit.uint = 1
        }

        if (formData?.schoolRecruitDto) {
            formData.schoolRecruitDto.uint = 1
        }

        const tagCodes = formData.tags.map((item: { code: string }) => item.code)
        if (query?.code) {
            await store.jobEdit({ ...formData, tagCodes, code: query?.code, type: 1 })
        } else {
            await store.jobAdd({ ...formData, tagCodes, type: 1 })
        }

        history.push('/admin/company/position-manage')
    }

    const publicFunc = async () => {
        const formData = await form.validateFields()
        const tagCodes = formData.tags.map((item: { code: string }) => item.code)

        if (formData?.partTimeRecruit?.workTime) {
            const [start, end] = formData.partTimeRecruit.workTime
            formData.partTimeRecruit.workTimeStart = dayjs(start).format('HH:mm')
            formData.partTimeRecruit.workTimeEnd = dayjs(end).format('HH:mm')
        }

        if (formData?.schoolRecruitDto?.graduateTime) {
            formData.schoolRecruitDto.graduateTime = dayjs(
                formData.schoolRecruitDto.graduateTime,
            ).valueOf()
        }

        if (formData?.schoolRecruitDto?.requireEndTime) {
            formData.schoolRecruitDto.requireEndTime = dayjs(
                formData.schoolRecruitDto.requireEndTime,
            ).valueOf()
        }

        if (formData?.partTimeRecruit?.workTime) {
            const [start, end] = formData.partTimeRecruit.workTime
            formData.partTimeRecruit.workTimeStart = dayjs(start).format('HH:mm')
            formData.partTimeRecruit.workTimeEnd = dayjs(end).format('HH:mm')
        }

        if (formData?.partTimeRecruit?.requireEndTime) {
            formData.partTimeRecruit.requireEndTime = dayjs(
                formData.partTimeRecruit.requireEndTime,
            ).valueOf()
        }

        if (formData?.socialRecruit) {
            formData.socialRecruit.uint = 1
        }

        if (formData?.schoolRecruitDto) {
            formData.schoolRecruitDto.uint = 1
        }

        if (query?.code) {
            const code = query?.code
            await store.jobEdit({ ...formData, tagCodes, code, type: 1 })
            await store.updateStatus({ code, status: 1 })
        } else {
            const code: any = await store.jobAdd({ ...formData, tagCodes, type: 1 })
            await store.updateStatus({ code, status: 1 })
        }

        setPublicSuccessShow(true)
    }

    const goBackList = () => {
        history.push('/admin/company/position-manage')
    }

    const continuePublic = () => {
        form.resetFields()
        history.push('/admin/company/position-manage/create')
        setPublicSuccessShow(false)
    }

    const getAi = async () => {
        setLoading(true)
        setDesc('')
        let timer: any = null
        if (jobType) {
            setOpen(true)
            const result = await store.capacityList(
                // @ts-ignore
                Array.isArray(jobType) ? jobType.slice(-1) : [jobType],
            )
            if (Array.isArray(result) && result.length > 0) {
                const [{ name }] = result
                const sessionCode = await store.getAIChat(name + '的职位描述')

                if (store.ws.readyState === 1) {
                    store.ws.send(JSON.stringify({ cmd: 'select', sessionCode }))
                    store.ws.onmessage = e => {
                        loading && setLoading(false)

                        if (
                            e?.data &&
                            Object.prototype.toString.call(JSON.parse(e.data)) ===
                                '[object Object]' &&
                            Object.keys(JSON.parse(e.data)).length > 0
                        ) {
                            setIsEnd(() => JSON.parse(e.data).isEnd)
                            setDesc(() => (desc || '') + (JSON.parse(e.data).content || ''))
                        }

                        // 万一websocket没有返回isEnd, 3秒后自动结束
                        timer = setTimeout(() => {
                            setIsEnd(true)
                            setLoading(false)
                            clearTimeout(timer)
                        }, 8000)
                    }
                } else {
                    setIsEnd(true)
                    setLoading(false)
                    store.initConnectWS()
                    message.warning('AI续写失败, 请稍后重试')
                }
            }
        } else {
            message.warning('请先选择职位类型!')
        }
    }

    useEffect(() => {
        if (desc) {
            setLoading(false)
        }
    }, [desc])

    // 使用ai建议
    const handleOk = () => {
        if (isEnd && !loading) {
            const origin = form.getFieldValue('desc')
            form.resetFields(['desc'])
            form.setFieldValue('desc', ((origin || '') + desc).slice(0, 500))
            setOpen(false)
            setDesc('')
        } else {
            message.warning('AI回复中，请耐心等待回复结束')
        }
    }

    // modal取消的回调
    const handleCancel = () => {
        if (isEnd && !loading) {
            setOpen(false)
            setDesc('')
        } else {
            message.warning('AI回复中，请耐心等待回复结束')
        }
    }

    // 添加招聘单位
    const handleAddRecruiter = () => {
        setOpenRecruiter(true)
    }

    const handleCreateRecruiter = (params: CreateRecruiterParams) => {
        return createRecruiterApi(params).then(() => {
            message.success('新建成功')
            setOpenRecruiter(false)
            store.recruitCompany()
        })
    }

    const scrollEnd = (e: any) => {
        const { target } = e
        // 滚动 触底 看接口是否还有剩余的值没传过来
        // !!! 部分电脑无法强相等两个值，为了兼容这种情况，设置5px阈值
        if (target.scrollHeight - (target.scrollTop + target.offsetHeight) < 5) {
            if (store.recruitCompanyQuery.pageNo * 10 < store.recruitCompanyTotalCount) {
                store.recruitCompany({ pageNo: store.recruitCompanyQuery.pageNo + 1, pageSize: 10 })
            }
        }
    }

    const recruiterOptions = () => {
        return store.recruitCompanyList.map((item: RecruiterItemProps) => ({
            label: <RecruiterItem {...item} />,
            value: item.code,
        }))
    }

    return (
        <div
            className={classNames(styles.position_add, {
                [styles.isMiddle]: isMiddle,
            })}
        >
            <Breadcrumbs
                crumbData={[
                    { link: '/admin/company/position-manage', name: '职位管理' },
                    { name: `${code ? '编辑' : '新建'}职位` },
                ]}
            />
            <div className={styles.position_add_container}>
                <div className={styles.title}>
                    <div />
                    <span>{code ? '编辑' : '新建'}职位</span>
                </div>

                <Form
                    {...layout}
                    form={form}
                    className={styles.form_wrap}
                    initialValues={{
                        recruitType: 1,
                        schoolRecruitDto: { experience: 6 },
                        practiceRecruit: { experience: 6 },
                        partTimeRecruit: { salaryType: 1, settlementType: 2 },
                    }}
                    name="control-hooks"
                    onFinish={onFinish}
                    onValuesChange={onFormChange}
                >
                    <div className={styles.sub_title}>
                        <div className={styles.label}>职位基本信息</div>
                        <div className={styles.desc}>
                            请认真填写您发布的职位信息, 以方便求职者了解职位信息
                        </div>
                    </div>
                    <Form.Item
                        name="recruitmentCompanyCode"
                        label="招聘单位"
                        rules={[{ required: true, message: '请选择招聘单位' }]}
                    >
                        <Select
                            placeholder="请选择"
                            options={recruiterOptions()}
                            dropdownRender={menu => (
                                <>
                                    {menu}
                                    <Divider style={{ margin: '0 0' }} />
                                    <Typography.Link
                                        style={{
                                            display: 'block',
                                            height: '32px',
                                            lineHeight: '32px',
                                            paddingLeft: '12px',
                                        }}
                                        onClick={handleAddRecruiter}
                                    >
                                        添加招聘单位
                                    </Typography.Link>
                                </>
                            )}
                            onPopupScroll={scrollEnd}
                        />
                    </Form.Item>
                    <Form.Item name="recruitType" label="招聘类型" rules={[{ required: true }]}>
                        <Radio.Group disabled={code}>
                            <Radio.Button
                                style={{ borderTopLeftRadius: 6, borderBottomLeftRadius: 6 }}
                                value={1}
                            >
                                社招
                            </Radio.Button>
                            <Radio.Button value={2}>校招</Radio.Button>
                            <Radio.Button value={3}>实习</Radio.Button>
                            <Radio.Button
                                style={{ borderTopRightRadius: 6, borderBottomRightRadius: 6 }}
                                value={4}
                            >
                                兼职
                            </Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        name="professionName"
                        label="职位名称"
                        rules={[{ required: true, message: '请输入职位名称!' }]}
                    >
                        <Input disabled={code} placeholder="请输入" showCount maxLength={20} />
                    </Form.Item>
                    <Form.Item
                        name="professionTypeId"
                        label="职位类型"
                        rules={[{ required: true, message: '请选择职位类型' }]}
                    >
                        <PositionType disabled={!!code} store={store} />
                    </Form.Item>
                    <Form.Item
                        name="desc"
                        label="职位描述"
                        rules={[{ required: true, message: '请填写职业描述' }]}
                    >
                        <TextArea
                            placeholder="输入提示：完善的信息可增强职位吸引力，获得更匹配的求职者；请输入不少于10个字的职位描述内容。"
                            // showCount
                            autoSize={{ minRows: 4, maxRows: 6 }}
                            maxLength={500}
                        />
                    </Form.Item>
                    <div style={{ marginTop: -24 }}>
                        <Row>
                            <Col offset={8}>
                                <div onClick={getAi} className={styles.ai}>
                                    <img
                                        style={{ width: 40, height: 40 }}
                                        src="https://wtzp-static.oss-cn-hangzhou.aliyuncs.com/dev/fe_job_pc/img/png_jiqiren@2x.png"
                                        alt=""
                                        srcSet=""
                                    />
                                    <span>
                                        <span>完善职位描述可以增强职位吸引力，试试看</span>
                                        <span style={{ color: '#1678FF' }}>&nbsp;AI续写&nbsp;</span>
                                        <span>吧!</span>
                                    </span>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <Form.Item
                        name="tags"
                        label="职位标签"
                        rules={[{ required: true, message: '请选择职业标签' }]}
                    >
                        <Tags tagNames={store.tagNames} professionTypeId={jobType} store={store} />
                    </Form.Item>
                    <Form.Item
                        name="addressCode"
                        label="工作地址"
                        rules={[{ required: true, message: '请选择工作地址' }]}
                    >
                        <TxMap store={store} />
                    </Form.Item>
                    <div style={{ marginTop: 48 }} className={styles.sub_title}>
                        <div className={styles.label}>职位要求</div>
                        <div className={styles.desc}>系统将根据您的要求为您精准匹配合适的求职</div>
                    </div>
                    {/* 社招职位要求 */}
                    {recruit === 1 && (
                        <>
                            <Form.Item
                                name={['socialRecruit', 'experience']}
                                label="经验"
                                rules={[{ required: true, message: '请选择工作经验' }]}
                            >
                                <Select
                                    getPopupContainer={triggerNode => triggerNode.parentNode}
                                    placeholder="请选择工作经验要求"
                                >
                                    {store.experienceOption?.map((item: any) => (
                                        // @ts-ignore
                                        <Option key={item.code} value={item.code}>
                                            {item.desc}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name={['socialRecruit', 'education']}
                                label="学历"
                                rules={[{ required: true, message: '请选择学历' }]}
                            >
                                <Select
                                    getPopupContainer={triggerNode => triggerNode.parentNode}
                                    placeholder="请选择"
                                >
                                    {store.educationOption?.map((item: any) => (
                                        // @ts-ignore
                                        <Option key={item.code} value={item.code}>
                                            {item.desc}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item label="薪酬范围" required>
                                <div className={styles.salary_styles}>
                                    <Form.Item
                                        noStyle
                                        name={['socialRecruit', 'salaryMin']}
                                        rules={[{ required: true, message: '请填写薪酬下限' }]}
                                    >
                                        <Select
                                            placeholder="请选择"
                                            getPopupContainer={triggerNode =>
                                                triggerNode.parentNode
                                            }
                                            style={{ width: 137 }}
                                            options={minMonthlyPay}
                                        />
                                    </Form.Item>
                                    <MinusOutlined />
                                    <Form.Item
                                        noStyle
                                        name={['socialRecruit', 'salaryMax']}
                                        rules={[{ required: true, message: '请填写薪酬上限' }]}
                                    >
                                        <Select
                                            placeholder="请选择"
                                            getPopupContainer={triggerNode =>
                                                triggerNode.parentNode
                                            }
                                            style={{ width: 137 }}
                                            options={
                                                socialMinSalary
                                                    ? calcMaxMonthlyPay(socialMinSalary)
                                                    : []
                                            }
                                        />
                                    </Form.Item>
                                    <CloseOutlined />
                                    <Form.Item
                                        noStyle
                                        name={['socialRecruit', 'salaryMonth']}
                                        rules={[{ required: true, message: '请选择薪水月数' }]}
                                    >
                                        <Select
                                            placeholder="请选择"
                                            getPopupContainer={triggerNode =>
                                                triggerNode.parentNode
                                            }
                                            style={{ width: 138 }}
                                        >
                                            {salaryMonth.map((item: any, i: number) => (
                                                // @ts-ignore
                                                <Option key={i} value={item + i}>
                                                    {item + i}个月
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </div>
                            </Form.Item>
                        </>
                    )}
                    {/* 校招职位要求 */}
                    {recruit === 2 && (
                        <>
                            <Form.Item
                                name={['schoolRecruitDto', 'experience']}
                                label="经验"
                                rules={[{ required: true, message: '请选择经验时长' }]}
                            >
                                <Select placeholder="请选择" disabled>
                                    {store.experienceOption?.map((item: any) => (
                                        // @ts-ignore
                                        <Option key={item.code} value={item.code}>
                                            {item.desc}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name={['schoolRecruitDto', 'education']}
                                label="学历"
                                rules={[{ required: true, message: '请选择学历' }]}
                            >
                                <Select
                                    placeholder="请选择"
                                    allowClear
                                    getPopupContainer={triggerNode => triggerNode.parentNode}
                                >
                                    {store.educationOption?.map((item: any) => (
                                        // @ts-ignore
                                        <Option key={item.code} value={item.code}>
                                            {item.desc}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item label="薪酬范围" required>
                                <div className={styles.salary_styles}>
                                    <Form.Item
                                        noStyle
                                        name={['schoolRecruitDto', 'salaryMin']}
                                        rules={[{ required: true, message: '请填写薪水下限' }]}
                                    >
                                        <Select
                                            placeholder="请选择"
                                            getPopupContainer={triggerNode =>
                                                triggerNode.parentNode
                                            }
                                            options={minMonthlyPay}
                                        />
                                    </Form.Item>
                                    <MinusOutlined />
                                    <Form.Item
                                        noStyle
                                        name={['schoolRecruitDto', 'salaryMax']}
                                        rules={[{ required: true, message: '请填写薪水上限' }]}
                                    >
                                        <Select
                                            placeholder="请选择"
                                            getPopupContainer={triggerNode =>
                                                triggerNode.parentNode
                                            }
                                            options={calcMaxMonthlyPay(schoolMinSalary)}
                                        />
                                    </Form.Item>
                                    <CloseOutlined />
                                    <Form.Item
                                        noStyle
                                        name={['schoolRecruitDto', 'salaryMonth']}
                                        rules={[{ required: true, message: '请填写薪水月数' }]}
                                    >
                                        <Select
                                            placeholder="请选择"
                                            getPopupContainer={triggerNode =>
                                                triggerNode.parentNode
                                            }
                                        >
                                            {salaryMonth.map((item: any, i: number) => (
                                                // @ts-ignore
                                                <Option key={i} value={item + i}>
                                                    {item + i}个月
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </div>
                            </Form.Item>
                            <Form.Item
                                name={['schoolRecruitDto', 'graduateTime']}
                                label="毕业时间"
                                rules={[{ required: true, message: '请选择毕业时间' }]}
                            >
                                <DatePicker format="YYYY-MM-DD" />
                            </Form.Item>
                            <Form.Item
                                name={['schoolRecruitDto', 'requireEndTime']}
                                label="招聘截止时间"
                                rules={[{ required: true, message: '请选择招聘截止时间' }]}
                            >
                                <DatePicker format="YYYY-MM-DD" />
                            </Form.Item>
                        </>
                    )}
                    {/* 实习职位要求 */}
                    {recruit === 3 && (
                        <>
                            <Form.Item
                                name={['practiceRecruit', 'experience']}
                                label="经验"
                                rules={[{ required: true }]}
                            >
                                <Select placeholder="请选择" disabled>
                                    {store.experienceOption?.map((item: any) => (
                                        // @ts-ignore
                                        <Option key={item.code} value={item.code}>
                                            {item.desc}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name={['practiceRecruit', 'education']}
                                label="学历"
                                rules={[{ required: true }]}
                            >
                                <Select
                                    getPopupContainer={triggerNode => triggerNode.parentNode}
                                    placeholder="请选择"
                                >
                                    {store.educationOption?.map((item: any) => (
                                        // @ts-ignore
                                        <Option key={item.code} value={item.code}>
                                            {item.desc}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item label="薪酬范围" required>
                                <div className={styles.salary_styles}>
                                    <Form.Item
                                        noStyle
                                        name={['practiceRecruit', 'salaryMin']}
                                        rules={[{ required: true, message: '请填写日薪下限' }]}
                                    >
                                        <Select
                                            placeholder="请选择"
                                            getPopupContainer={triggerNode =>
                                                triggerNode.parentNode
                                            }
                                            style={{ width: 187 }}
                                            options={minInterShipPay}
                                        />
                                    </Form.Item>
                                    <MinusOutlined />
                                    <Form.Item
                                        noStyle
                                        name={['practiceRecruit', 'salaryMax']}
                                        rules={[{ required: true, message: '请填写日薪上限' }]}
                                    >
                                        <Select
                                            placeholder="请选择"
                                            getPopupContainer={triggerNode =>
                                                triggerNode.parentNode
                                            }
                                            style={{ width: 187 }}
                                            options={calcInterShipPay(practiceMinSalary)}
                                        />
                                    </Form.Item>
                                    <div style={{ width: 40 }}>元/天</div>
                                </div>
                            </Form.Item>
                            <Form.Item label="实习要求" required>
                                <Row>
                                    <Col>
                                        <Form.Item
                                            noStyle
                                            name={['practiceRecruit', 'workMinMonth']}
                                            rules={[
                                                { required: true, message: '请选择最小实习月数' },
                                            ]}
                                        >
                                            <Select
                                                placeholder="请选择"
                                                getPopupContainer={triggerNode =>
                                                    triggerNode.parentNode
                                                }
                                                style={{ width: '100%' }}
                                            >
                                                {intershipMonth.map((item: any, i: number) => (
                                                    // @ts-expect-error
                                                    <Option key={i} value={item + i}>
                                                        {item + i}个月
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col offset={1}>
                                        <Form.Item
                                            noStyle
                                            name={['practiceRecruit', 'workMinDayWeek']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '请选择一周最小到岗天数',
                                                },
                                            ]}
                                        >
                                            <Select
                                                getPopupContainer={triggerNode =>
                                                    triggerNode.parentNode
                                                }
                                                style={{ width: '100%' }}
                                                placeholder="请选择一周最小到岗天数"
                                            >
                                                {intershipWeek.map((item: any, i: number) => (
                                                    // @ts-ignore
                                                    <Option key={i} value={item + i}>
                                                        {item + i}天
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form.Item>
                        </>
                    )}
                    {/* 兼职职位要求 */}
                    {recruit === 4 && (
                        <>
                            <Form.Item
                                name={['partTimeRecruit', 'experience']}
                                label="经验"
                                rules={[{ required: true }]}
                            >
                                <Select
                                    allowClear
                                    placeholder="请选择"
                                    getPopupContainer={triggerNode => triggerNode.parentNode}
                                >
                                    {store.experienceOption?.map((item: any) => (
                                        // @ts-ignore
                                        <Option key={item.code} value={item.code}>
                                            {item.desc}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name={['partTimeRecruit', 'education']}
                                label="学历"
                                rules={[{ required: true, message: '请选择学历' }]}
                            >
                                <Select
                                    allowClear
                                    placeholder="请选择"
                                    getPopupContainer={triggerNode => triggerNode.parentNode}
                                >
                                    {store.educationOption?.map((item: any) => (
                                        // @ts-ignore
                                        <Option key={item.code} value={item.code}>
                                            {item.desc}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name={['partTimeRecruit', 'settlementType']}
                                label="结算方式"
                                rules={[{ required: true, message: '请选择结算方式' }]}
                            >
                                <Select
                                    allowClear
                                    placeholder="请选择"
                                    getPopupContainer={triggerNode => triggerNode.parentNode}
                                >
                                    {store.settlementTypeOption?.map((item: any) => (
                                        // @ts-ignore
                                        <Option key={item.code} value={item.code}>
                                            {item.desc}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item label="薪酬范围" required>
                                <div className={styles.salary_styles}>
                                    <Form.Item
                                        noStyle
                                        name={['partTimeRecruit', 'salaryMin']}
                                        rules={[{ required: true, message: '请填写薪水下限' }]}
                                    >
                                        <Select
                                            placeholder="请选择"
                                            getPopupContainer={triggerNode =>
                                                triggerNode.parentNode
                                            }
                                            options={partTimeCollect[partTimeSalaryType]?.min}
                                        />
                                    </Form.Item>
                                    <MinusOutlined />
                                    <Form.Item
                                        noStyle
                                        name={['partTimeRecruit', 'salaryMax']}
                                        rules={[{ required: true, message: '请填写薪水上限' }]}
                                    >
                                        <Select
                                            placeholder="请选择"
                                            getPopupContainer={triggerNode =>
                                                triggerNode.parentNode
                                            }
                                            options={partTimeCollect[partTimeSalaryType]?.max(
                                                partTimeMinSalary,
                                            )}
                                        />
                                    </Form.Item>
                                    <CloseOutlined />
                                    <Form.Item
                                        noStyle
                                        name={['partTimeRecruit', 'salaryType']}
                                        rules={[{ required: true, message: '请选择薪水类型' }]}
                                    >
                                        <Select
                                            placeholder="请选择"
                                            getPopupContainer={triggerNode =>
                                                triggerNode.parentNode
                                            }
                                        >
                                            {store.salaryTypeOption
                                                ?.filter(item =>
                                                    settlementFilter?.includes(item.code),
                                                )
                                                ?.map((item: any, i: number) => (
                                                    // @ts-ignore
                                                    <Option key={i} value={item.code}>
                                                        {item.desc}
                                                    </Option>
                                                ))}
                                        </Select>
                                    </Form.Item>
                                </div>
                            </Form.Item>
                            <Form.Item name={['partTimeRecruit', 'workDays']} label="工作日">
                                <WorkDay />
                            </Form.Item>
                            <Form.Item label="工作时间" required>
                                <Form.Item
                                    noStyle
                                    name={['partTimeRecruit', 'workTimeType']}
                                    rules={[{ required: true, message: '请选择工作时间类型' }]}
                                >
                                    <Radio.Group>
                                        <Radio value={1}>不限时间</Radio>
                                        <Radio value={2}>自定义时间</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                {workTimeType === 2 && (
                                    <div style={{ marginTop: 12 }}>
                                        <Form.Item
                                            noStyle
                                            name={['partTimeRecruit', 'workTime']}
                                            rules={[
                                                { required: true, message: '请选择自定义时间段' },
                                            ]}
                                        >
                                            <TimePicker.RangePicker format="HH:mm" />
                                        </Form.Item>
                                    </div>
                                )}
                            </Form.Item>
                            <Form.Item
                                name={['partTimeRecruit', 'requireEndTime']}
                                label="招聘截止时间"
                                rules={[{ required: true, message: '请选择招聘截止时间' }]}
                            >
                                <DatePicker />
                            </Form.Item>
                        </>
                    )}
                    <Form.Item {...tailLayout}>
                        <Space>
                            {storeShow && <Button htmlType="submit">保存</Button>}
                            <Button
                                type="primary"
                                onClick={debounce(publicFunc, 2000, {
                                    leading: true,
                                    trailing: false,
                                })}
                            >
                                发布
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>

            <Modal
                width={1000}
                title="AI职灵"
                open={open}
                onOk={handleOk}
                okText="使用此描述"
                onCancel={handleCancel}
            >
                <Spin size="large" spinning={loading}>
                    <div style={{ height: 300, overflowY: 'scroll' }}>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{desc}</ReactMarkdown>
                    </div>
                </Spin>
            </Modal>

            <Modal closable={false} open={publicSuccessShow} footer={null}>
                <Result
                    status="success"
                    title="发布成功"
                    extra={[
                        <Button onClick={continuePublic} type="primary" key="console">
                            继续发布
                        </Button>,
                        <Button onClick={goBackList} key="buy">
                            返回列表
                        </Button>,
                    ]}
                />
            </Modal>

            <CreateModal
                open={openRecruiter}
                onCancel={() => setOpenRecruiter(false)}
                onCreate={handleCreateRecruiter}
            />
        </div>
    )
}

const observePage: IRoute = observer(PositionCreate)
observePage.title = '新建职位'

export default observePage
