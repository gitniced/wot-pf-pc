import { Form, Input, Image } from 'antd'
import styles from '../../index.module.less'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { findConfigValueToBoolean, getDecodeInfo, YsfService } from '@wotu/wotu-components'
import React from 'react'
import { observer } from 'mobx-react'
import { CERTIFICATE_TYPE, CERTIFICATE_TYPE_VALUE } from '../../const'
import type { BaseFormItemType } from '@/pages/bind/interface'
import validateRule from '@/components/Global/ValidateRule'

const BaseFormItem = ({
    nameValue = 'name',
    nameLabel = '姓名',
    codeValue = 'code',
    idCardInfo = {},
    hideName = false,
    isValidateIdCard = false,
    showCertificateType = false,
    userData = {},
    siteData = {},
    showServer = true,
    hasIdRule = false,
}: BaseFormItemType) => {
    let { name = '', idCardNo = '', idCardImg = '', certificateType } = idCardInfo || {}
    // 证件类型可能为0，默认为身份证
    certificateType = Number(certificateType) || CERTIFICATE_TYPE.IDCARD
    // 证件类型不在枚举范围内默认为其他证件（创培证件类型为4）
    let certificateTypeValue =
        CERTIFICATE_TYPE_VALUE?.[certificateType] || CERTIFICATE_TYPE_VALUE[CERTIFICATE_TYPE.OTHER]
    // 站点是否打开客服按钮
    let siteShowServer = findConfigValueToBoolean(siteData, 'enable_customer_service')
    let showItemValue = Boolean(idCardNo && name) || isValidateIdCard

    const requireRule = { required: !showItemValue, message: '请输入证件号码' }

    // 身份证校验规则
    let idCardRule = hasIdRule
        ? [
              validateRule({
                  noEmpty: true,
                  rule: 'IDCARD',
                  noEmptyMessage: '请输入证件号码',
                  message: '证件号码格式错误',
              }),
          ]
        : [requireRule]
    return (
        <>
            {showCertificateType && (
                <Form.Item label="证件类型">
                    <div className={styles.infoValue}>{certificateTypeValue}</div>
                </Form.Item>
            )}
            {!hideName && (
                <Form.Item
                    label={nameLabel}
                    name={nameValue}
                    rules={[
                        {
                            required: !showItemValue,
                            message: '请输入姓名',
                        },
                        {
                            max: 25,
                            message: '最多只能输入25个字符',
                        },
                    ]}
                >
                    {showItemValue ? (
                        <div className={styles.infoValue}>{getDecodeInfo(name, '1') || '-'}</div>
                    ) : (
                        <Input placeholder="请输入姓名" maxLength={25} />
                    )}
                </Form.Item>
            )}
            <Form.Item label="证件号码" name={codeValue} rules={idCardRule} required={hasIdRule}>
                {showItemValue ? (
                    showServer && siteShowServer ? (
                        <div className={styles.message}>
                            <div className={styles.message_info}>
                                请上传您本人的证件照片（{getDecodeInfo(idCardNo, '4')}）
                            </div>
                            <YsfService userDate={userData} siteData={siteData}>
                                <span className={styles.message_extra}>
                                    <QuestionCircleOutlined />
                                    &nbsp;这不是我的证件
                                </span>
                            </YsfService>
                        </div>
                    ) : (
                        <div className={styles.infoValue}>
                            {getDecodeInfo(idCardNo, '4') || '-'}
                        </div>
                    )
                ) : (
                    <Input placeholder="请输入证件号码" maxLength={25} />
                )}
            </Form.Item>

            {idCardImg ? (
                <div>
                    <Form.Item label="证件图片">
                        <Image className={styles.show_img} src={idCardImg} />
                    </Form.Item>
                </div>
            ) : null}
        </>
    )
}
export default observer(BaseFormItem)
