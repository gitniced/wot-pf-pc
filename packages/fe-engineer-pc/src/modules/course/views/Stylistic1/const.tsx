import ClickEditInput from '@/components/ClickEditInput'
import type { TableColumnsType } from 'antd'
import type {
    ICourseStylistic1TaskAnalysis,
    ICourseStylistic1ConversionSuggestions,
} from '../../types/stylistic1'
import ClickEditInputNumber from '@/components/ClickEditInputNumber'
import { CustomMarkdown } from '../../../../components/AIComp/components/CustomMarkdown'

export const stylisticItemMap = {
    1: [
        {
            name: '（1）课程来源',
            key: 'courseSource',
        },
        {
            name: '（2）前后序课程',
            key: 'sequentialCourses',
        },
        {
            name: '（3）关联课程',
            key: 'relatedCourses',
        },
        {
            name: '（4）工作范畴',
            key: 'workScope',
        },
        {
            name: '（5）学习价值',
            key: 'learningValue',
        },
    ],
    2: [
        {
            name: '2.参考性学习任务分析',
            key: 'taskAnalysis',
        },
    ],
    3: [
        {
            key: 'courseObjectivesAndContentAnalysis',
            name: '3.课程目标与学习内容分析',
        },
    ],
    4: [
        {
            key: 'teachingImplementationAndAssessmentAnalysis',
            name: '4.教学实施建议及考核要求分析',
        },
    ],
    5: [
        {
            name: '1.地区产业特征分析',
            key: 'regionalIndustryCharacteristicsAnalysis',
        },
        {
            name: '2.学校特色分析',
            key: 'schoolCharacteristicsAnalysis',
        },
        {
            name: '3.学生基础分析',
            key: 'studentBasisAnalysis',
        },
        {
            name: '4.学校软硬件条件分析',
            key: 'schoolSoftwareHardwareAnalysis',
        },
    ],
    6: [
        {
            name: '三、工学一体化课程标准校本转化建议',
            key: 'conversionSuggestions',
        },
    ],
}

/**
 * 参考性学习任务分析
 */
export const getLearningTaskAnalysisColumns = (
    active: boolean,
    setActive: (active: boolean) => void,
    onDataChange?: (index: number, field: string, value: any) => void,
): TableColumnsType<ICourseStylistic1TaskAnalysis> => [
    {
        title: '序号',
        dataIndex: 'serialnumber',
        key: 'serialnumber',
        width: 80,
        align: 'center',
        onCell: (_, index) => {
            if (index === 0) {
                return { rowSpan: 1 }
            }
            return {}
        },
    },
    {
        title: '国标参考性学习任务',
        children: [
            {
                title: '任务名称',
                dataIndex: 'countryTaskName',
                key: 'countryTaskName',
                width: 200,
                align: 'center',
                render: (value: string, _record, index) => (
                    <ClickEditInput
                        defaultValue={value}
                        active={active}
                        setActive={setActive}
                        placeholder="请输入"
                        onChange={val => onDataChange?.(index, 'countryTaskName', val)}
                        onChangeBlur={val => onDataChange?.(index, 'countryTaskName', val)}
                    />
                ),
            },
            {
                title: '学时',
                dataIndex: 'countryTaskHours',
                key: 'countryTaskHours',
                width: 80,
                align: 'center',
                render: (value: number, _record, index) => (
                    <ClickEditInputNumber
                        defaultValue={Number(value)}
                        active={active}
                        setActive={setActive}
                        placeholder="请输入"
                        onChange={val => onDataChange?.(index, 'countryTaskHours', val)}
                        onChangeBlur={val => onDataChange?.(index, 'countryTaskHours', val)}
                    />
                ),
            },
            {
                title: '任务描述',
                dataIndex: 'countryTaskDescription',
                key: 'countryTaskDescription',
                width: 300,
                align: 'center',
                render: (value: string, _record, index) => (
                    <ClickEditInput
                        defaultValue={value}
                        active={active}
                        setActive={setActive}
                        placeholder="请输入"
                        onChange={val => onDataChange?.(index, 'countryTaskDescription', val)}
                        onChangeBlur={val => onDataChange?.(index, 'countryTaskDescription', val)}
                    />
                ),
            },
        ],
    },
    {
        title: '校本学习任务',
        children: [
            {
                title: '任务名称',
                dataIndex: 'schoolTaskName',
                key: 'schoolTaskName',
                width: 200,
                align: 'center',
                render: (value: string, _record, index) => (
                    <ClickEditInput
                        defaultValue={value}
                        active={active}
                        setActive={setActive}
                        placeholder="请输入"
                        onChange={val => onDataChange?.(index, 'schoolTaskName', val)}
                        onChangeBlur={val => onDataChange?.(index, 'schoolTaskName', val)}
                        disabled
                    />
                ),
            },
            {
                title: '学时',
                dataIndex: 'schoolTaskHours',
                key: 'schoolTaskHours',
                width: 80,
                align: 'center',
                render: (value: number, _record, index) => (
                    <ClickEditInputNumber
                        defaultValue={Number(value)}
                        active={active}
                        setActive={setActive}
                        placeholder="请输入"
                        onChange={val => onDataChange?.(index, 'schoolTaskHours', val)}
                        onChangeBlur={val => onDataChange?.(index, 'schoolTaskHours', val)}
                        disabled
                    />
                ),
            },
            {
                title: '任务描述',
                dataIndex: 'schoolTaskDescription',
                key: 'schoolTaskDescription',
                width: 300,
                align: 'center',
                render: (value: string, _record, index) => (
                    <ClickEditInput
                        defaultValue={value}
                        active={active}
                        setActive={setActive}
                        placeholder="请输入"
                        onChange={val => onDataChange?.(index, 'schoolTaskDescription', val)}
                        onChangeBlur={val => onDataChange?.(index, 'schoolTaskDescription', val)}
                        disabled
                    />
                ),
            },
        ],
    },
]

