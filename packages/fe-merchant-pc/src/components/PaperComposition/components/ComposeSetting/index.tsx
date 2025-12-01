import { Button, Form, InputNumber, Radio, Select, Table, Upload } from 'antd'
import React from 'react'
import Hooks from './hooks'
import { ComposeType, TypeOptions, decimalCheck } from './const'
import styles from './index.module.less'
import getColumns from './getColumns'
import type { ComposeSettingProps } from './interface'
import Summary from '../Summary'
import { UploadOutlined } from '@ant-design/icons'
import ImportFile from '../ImportFile'
import {
    COMPOSITION_WAY,
    CREATE_VOLUME_LIBRARY_TYPE,
    QUESTION_STRUCTURE_TYPE,
    SCORE_SETTING_TYPE,
} from '@/components/PaperExamine/const'
/**
 * 组卷设置
 * @param props {
 *  type: 新建类型 template-组卷、examine_create-试卷
 *  form: form表单实例
 *  formData: 表单数据
 *  setFormData: 修改表单数据方法
 * }
 * @returns
 */
const ComposeSetting = (props: ComposeSettingProps) => {
    const { type, formData } = props || {}
    const hooks = Hooks(props)
    const {
        composition,
        fromFileCode,
        fromFileTitle,
        scoreType,
        questionStructure,
        questionConfigList = [],
        questionTableData = [],
        templateTableList = [],
    } = formData || {}
    // 题型结构：组卷模板时使用templateTableList，新建试卷时使用questionTableData

    return (
        <div className={styles.composition}>
            <Form.Item label="组卷方式" required>
                <Form.Item name="composition" noStyle>
                    <Radio.Group className={styles.radio_group}>
                        <Radio value={COMPOSITION_WAY.AUTHENTICATE}>按鉴定点组卷</Radio>
                        <Radio value={COMPOSITION_WAY.QUESTION_TYPE}>按题型组卷</Radio>
                        {/* 新建类型是组卷模板时展示此项 */}
                        {type !== CREATE_VOLUME_LIBRARY_TYPE.COMPOSITION && (
                            <Radio value={COMPOSITION_WAY.FROM_FILE}>套题组卷</Radio>
                        )}
                    </Radio.Group>
                </Form.Item>
                <p className={`${styles.extra} ${styles.pdt_8}`}>
                    {ComposeType[composition]?.extra}
                </p>
            </Form.Item>
            {/* 组卷方式为鉴定点组卷展示此项 */}
            {composition === COMPOSITION_WAY.AUTHENTICATE && (
                <Form.Item
                    label="要素细目表"
                    name="authenticateCode"
                    required
                    className={styles.pdt_8}
                >
                    <Select
                        placeholder="请选择"
                        fieldNames={{ label: 'name', value: 'code' }}
                        options={hooks.authenticateOptions}
                    />
                </Form.Item>
            )}
            {/* 组卷方式为套题组卷展示此项 */}
            {composition === COMPOSITION_WAY.FROM_FILE && (
                <Form.Item label="Excel套题" required className={styles.pdt_8}>
                    {fromFileCode ? (
                        <Upload
                            listType="text"
                            fileList={
                                fromFileCode ? [{ uid: fromFileCode, name: fromFileTitle }] : []
                            }
                            onRemove={hooks.onRemove}
                        />
                    ) : (
                        <Button icon={<UploadOutlined />} onClick={hooks.openModal}>
                            导入文件
                        </Button>
                    )}
                </Form.Item>
            )}
            {/* 组卷方式为套题组卷时需要有套题组卷code才展示 */}
            {(composition !== COMPOSITION_WAY.FROM_FILE || fromFileCode) && (
                <>
                    <Form.Item label="分值设置" name="scoreType" required className={styles.pdt_8}>
                        <Radio.Group>
                            <Radio value={SCORE_SETTING_TYPE.QUESTION_TYPE}>按题型设置</Radio>
                            <Radio value={SCORE_SETTING_TYPE.SINGLE}>单题独立设置</Radio>
                            <Radio value={SCORE_SETTING_TYPE.UNIFICATION}>统一分值</Radio>
                        </Radio.Group>
                    </Form.Item>
                    {/* 分值设置为统一分值时展示此项 */}
                    {scoreType === SCORE_SETTING_TYPE.UNIFICATION && (
                        <Form.Item label="单题统一分值" required className={styles.pdt_8}>
                            <Form.Item name="unificationScore" noStyle>
                                <InputNumber
                                    placeholder="请输入"
                                    min={0}
                                    // @ts-ignore
                                    formatter={decimalCheck}
                                    parser={decimalCheck}
                                />
                            </Form.Item>
                            <span className={styles.add_margin}>分</span>
                        </Form.Item>
                    )}
                    <Form.Item label="合格线" required className={styles.pdt_8}>
                        <Form.Item name="qualifiedProp" noStyle>
                            <InputNumber
                                placeholder="请输入"
                                min={0}
                                max={100}
                                // @ts-ignore
                                formatter={value => value && parseInt(value)}
                            />
                        </Form.Item>
                        <span className={styles.add_margin}>%</span>
                    </Form.Item>

                    <Form.Item label="题型结构" required className={styles.pdt_8}>
                        {/* 组卷方式为套题组卷时不展示此选项 */}
                        {composition !== COMPOSITION_WAY.FROM_FILE && (
                            <Form.Item name="questionStructure" noStyle>
                                <Radio.Group className={styles.radio_group}>
                                    <Radio value={QUESTION_STRUCTURE_TYPE.QUESTION_TYPE}>
                                        指定题型题数
                                    </Radio>
                                    <Radio
                                        value={QUESTION_STRUCTURE_TYPE.RULES}
                                        disabled={
                                            composition === COMPOSITION_WAY.AUTHENTICATE ||
                                            scoreType === SCORE_SETTING_TYPE.QUESTION_TYPE
                                        }
                                    >
                                        按规则随机抽取
                                    </Radio>
                                </Radio.Group>
                            </Form.Item>
                        )}
                        {/* 套题组卷和(分值设置为非按题型设置)时不展示 */}
                        {(composition === COMPOSITION_WAY.AUTHENTICATE ||
                            (composition !== COMPOSITION_WAY.FROM_FILE &&
                                scoreType === SCORE_SETTING_TYPE.QUESTION_TYPE)) && (
                            <p className={styles.extra}>
                                选择【
                                {composition === COMPOSITION_WAY.AUTHENTICATE
                                    ? '按鉴定点组卷'
                                    : '按题型设置分值'}
                                】时，不支持【按规则随机抽取】试题
                            </p>
                        )}
                        {/* 套题组卷和题型结构选择(指定题型题数)时展示 */}
                        {(composition === COMPOSITION_WAY.FROM_FILE ||
                            questionStructure === QUESTION_STRUCTURE_TYPE.QUESTION_TYPE) && (
                            <Table
                                rowKey={'questionType'}
                                columns={getColumns({
                                    type,
                                    composition,
                                    scoreType,
                                    inputChange: hooks.inputChange,
                                    templateInputChange: hooks.templateInputChange,
                                })}
                                dataSource={
                                    type !== CREATE_VOLUME_LIBRARY_TYPE.COMPOSITION
                                        ? questionTableData
                                        : templateTableList
                                }
                                className={styles.table}
                                bordered
                                pagination={false}
                                summary={
                                    questionTableData?.length > 0 || templateTableList?.length > 0
                                        ? (pageData: any) => (
                                              <Summary scoreType={scoreType} pageData={pageData} />
                                          )
                                        : undefined
                                }
                            />
                        )}
                    </Form.Item>
                    {/* 题型结构选择(按规则随机抽取)时展示 */}
                    {questionStructure === QUESTION_STRUCTURE_TYPE.RULES && (
                        <Form.Item label="规则设置" required className={styles.pdt_8}>
                            <Select
                                placeholder="请选择可抽题型"
                                value={questionConfigList.map(item => item.questionType)}
                                options={TypeOptions}
                                mode="multiple"
                                onChange={hooks.extractChange}
                            />
                            <div className={styles.mgt_24}>
                                <span>以上勾选题型至少抽取</span>
                                <Form.Item name="questionTypeLeast" noStyle>
                                    <InputNumber
                                        className={styles.add_margin}
                                        placeholder="请输入"
                                        min={0}
                                        // @ts-ignore
                                        formatter={value => value && parseInt(value)}
                                    />
                                </Form.Item>
                                <span>种，总题数至少</span>
                                <Form.Item name="questionTotal" noStyle>
                                    <InputNumber
                                        className={styles.add_margin}
                                        placeholder="请输入"
                                        min={0}
                                        // @ts-ignore
                                        formatter={value => value && parseInt(value)}
                                    />
                                </Form.Item>
                                <span>题</span>
                            </div>
                        </Form.Item>
                    )}
                </>
            )}
            {hooks.importVisible && (
                <ImportFile visible={hooks.importVisible} handleCancel={hooks.closeModal} />
            )}
        </div>
    )
}

export default ComposeSetting
