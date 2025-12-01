// 手动录题通用选项块
import { useState, useEffect } from 'react'
import { Cascader, Form } from 'antd'
import ProfessionCascade from '@/components/ProfessionCascade'
import DropdownBox from '@/components/DropdownBox'
import type { DefaultOptionType } from 'antd/lib/select'
import { BELONG_TYPE_ENUM, SKILL_TYPE_ENUM, SUBJECT_TYPE_ENUM } from '@/constants'
import { useLocalObservable } from 'mobx-react-lite'
import QuestionTypesStore from './store'
import { observer } from 'mobx-react'
import { getLocalStorage } from '@/storage'
// @ts-ignore
import { history } from 'umi'
import useUserStore from '@/hooks/useUserStore'
import styles from './index.modules.less'

const Index = ({ initValue, form, subject }: any) => {
    const userStore = useUserStore()

    const { code } = history.location.query as { code?: string }

    const store = useLocalObservable(() => QuestionTypesStore)

    const [isShow, setIsShow] = useState<boolean>(false)
    const [commonJobCode, setCommonJobCode] = useState(-1)

    // 是否是真题
    const isReal = subject === SUBJECT_TYPE_ENUM.REAL
    // 是否是编辑页面
    const isEditPage = Boolean(code)

    useEffect(() => {
        initValue.commonJob?.at?.(-1) && setCommonJobCode(initValue.commonJob.at(-1)?.value || -1)

        setIsShow(!!initValue.authenticatePoint?.[0] && isReal)
    }, [initValue])

    // 获取分类
    useEffect(() => {
        store
            .getKnowledgeList({
                subject,
                skill: SKILL_TYPE_ENUM.THEORY,
                belongType: BELONG_TYPE_ENUM.MERCHANT,
                organizationCode: userStore?.selectedOrganization || userStore?.defaultOrganization,
                sid: getLocalStorage('SID'),
            })
            .then(() => {
                const initKnowledge = store.knowledgeList[0]
                if (initKnowledge) {
                    // 新建或者没有分类的情况下选中未分类
                    if (!isEditPage) {
                        form.setFieldValue('knowledgePointCode', initKnowledge.value)
                    }

                    if (isEditPage && !initValue.knowledgePointCode.length) {
                        form.setFieldValue('knowledgePointCode', initKnowledge.value)
                    }
                }
            })
    }, [initValue])

    return (
        <div className={styles.component_search_form}>
            <Form.Item
                label="职业/工种/等级"
                name="commonJob"
                rules={[{ required: true, message: '请选择职业/工种/等级' }]}
            >
                <ProfessionCascade
                    type="JOB"
                    changeOnSelect={false}
                    onChange={(selectOptionList: DefaultOptionType[]) => {
                        const [work, type, level] = selectOptionList
                        level?.value && setCommonJobCode(level.value as number)

                        form.setFieldsValue({ authenticatePoint: undefined })
                        setIsShow(false)
                    }}
                    style={{ width: '220px' }}
                />
            </Form.Item>
            {isReal && (
                <Form.Item
                    label="鉴定点"
                    name="authenticatePoint"
                    rules={[
                        {
                            message: '必须选择到某一个鉴定点',
                            validator(_, value) {
                                if (value?.length) {
                                    if (value?.length >= 5) {
                                        return Promise.resolve()
                                    } else {
                                        return Promise.reject()
                                    }
                                }
                                return Promise.resolve()
                            },
                        },
                    ]}
                >
                    <ProfessionCascade
                        changeOnSelect
                        key={commonJobCode}
                        type="Authenticate"
                        commonJobCode={commonJobCode}
                        onDropdownVisibleChange={e => {
                            if (!e && form.getFieldValue('authenticatePoint')?.length < 5) {
                                form.resetFields(['authenticatePoint'])
                            }
                        }}
                        onChange={e => {
                            form.setFieldsValue({
                                discrimination: 30,
                            })
                            setIsShow(e?.length >= 5)
                        }}
                    />
                </Form.Item>
            )}

            {isShow && (
                <Form.Item
                    label="区分度"
                    name="discrimination"
                    shouldUpdate={(prevValues, currentValues) =>
                        prevValues.authenticatePoint !== currentValues.authenticatePoint
                    }
                    rules={[{ required: true, message: '请选择区分度' }]}
                >
                    <DropdownBox type="discrimination" />
                </Form.Item>
            )}

            {/* 分类 */}
            <Form.Item
                name="knowledgePointCode"
                label="分类"
                rules={[
                    {
                        required: true,
                        message: '请选择分类',
                    },
                ]}
            >
                <Cascader
                    changeOnSelect
                    allowClear={false}
                    placeholder="请选择"
                    options={store.knowledgeList}
                    onChange={(value: (string | number)[], selectedOptions: any) => {
                        const lastSelectedOption = selectedOptions[selectedOptions.length - 1]

                        store.setSelectKnowledge({
                            code: lastSelectedOption?.value,
                            levelCode: lastSelectedOption?.levelCode,
                            codeList: value,
                        })
                    }}
                />
            </Form.Item>
            {/* </Col> */}

            {/* <Col id="theoryEditLevel"> */}
            <Form.Item
                label="难易程度"
                name="level"
                rules={[{ required: true, message: '请选择难易程度' }]}
            >
                <DropdownBox type="questionLevel" />
            </Form.Item>
            {/* </Col> */}

            {/* <Col id="theoryEditWorkLevel"> */}
            <Form.Item
                label="题型"
                name="workLevel"
                rules={[{ required: true, message: '请选择题型' }]}
            >
                <DropdownBox type="questionType" />
            </Form.Item>
            {/* </Col> */}
            {/* </Row> */}
        </div>
    )
}

export default observer(Index)
