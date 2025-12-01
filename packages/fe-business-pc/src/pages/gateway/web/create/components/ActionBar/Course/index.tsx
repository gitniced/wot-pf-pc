import React, { useEffect, useState } from 'react'
import { useLocalObservable } from 'mobx-react'
import { getViewStore } from './../../../store'
import { getViewStore as getPCViewStore } from '@/pages/gateway/pc-web/create/store'
import type { PreviewItem } from '../../../../../components/utils/interface'
import styles from './index.module.less'
import { Form, Radio, InputNumber } from 'antd'
import classnames from 'classnames'
import AddByLesson from '@/pages/gateway/components/Course/addByLesson'
import {
    ADD_TYPE_ENUM,
    ADD_TYPE_OPTIONS,
    LAYOUT_OPTIONS,
    PC_LAYOUT_OPTIONS,
    PC_LAYOUT_ENUM,
    MOBILE_LAYOUT_ENUM,
    SHOW_TYPE_OPTIONS,
    SHOW_TYPE_ENUM,
} from './const'
import AddJobLesson from '../../../../components/AddJobLesson'
import SetMicroComponentStyle from '@/pages/gateway/components/SetMicroComponentStyle'
import DefaultLesson from '@/pages/gateway/components/Course/defaultLesson'
import LessonGroup from '@/pages/gateway/components/Course/LessonGroup'

