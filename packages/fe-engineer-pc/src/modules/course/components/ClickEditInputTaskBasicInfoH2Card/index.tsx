import styles from './index.module.less'
import React, { useCallback, useState } from 'react'
import classNames from 'classnames'
import type { IUseComponentValueProps } from '@/hooks/useComponentValue'
import useComponentValue from '@/hooks/useComponentValue'
import type { ICourseDataItem } from '../../types'
import ClickEditInputNumber from '@/components/ClickEditInputNumber'
import type { ICourseStylistic6BasicInfo } from '../../types/stylistic6'
import ClickEditInput from '@/components/ClickEditInput'
import ClickEditActiveContainer from '@/components/ClickEditActiveContainer'

interface IClickEditInputTaskBasicInfoH2CardProps
    extends IUseComponentValueProps<ICourseStylistic6BasicInfo> {
    className?: string
    title: string
    dataTitle: string
    items: Omit<ICourseDataItem<ICourseStylistic6BasicInfo>, 'value'>[]
}

const ClickEditInputTaskBasicInfoH2Card: React.FC<
    IClickEditInputTaskBasicInfoH2CardProps
> = props => {
    const [active, setActive] = useState(false)

    const { value, onChange, onChangeBlur } = useComponentValue({
        value: props.value,
        defaultValue: props.defaultValue,
        onChange: props.onChange,
        onChangeBlur: props.onChangeBlur,
    })

    const handleBlur = useCallback(() => {
        if (!active) return
        setActive(false)
        onChangeBlur()
    }, [active, onChangeBlur])

    return (
        <ClickEditActiveContainer
            active={active}
            setActive={setActive}
            onBlur={handleBlur}
            className={classNames(styles.click_edit_input_task_basic_info_h2_card, {
                [styles.active]: active,
                [props.className as string]: props.className,
            })}
        >
            <div className={styles.click_edit_input_task_basic_info_h2_card_header}>
                <div className={styles.click_edit_input_task_basic_info_h2_card_header_title}>
                    {props.title}
                </div>
            </div>

            <div className={styles.task_basic_info_content}>
                <div className={styles.task_basic_info_content_item}>
                    <span>工作时长：</span>
                    <ClickEditInputNumber
                        active={active}
                        setActive={setActive}
                        value={value?.workDuration}
                        placeholder="请输入"
                        onChange={_value => {
                            onChange(v => ({ ...v, workDuration: _value }))
                        }}
                    />
                </div>

                <div className={styles.task_basic_info_content_item}>
                    <span>实践企业名称：</span>
                    <ClickEditInput
                        active={active}
                        setActive={setActive}
                        value={value?.enterpriseName}
                        rows={1}
                        placeholder="请输入"
                        onChange={_value => {
                            onChange(v => ({ ...v, enterpriseName: _value }))
                        }}
                    />
                </div>
            </div>
        </ClickEditActiveContainer>
    )
}

export default React.memo(ClickEditInputTaskBasicInfoH2Card)