/**
 * 三、工学一体化课程标准校本转化建议
 */
export const getSchoolTransformationColumns = (
    active: boolean,
    setActive: (active: boolean) => void,
    onDataChange?: (index: number, field: string, value: any) => void,
): TableColumnsType<ICourseStylistic1ConversionSuggestions> => [
    {
        title: '转化项目',
        dataIndex: 'conversionName',
        key: 'conversionName',
        width: '15%',
        align: 'center',
        render: (value: string, _record) => (
            <CustomMarkdown>{value}</CustomMarkdown>
            // <ClickEditInput
            //     defaultValue={value}
            //     active={active}
            //     setActive={setActive}
            //     placeholder="请输入"
            //     onChange={val => onDataChange?.(index, 'conversionName', val)}
            //     onChangeBlur={val => onDataChange?.(index, 'conversionName', val)}
            // />
        ),
    },
    {
        title: '国标',
        dataIndex: 'countryContent',
        key: 'countryContent',
        width: '25%',
        render: (value: string, _record, index) => {
            if (index === 0) {
                return value
            }

            // if (_record.conversionName === '参考性学习任务') {
            //     return '/'
            // }

            return (
                <ClickEditInput
                    defaultValue={value}
                    active={active}
                    setActive={setActive}
                    placeholder="请输入"
                    onChange={val => onDataChange?.(index, 'countryContent', val)}
                    onChangeBlur={val => onDataChange?.(index, 'countryContent', val)}
                />
            )
        },
    },
    {
        title: '校本',
        dataIndex: 'schoolContent',
        key: 'schoolContent',
        width: '35%',
        render: (value: string, _record, index) => {
            if (index === 0) {
                return (
                    <div
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ClickEditInputNumber
                            defaultValue={Number(value)}
                            active={active}
                            setActive={setActive}
                            placeholder="请输入"
                            onChange={val => onDataChange?.(index, 'schoolContent', val)}
                            onChangeBlur={val => onDataChange?.(index, 'schoolContent', val)}
                        />
                    </div>
                )
            }

            // if (_record.conversionName === '参考性学习任务') {
            //     return '/'
            // }

            return (
                <ClickEditInput
                    defaultValue={value}
                    active={active}
                    setActive={setActive}
                    placeholder="请输入"
                    onChange={val => onDataChange?.(index, 'schoolContent', val)}
                    onChangeBlur={val => onDataChange?.(index, 'schoolContent', val)}
                />
            )
        },
    },
    {
        title: '转化说明',
        dataIndex: 'conversionIllustrate',
        key: 'conversionIllustrate',
        width: '25%',
        align: 'center',
        render: (value: string, _record, index) => (
            <ClickEditInput
                defaultValue={value}
                active={active}
                setActive={setActive}
                placeholder="请输入"
                onChange={val => onDataChange?.(index, 'conversionIllustrate', val)}
                onChangeBlur={val => onDataChange?.(index, 'conversionIllustrate', val)}
            />
        ),
    },
]
