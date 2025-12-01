import { useEffect, useMemo } from 'react'
import ClickEditTableH2Card from '../../components/ClickEditTableH2Card'
import { COURSE_DESIGN_STYLISTIC_MAP, COURSE_DESIGN_STYLISTIC } from '../../const'
import styles from './index.module.less'
import { useCourseStore } from '../../context'
import { observer } from 'mobx-react'
import { getLearningTaskDesignColumns, getTableRowData } from './const'

const Stylistic3: React.FC = observer(() => {
    const courseStore = useCourseStore()

    useEffect(() => {
        courseStore.loadStylistic3()
    }, [courseStore])

    const stylistic3 = useMemo(() => {
        return courseStore.stylistic3
    }, [courseStore.stylistic3])

    const tableData = useMemo(() => {
        return getTableRowData(stylistic3.learningTaskDesignDtos)
    }, [stylistic3.learningTaskDesignDtos])

    return (
        <div className={styles.stylistic}>
            <ClickEditTableH2Card
                title="一、学习任务设计"
                className={styles.stylistic_h2}
                dataTitle={COURSE_DESIGN_STYLISTIC_MAP[COURSE_DESIGN_STYLISTIC.stylistic3].name}
                items={[
                    {
                        name: '一、学习任务设计',
                        key: 'learningTaskDesignDtos',
                    },
                ]}
                transformValue={(value, setValue, _prevValue) => {
                    const currentValue = getTableRowData(value?.learningTaskDesignDtos)
                    const prevValue = _prevValue?.[0]?.value || []

                    for (const item of currentValue) {
                        if (item.key === 'scenario' || item.key === 'period') {
                            const obj = prevValue.find(p => p.key === item.key)
                            if (obj) {
                                for (const key in obj) {
                                    if (key.includes('task_')) {
                                        const index = key.split('task_')[1]
                                        item[`task_${index}`] = obj[key]
                                    }
                                }
                            }
                        }
                    }

                    setValue([
                        {
                            name: '一、学习任务设计',
                            key: 'learningTaskDesignDtos',
                            value: currentValue,
                        },
                    ])
                }}
                getColumns={(active, setActive, handleDataChange) =>
                    getLearningTaskDesignColumns(
                        stylistic3.learningTaskDesignDtos,
                        active,
                        setActive,
                        handleDataChange,
                    )
                }
                defaultValue={tableData}
                onChangeBlur={updatedData => {
                    const tasks = stylistic3.learningTaskDesignDtos.map((task, index) => {
                        const updatedTask = { ...task }
                        updatedData.forEach((row: any) => {
                            if (row.key && row[`task_${index}`] !== undefined) {
                                let value = row[`task_${index}`]

                                if (row.key === 'period') {
                                    value = Math.max(0, Number(value) || 0)
                                } else {
                                    value = String(value || '').trim()
                                }

                                ;(updatedTask as any)[row.key] = value
                            }
                        })
                        return updatedTask
                    })

                    return courseStore.saveStylistic3({
                        learningTaskDesignDtos: tasks,
                    })
                }}
                rowKey={record => `row-${record.key}`}
            />
        </div>
    )
})

export default Stylistic3
