import { observer } from 'mobx-react'
import styles from '../../index.module.less'
import { Form, Image, Input, Row } from 'antd'
import { CERTIFICATE_TYPE } from '../../const'
import CustomUpload from '@/pages/bind/components/CustomUpload'
import { toJS } from 'mobx'


// 基础展示项
const IdCardImageItem = ({
    certificateType,
    form,
    idCardImageList,
    addImage,
    removeImage

}: {
    certificateType: CERTIFICATE_TYPE
    form: unknown
    idCardImageList: any
    addImage: () => void
    removeImage: () => void

}) => {
    console.log('idCardImageList', toJS(idCardImageList))
    // 身份证的证件图片校验 需要两张证件照片
    const IdCardImageRule = () => {

        const ERROR_ENUM = {
            front: ['请先上传身份证正面照片'],
            back: ['请先上传身份证背面照片'],
        }
        let errStr = ''
        Object.keys(idCardImageList).some(key => {
            if (idCardImageList[key] === undefined || !idCardImageList[key]?.length) {
                errStr = ERROR_ENUM[key]
                return true
            }
        })
        if (errStr) {
            return Promise.reject(new Error(errStr))
        } else {
            return Promise.resolve()
        }

    }
    // 护照和其他类型的证件图片校验 只需要一张证件照片
    const otherImageRule = () => {

        return {
            validator: () => {


                if (idCardImageList?.front?.length) {
                    return Promise.resolve()
                } else {
                    return Promise.reject(new Error('请先上传证件照片'))
                }
            },
        }



    }

    return (<>
        {
            certificateType === CERTIFICATE_TYPE.IDCARD ? (
                <Form.Item

                    label="证件照片"
                    name={'idcardImage'}
                    rules={[
                        {
                            validator: IdCardImageRule
                        },
                    ]}
                >
                    <Form.Item noStyle name={'front'}>
                        <Row className={styles.front_avatar}>
                            <CustomUpload
                                customKey={'front'}
                                customText={'上传人像面照片'}
                                className={styles.avatar_upload}
                                btnClassName={styles.upload_btn}
                                value={idCardImageList.front || []}
                                addImage={addImage}
                                removeImage={({ image, key }) => {
                                    form.setFieldsValue({ front: undefined })
                                    removeImage({ image, key })
                                }}
                            />

                            <div className={styles.font_exam}>
                                <div className={styles.img} />
                            </div>

                        </Row>
                    </Form.Item>
                    <Form.Item noStyle name={'back'}>
                        <Row>

                            <CustomUpload
                                customKey={'back'}
                                customText={'上传国徽面照片'}
                                className={styles.avatar_upload}
                                btnClassName={styles.upload_btn}
                                value={idCardImageList.back || []}
                                addImage={addImage}
                                removeImage={({ image, key }) => {
                                    form.setFieldsValue({ back: undefined })
                                    removeImage({ image, key })
                                }}
                            />

                            <div className={styles.back_exam}>
                                <div className={styles.img} />
                            </div>

                        </Row>
                    </Form.Item>
                </Form.Item>
            ) : (
                <Form.Item
                    label="证件照片"
                    name={'passportImage'}
                    required
                    rules={[otherImageRule]}
                >

                    <CustomUpload
                        customKey={'front'}
                        customText={certificateType === CERTIFICATE_TYPE.PASSPORT ? '上传护照照片' : '上传证件照片'}
                        className={styles.avatar_upload_passport}
                        btnClassName={styles.upload_btn_passport}
                        value={idCardImageList.front || []}
                        addImage={addImage}
                        removeImage={({ image, key }) => {
                            form.setFieldsValue({ front: undefined })
                            removeImage({ image, key })
                        }}
                    />

                    <Image
                        className={styles.passport_exam}
                        src={
                            'https://static.zpimg.cn/public/fe_user_pc/images/passport_example.jpg'
                        }
                    />

                </Form.Item>
            )
        }
        {
            certificateType === CERTIFICATE_TYPE.OTHER && (
                <Form.Item label="补充说明" name={'remark'}>
                    <Input.TextArea
                        autoSize={{ minRows: 4, maxRows: 4 }}
                        maxLength={50}
                        showCount
                        placeholder='请输入补充说明'
                    />
                </Form.Item>
            )
        }
    </>)
}


export default observer(IdCardImageItem)