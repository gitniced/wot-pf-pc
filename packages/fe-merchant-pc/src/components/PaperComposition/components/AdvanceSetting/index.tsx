import { InfoCircleOutlined } from '@ant-design/icons'
import { Form, InputNumber, Radio, Switch, Tooltip } from 'antd'
import React from 'react'
import styles from './index.module.less'
import { DatePicker } from '@/components/Picker'
import type { AdvanceSettingProps } from './interface'
import { COMPOSITION_WAY, RANDOM_TEST_PAPER } from '@/components/PaperExamine/const'

const AdvanceSetting = (props: AdvanceSettingProps) => {
    const { formData } = props || {}

    const {
        composition,
        randomQuestionState,
        receiptStatus = false,
        quoteNumStatus = false,
    } = formData || {}

    return (
        <Form.Item label="高级设置" className={styles.advance}>
            <Form.Item name="randomQuestionState" noStyle>
                <Radio.Group className={styles.radio_group}>
                    <Radio value={RANDOM_TEST_PAPER.REGULAR}>
                        <span className={styles.radio_span}>固定生成考卷</span>
                        <Tooltip title="考试时，全部考生的考卷均包含本试卷全部题目">
                            <InfoCircleOutlined />
                        </Tooltip>
                    </Radio>
                    <Radio value={RANDOM_TEST_PAPER.RANDOM}>
                        <span className={styles.radio_span}>随机生成考卷</span>
                        <Tooltip title="考试时，考生的考卷将从本试卷题目中随机抽取，不同考生抽取到的题目可能不同">
                            <InfoCircleOutlined />
                        </Tooltip>
                    </Radio>
                </Radio.Group>
            </Form.Item>
            {randomQuestionState === RANDOM_TEST_PAPER.RANDOM && (
                <Form.Item label="随机抽取的试题数" className={styles.input_question} required>
                    <Form.Item name="randomQuestionNum" noStyle>
                        <InputNumber
                            placeholder="请输入"
                            min={0}
                            // @ts-ignore
                            formatter={value => value && parseInt(value)}
                        />
                    </Form.Item>
                    <span className={styles.add_margin}>题</span>
                </Form.Item>
            )}
            <Form.Item
                label="试卷题目乱序"
                name="chaosOrderState"
                valuePropName="checked"
                colon={false}
                className={styles.switch_box}
            >
                <Switch />
            </Form.Item>
            <Form.Item
                label="题目选项乱序"
                name="chaosOptionsState"
                valuePropName="checked"
                colon={false}
                className={styles.switch_box}
            >
                <Switch />
            </Form.Item>
            <Form.Item
                label="整卷序号连续"
                name="numContinuousState"
                valuePropName="checked"
                colon={false}
                className={styles.switch_box}
            >
                <Switch />
            </Form.Item>
            {composition !== COMPOSITION_WAY.FROM_FILE && (
                <>
                    <Form.Item
                        label="限制试题入库时间"
                        name="receiptStatus"
                        valuePropName="checked"
                        colon={false}
                        className={styles.switch_box}
                    >
                        <Switch />
                    </Form.Item>
                    {receiptStatus && (
                        <Form.Item label="选择日期范围" className={styles.input_question} required>
                            <Form.Item name="receiptStartTime" noStyle>
                                <DatePicker />
                            </Form.Item>
                            <span className={styles.add_margin}>至</span>
                            <Form.Item name="receiptEndTime" noStyle>
                                <DatePicker />
                            </Form.Item>
                        </Form.Item>
                    )}
                    <Form.Item
                        label="限制试题引用次数"
                        name="quoteNumStatus"
                        valuePropName="checked"
                        colon={false}
                        className={styles.switch_box}
                    >
                        <Switch />
                    </Form.Item>
                    {quoteNumStatus && (
                        <Form.Item
                            label="引用次数不超过"
                            className={styles.input_question}
                            required
                        >
                            <Form.Item name="questionCitedLimit" noStyle>
                                <InputNumber
                                    placeholder="请输入"
                                    min={0}
                                    // @ts-ignore
                                    formatter={value => value && parseInt(value)}
                                />
                            </Form.Item>
                            <span className={styles.add_margin}>次</span>
                        </Form.Item>
                    )}
                </>
            )}
        </Form.Item>
    )
}

export default AdvanceSetting
