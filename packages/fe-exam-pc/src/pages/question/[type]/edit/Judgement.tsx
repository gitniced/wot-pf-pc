// 判断题选项

import { Radio, Space, Typography } from 'antd'
import type { OptionInnerProps } from './interface'

import styles from './index.module.less'

const Judgement = (props: OptionInnerProps) => {
    const { optionList, onChange } = props

    const handleChangeOptionList = (currentIndex: number) => {
        optionList.map((item, index) => {
            item.isAnswer = index === currentIndex ? true : false
            return item
        })

        onChange(optionList)
    }

    return (
        <div className={`${styles.option_list} ${styles.judgement}`}>
            {optionList.map((item, childIndex) => (
                <div className={styles.option_item_inner} key={item.code}>
                    <Radio
                        checked={item.isAnswer}
                        onChange={() => handleChangeOptionList(childIndex)}
                    >
                        <Space size={16}>
                            {`${String.fromCharCode(65 + childIndex)}.`}
                            <Typography>{item.answer}</Typography>
                        </Space>
                    </Radio>
                </div>
            ))}
        </div>
    )
}

export default Judgement