function Course(props: { data: PreviewItem; type: 'pc' | 'h5' }) {
    const { data, type = 'h5' } = props
    // 获取全局唯一的store
    const stores = useLocalObservable(() => (type === 'h5' ? getViewStore() : getPCViewStore()))

    const [form] = Form.useForm()

    const [addonAfter, setAddonAfter] = useState('行')
    const [minChowCount, setMinChowCount] = useState(1)
    const [maxChowCount, setMaxChowCount] = useState(4)

    const onValuesChange = (changedValues: object, allValues: Record<string, any>) => {
        let codes: string[] = []
        let { lessonContent, lessonGroup, showType = 'single' } = allValues || {}
        if (showType === 'single') {
            if (lessonContent?.length) {
                lessonContent.map((item: any) => {
                    item?.id && codes.push(item.id)
                })
            }
        } else {
            if (lessonGroup?.length) {
                lessonGroup.map((item: any) => {
                    item?.id && codes.push(item.id)
                })
            }
        }

        // delete allValues.lessonContent

        allValues.codes = codes

        if (Object.keys(changedValues)[0] === 'rule') {
            allValues.codes = []
            allValues.lessonContent = []
            if (Object.values(changedValues)[0] === ADD_TYPE_ENUM.BY_LESSON) {
                allValues.selectCategory = []
            }
        }

        if (allValues.selectCategory && allValues.selectCategory.length > 0) {
            allValues.codes = allValues.selectCategory.flatMap((item: any) => item.courseIds)
        }

        stores.fixPreviewList({
            ...data,
            ...allValues,
        })
    }

    const onLayoutChange = (e: Event) => {
        // 横向滑动
        if (e?.target?.value === MOBILE_LAYOUT_ENUM.INFINITY) {
            setAddonAfter('个')
            setMinChowCount(4)
            setMaxChowCount(10)
        } else {
            setAddonAfter('行')
            setMinChowCount(1)
            setMaxChowCount(4)
        }
    }

    useEffect(() => {
        form?.setFieldsValue(data)
        onLayoutChange({ target: { value: data.layoutStyle } })
    }, [data])

    // 更新表单中单个元素
    const updatePreviewList = (obj: object) => {
        console.log('!!!!!obj', obj)
        stores.fixPreviewList({
            ...data,
            ...form.getFieldsValue(true),
            ...obj,
            courseList: obj?.lessonContent || [],
        })
    }

    return (
        <div className={styles.page}>
            <div className={styles.title}>课程</div>
            <div className={styles.main}>
                <Form
                    form={form}
                    layout="vertical"
                    colon={true}
                    initialValues={{
                        showLine: type === 'h5' ? 6 : 2,
                        layoutStyle:
                            type === 'h5' ? MOBILE_LAYOUT_ENUM.LIST : PC_LAYOUT_ENUM.VERTICAL_FIVE,
                        showType: 'single',
                    }}
                    requiredMark={true}
                    onValuesChange={onValuesChange}
                >
                    <div className={styles.main_title}>展示样式</div>
                    <div className={styles.radios}>
                        <Form.Item name="layoutStyle" noStyle rules={[{ required: true }]}>
                            <Radio.Group
                                defaultValue="a"
                                buttonStyle="solid"
                                className={type === 'h5' ? styles.radio_list : styles.radio_list_pc}
                                onChange={onLayoutChange}
                            >
                                {type === 'h5'
                                    ? LAYOUT_OPTIONS.map(item => {
                                          let { icon, value, label } = item
                                          return (
                                              <Radio.Button
                                                  key={value}
                                                  value={value}
                                                  className={styles.btn}
                                              >
                                                  {
                                                      <div
                                                          className={classnames(
                                                              'radio_box',
                                                              styles.radio_box,
                                                          )}
                                                      >
                                                          <div
                                                              className={classnames(
                                                                  'radio_icon',
                                                                  styles.radio_icon,
                                                              )}
                                                          >
                                                              <svg
                                                                  className={classnames(
                                                                      'icon',
                                                                      styles.icon,
                                                                  )}
                                                                  aria-hidden="true"
                                                              >
                                                                  <use xlinkHref={`#${icon}`} />
                                                              </svg>
                                                          </div>
                                                          <div
                                                              className={classnames(
                                                                  'radio_text',
                                                                  styles.radio_text,
                                                              )}
                                                          >
                                                              {label}
                                                          </div>
                                                      </div>
                                                  }
                                              </Radio.Button>
                                          )
                                      })
                                    : PC_LAYOUT_OPTIONS.map(item => {
                                          let { icon, value, label } = item
                                          return (
                                              <Radio.Button
                                                  key={value}
                                                  value={value}
                                                  className={styles.btn}
                                              >
                                                  {
                                                      <>
                                                          <div
                                                              className={classnames(
                                                                  'radio_icon',
                                                                  styles.radio_icon,
                                                              )}
                                                          >
                                                              <svg
                                                                  className={classnames(
                                                                      'icon',
                                                                      styles.icon,
                                                                  )}
                                                                  aria-hidden="true"
                                                              >
                                                                  <use xlinkHref={`#${icon}`} />
                                                              </svg>
                                                          </div>
                                                          <div
                                                              className={classnames(
                                                                  'radio_text',
                                                                  styles.radio_text,
                                                              )}
                                                          >
                                                              {label}
                                                          </div>
                                                      </>
                                                  }
                                              </Radio.Button>
                                          )
                                      })}
                            </Radio.Group>
                        </Form.Item>
                    </div>
                    <div className={styles.line} />

                    {type === 'pc' ? (
                        <>
                            <Form.Item name="showType" label="展示内容" className={styles.rule}>
                                <Radio.Group options={SHOW_TYPE_OPTIONS} />
                            </Form.Item>
                            <div className={styles.line} />
                        </>
                    ) : null}

                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) =>
                            prevValues?.showType !== currentValues?.showType ||
                            prevValues?.rule !== currentValues?.rule
                        }
                    >
                        {({ getFieldValue }) => {
                            let showType = getFieldValue('showType')
                            return (
                                <div className={styles.rule_content}>
                                    {showType === SHOW_TYPE_ENUM.SINGLE && (
                                        <>
                                            <Form.Item
                                                name="rule"
                                                label="添加方式"
                                                className={styles.rule}
                                            >
                                                <Radio.Group options={ADD_TYPE_OPTIONS} />
                                            </Form.Item>

                                            <Form.Item
                                                noStyle
                                                shouldUpdate={(prevValues, currentValues) =>
                                                    prevValues?.rule !== currentValues?.rule
                                                }
                                            >
                                                {() => {
                                                    let rule = getFieldValue('rule')
                                                    return (
                                                        <div className={styles.rule_content}>
                                                            {rule ===
                                                                ADD_TYPE_ENUM.BY_JOB_CATEGORY && (
                                                                <Form.Item
                                                                    name="selectCategory"
                                                                    rules={[{ required: true }]}
                                                                    noStyle
                                                                >
                                                                    <AddJobLesson
                                                                        updatePreviewList={
                                                                            updatePreviewList
                                                                        }
                                                                    />
                                                                </Form.Item>
                                                            )}
                                                            {rule === ADD_TYPE_ENUM.BY_LESSON && (
                                                                <>
                                                                    <Form.Item
                                                                        name="lessonContent"
                                                                        rules={[{ required: true }]}
                                                                        noStyle
                                                                    >
                                                                        <AddByLesson />
                                                                    </Form.Item>
                                                                </>
                                                            )}
                                                            {rule === ADD_TYPE_ENUM.DEFAULT ? (
                                                                <>
                                                                    <Form.Item
                                                                        name="lessonContent"
                                                                        rules={[{ required: true }]}
                                                                        noStyle
                                                                    >
                                                                        <DefaultLesson />
                                                                    </Form.Item>
                                                                </>
                                                            ) : undefined}
                                                        </div>
                                                    )
                                                }}
                                            </Form.Item>
                                            <div className={styles.line} />
                                        </>
                                    )}
                                </div>
                            )
                        }}
                    </Form.Item>

                    <div className={styles.main_title}>添加内容</div>

                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) =>
                            prevValues?.showType !== currentValues?.showType
                        }
                    >
                        {({ getFieldValue }) => {
                            let showType = getFieldValue('showType')

                            return showType === SHOW_TYPE_ENUM.GROUP && type === 'pc' ? (
                                <div className={styles.add_group}>
                                    <Form.Item
                                        label={
                                            <div className={styles.line_title}>
                                                分组设置<span>最多15个，支持拖拽排序</span>
                                            </div>
                                        }
                                        required={true}
                                        name="lessonGroup"
                                        className={[styles.show_line].join(' ')}
                                    >
                                        <LessonGroup />
                                    </Form.Item>
                                </div>
                            ) : (
                                <div className={styles.desc}>默认展示最近购买的课程</div>
                            )
                        }}
                    </Form.Item>

                    <Form.Item
                        name="showLine"
                        label="当前页展示"
                        rules={[{ required: true }]}
                        className={styles.show_line}
                    >
                        <InputNumber
                            addonBefore="最多"
                            addonAfter={addonAfter}
                            max={type === 'h5' ? maxChowCount : 4}
                            min={type === 'h5' ? minChowCount : 1}
                            precision={0}
                        />
                    </Form.Item>
                </Form>
                <SetMicroComponentStyle
                    style={{ paddingLeft: 0, paddingRight: 0 }}
                    styleData={data}
                    onStyleChange={stores.fixPreviewList}
                    mode="mobile"
                />
            </div>
        </div>
    )
}

export default Course
