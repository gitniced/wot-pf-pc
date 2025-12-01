import { Tag, Button } from 'antd'
import { observer } from 'mobx-react'
import { useState } from 'react'
import JobClassModal from '../jobClassModal'
import styles from './index.module.less'
import type { ICheckedRows } from './const'
import Http from '@/servers/http'

const Index = ({
    value = [],
    onChange,
    updatePreviewList,
}: {
    value?: ICheckedRows[]
    onChange?: (value: any) => void
    updatePreviewList?: (obj: object) => void
}) => {
    // 选择职业工种等级modal显示隐藏
    const [jobClassVisible, setJobClassVisible] = useState(false)
    // 选择职业工种的选项数组
    const [checkedRows, setCheckedRows] = useState(value)
    // 选择职业工种的选项Key数组
    const [checkedRowKeys, setCheckedRowKeys] = useState(value.map((item: ICheckedRows) => item.id))

    // 展示选择工种选择model
    const addJobClass = () => {
        setJobClassVisible(true)
        setCheckedRowKeys(JSON.parse(JSON.stringify(checkedRowKeys)))
    }

    // 选择职业工种完成
    const onChoiceComplete = async ({ selectedRow, selectedRowKey }: Record<string, any>) => {
        setCheckedRows(selectedRow as [])
        setCheckedRowKeys(selectedRowKey as [])
        if (selectedRow.length > 0) {
            try {
                ;(async () => {
                    const res = await Http(`/career_main/course/batch_course_detail`, 'post', {
                        courseIds: selectedRow.flatMap((item: ICheckedRows) => item.courseIds),
                    })
                    updatePreviewList &&
                        updatePreviewList({
                            lessonContent: res,
                            codes: selectedRow.flatMap((item: ICheckedRows) => item.courseIds),
                        })
                })()
            } catch (error) {
                console.log('error', error)
            }
            // console.log('***************', checkedRows)
            onChange?.(selectedRow)
        } else {
            updatePreviewList && updatePreviewList({ lessonContent: [], codes: [] })
        }

        setJobClassVisible(false)
    }

    // tag标签被删除的回调
    const onTagClose = (e: any) => {
        const selectedRow = checkedRows.filter((item: ICheckedRows) => item.id !== e.id)
        const selectedRowKey = checkedRowKeys.filter(item => item !== e.id)
        console.log('-----------selectedRow', selectedRow, selectedRowKey)
        setCheckedRows(selectedRow)
        setCheckedRowKeys(selectedRowKey)
        onChoiceComplete({ selectedRow, selectedRowKey })
    }

    return (
        <>
            <JobClassModal
                checkedRows={checkedRows as []}
                checkedRowKeys={checkedRowKeys}
                visible={jobClassVisible}
                onChoiceComplete={onChoiceComplete}
                closeDialog={() => setJobClassVisible(false)}
            />
            <div>添加职业工种等级</div>
            <div>
                {checkedRows.map((item: ICheckedRows) => (
                    <div className={styles.tag_style} key={item.id}>
                        <Tag onClose={() => onTagClose(item)} closable>
                            {item.name + '>' + item.workName + '>' + item.levelName}
                        </Tag>
                    </div>
                ))}
            </div>
            <div>
                {checkedRows.length < 10 && (
                    <Button style={{ padding: 0, height: 24 }} onClick={addJobClass} type="link">
                        点击添加
                    </Button>
                )}
            </div>
        </>
    )
}

export default observer(Index)
