import { InfoCircleOutlined } from '@ant-design/icons'
import { DatePicker, Form, InputNumber, Radio, Switch, Tooltip } from 'antd'
import React from 'react'
import styles from './index.module.less'
import type { AdvanceSettingProps } from './interface'
import { COMPOSITION_WAY, RANDOM_TEST_PAPER, RANDOM_TEST_TYPE } from '@/pages/paper-library/[type]/const'
import { SUBJECT_TYPE_ENUM } from '@/pages/question/[type]/constants'
import { getCookie } from '@/storage'

const AdvanceSetting = (props: AdvanceSettingProps) => {
    const { formData, subject } = props || {}

    const {
        composition,
        randomQuestionState,
        receiptStatus = false,
        quoteNumStatus = false,
    } = formData || {}

    return (
        <Form.Item label="高级设置" className={styles.advance}>
            {/* 职培新建/编辑试卷不显示随机生成考卷 */}
            {/* {subject !== SUBJECT_TYPE_ENUM.TRAIN && ( */}
                <Form.Item
                    name="randomQuestionState"
                    label="随机生成考卷"
                    className={styles.switch_box}
                    colon={false}
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>
            {/* )} */}
            {!!randomQuestionState && (
                <Form.Item name="randomQuestionType" className={styles.input_question}>
                    <Radio.Group className={styles.radio_group} defaultValue={RANDOM_TEST_PAPER.REGULAR}>
                        <Radio value={RANDOM_TEST_TYPE.FORM_TYPE}>
                            <span className={styles.add_margin}>从上方题型结构中随机抽取</span>
                            <Form.Item name="randomQuestionNum_0" noStyle>
                                <InputNumber
                                    placeholder="请输入"
                                    min={0}
                                    // @ts-ignore
                                    formatter={value => value && parseInt(value)}
                                />
                            </Form.Item>
                            <span className={styles.add_margin}>题</span>
                        </Radio>
                        { getCookie('ALIAS') !== "esh" && <Radio value={RANDOM_TEST_TYPE.FORM_QUESTION}>
                            <span className={styles.add_margin}>从</span>
                            <Form.Item name="randomQuestionNum_1" noStyle>
                                <InputNumber
                                    placeholder="请输入"
                                    min={0}
                                    // @ts-ignore
                                    formatter={value => value && parseInt(value)}
                                />
                            </Form.Item>
                            <span className={styles.add_margin}>题中，随机按上方题型结构抽取</span>
                        </Radio>}
                    </Radio.Group>
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
