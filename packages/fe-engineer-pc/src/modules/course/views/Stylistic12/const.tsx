import type { TableColumnsType } from 'antd'
import ClickEditInput from '@/components/ClickEditInput'
import { cloneDeep } from 'lodash'
import type { LearningActivity } from '../../types/stylistic12'

export const getStudentSituationAnalysisColumns = (
    active: boolean,
    setActive: (active: boolean) => void,
    onDataChange?: (index: number, field: string, value: any) => void,
): TableColumnsType<any> => [
    {
        title: '细分模块',
        dataIndex: 'refinementModules',
        key: 'refinementModules',
        width: '10%',
        align: 'center',
        render: _value => <span>{_value}</span>,
    },
    {
        title: '1. 学生基础',
        dataIndex: 'studentBase',
        key: 'studentBase',
        width: '25%',
        align: 'center',
        render: (value: string, _record, index) => (
            <ClickEditInput
                defaultValue={value}
                active={active}
                setActive={setActive}
                placeholder="请输入"
                onChange={val => onDataChange?.(index, 'studentBase', val)}
                onChangeBlur={val => onDataChange?.(index, 'studentBase', val)}
            />
        ),
    },
    {
        title: '2. 学生不足',
        dataIndex: 'studentInsufficient',
        key: 'studentInsufficient',
        width: '25%',
        align: 'center',
        render: (value: string, _record, index) => (
            <ClickEditInput
                defaultValue={value}
                active={active}
                setActive={setActive}
                placeholder="请输入"
                onChange={val => onDataChange?.(index, 'studentInsufficient', val)}
                onChangeBlur={val => onDataChange?.(index, 'studentInsufficient', val)}
            />
        ),
    },
    {
        title: '3. 改进方法',
        dataIndex: 'improvementMethod',
        key: 'improvementMethod',
        width: '25%',
        align: 'center',
        render: (value: string, _record, index) => (
            <ClickEditInput
                defaultValue={value}
                active={active}
                setActive={setActive}
                placeholder="请输入"
                onChange={val => onDataChange?.(index, 'improvementMethod', val)}
                onChangeBlur={val => onDataChange?.(index, 'improvementMethod', val)}
            />
        ),
    },
]

export const getTeachingActivityDesignColumns = (
    active: boolean,
    setActive: (active: boolean) => void,
    dataSource: LearningActivity[],
    onDataChange?: (field: string, value: any) => void,
): TableColumnsType<LearningActivity> => [
    {
        title: '教学过程',
        dataIndex: 'teachingProcess',
        key: 'teachingProcess',
        align: 'center',
        width: '11%',
        render: (value: string, record, index) => (
            <ClickEditInput
                defaultValue={record?.teachingProcess}
                active={active}
                setActive={setActive}
                placeholder="请输入"
                onChange={val => {
                    const newDataSource = cloneDeep(dataSource)
                    newDataSource[index].teachingProcess = val
                    onDataChange?.('learningActivityList', newDataSource)
                }}
                onChangeBlur={val => {
                    const newDataSource = cloneDeep(dataSource)
                    newDataSource[index].teachingProcess = val
                    onDataChange?.('learningActivityList', newDataSource)
                }}
            />
        ),
    },
    {
        title: '学习内容',
        dataIndex: 'learningContent',
        key: 'learningContent',
        align: 'center',
        width: '15%',
        render: (value: string, record, index) => (
            <ClickEditInput
                defaultValue={record?.learningContent}
                active={active}
                setActive={setActive}
                placeholder="请输入"
                onChange={val => {
                    const newDataSource = cloneDeep(dataSource)
                    newDataSource[index].learningContent = val
                    onDataChange?.('learningActivityList', newDataSource)
                }}
                onChangeBlur={val => {
                    const newDataSource = cloneDeep(dataSource)
                    newDataSource[index].learningContent = val
                    onDataChange?.('learningActivityList', newDataSource)
                }}
            />
        ),
    },
    {
        title: '学生活动',
        dataIndex: 'studentActivity',
        key: 'studentActivity',
        align: 'center',
        width: '15%',
        render: (value: string, record, index) => (
            <ClickEditInput
                defaultValue={record?.studentActivity}
                active={active}
                setActive={setActive}
                placeholder="请输入"
                onChange={val => {
                    const newDataSource = cloneDeep(dataSource)
                    newDataSource[index].studentActivity = val
                    onDataChange?.('learningActivityList', newDataSource)
                }}
                onChangeBlur={val => {
                    const newDataSource = cloneDeep(dataSource)
                    newDataSource[index].studentActivity = val
                    onDataChange?.('learningActivityList', newDataSource)
                }}
            />
        ),
    },
    {
        title: '教师活动',
        dataIndex: 'teacherActivity',
        key: 'teacherActivity',
        align: 'center',
        width: '15%',
        render: (value: string, record, index) => (
            <ClickEditInput
                defaultValue={record?.teacherActivity}
                active={active}
                setActive={setActive}
                placeholder="请输入"
                onChange={val => {
                    const newDataSource = cloneDeep(dataSource)
                    newDataSource[index].teacherActivity = val
                    onDataChange?.('learningActivityList', newDataSource)
                }}
                onChangeBlur={val => {
                    const newDataSource = cloneDeep(dataSource)
                    newDataSource[index].teacherActivity = val
                    onDataChange?.('learningActivityList', newDataSource)
                }}
            />
        ),
    },
    {
        title: '教学手段',
        dataIndex: 'teachingMeans',
        key: 'teachingMeans',
        align: 'center',
        width: '15%',
        render: (value: string, record, index) => (
            <ClickEditInput
                defaultValue={record?.teachingMeans}
                active={active}
                setActive={setActive}
                placeholder="请输入"
                onChange={val => {
                    const newDataSource = cloneDeep(dataSource)
                    newDataSource[index].teachingMeans = val
                    onDataChange?.('learningActivityList', newDataSource)
                }}
                onChangeBlur={val => {
                    const newDataSource = cloneDeep(dataSource)
                    newDataSource[index].teachingMeans = val
                    onDataChange?.('learningActivityList', newDataSource)
                }}
            />
        ),
    },
    {
        title: '教学方法',
        dataIndex: 'teachingMethods',
        key: 'teachingMethods',
        align: 'center',
        width: '15%',
        render: (value: string, record, index) => (
            <ClickEditInput
                defaultValue={record?.teachingMethods}
                active={active}
                setActive={setActive}
                placeholder="请输入"
                onChange={val => {
                    const newDataSource = cloneDeep(dataSource)
                    newDataSource[index].teachingMethods = val
                    onDataChange?.('learningActivityList', newDataSource)
                }}
                onChangeBlur={val => {
                    const newDataSource = cloneDeep(dataSource)
                    newDataSource[index].teachingMethods = val
                    onDataChange?.('learningActivityList', newDataSource)
                }}
            />
        ),
    },
    {
        title: '学习成果',
        dataIndex: 'learningResult',
        key: 'learningResult',
        align: 'center',
        width: '15%',
        render: (value: string, record, index) => (
            <ClickEditInput
                defaultValue={record?.learningResult}
                active={active}
                setActive={setActive}
                placeholder="请输入"
                onChange={val => {
                    const newDataSource = cloneDeep(dataSource)
                    newDataSource[index].learningResult = val
                    onDataChange?.('learningActivityList', newDataSource)
                }}
                onChangeBlur={val => {
                    const newDataSource = cloneDeep(dataSource)
                    newDataSource[index].learningResult = val
                    onDataChange?.('learningActivityList', newDataSource)
                }}
            />
        ),
    },
]
