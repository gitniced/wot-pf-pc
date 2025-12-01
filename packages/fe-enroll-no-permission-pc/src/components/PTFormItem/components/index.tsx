import React from 'react'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import {
    Input,
    InputNumber,
    Radio,
    Select,
    DatePicker,
    TimePicker,
    Cascader,
    Button,
    Space,
    Checkbox,
} from 'antd'
import { FORM_ITEM_TYPE } from '../const'
import GlobalUpload from './GlobalUpload'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons'
import IDPhoto from './IDPhoto'

const GetFormItemMap = ({ type, params }: any) => {
    const { name, alias } = params || {}
    const getAsyncCom = (data: any) => {
        // const deepParams = cloneDeep(data)
        if (name === '申报条件') {
            return (
                <Radio.Group
                    name={data.alias}
                    {...data}
                    style={{ display: 'flex', flexDirection: 'column' }}
                />
            )
        } else {
            const isDisabled = () => {
                if (data.alias === 'TYPE_OF_CERTIFICATE_COMMON') {
                    return data.value ? true : false
                }
            }

            return <Radio.Group name={data.alias} {...data} disabled={isDisabled()} />
        }
    }
    const isNumberDisabled = () => {
        return params.disabled
    }

    console.log('🍊  params:', params)
    const FormItemMap = {
        [FORM_ITEM_TYPE.INPUT]: (
            <Input
                {...params}
                maxLength={params?.rule?.max ? params?.rule?.max : undefined}
                disabled={isNumberDisabled()}
            />
        ),
        [FORM_ITEM_TYPE.INPUT_NUMBER]: <InputNumber {...params} />,
        [FORM_ITEM_TYPE.TEXTAREA]: (
            <Input.TextArea
                {...params}
                maxLength={params?.rule?.max ? params?.rule?.max : undefined}
                rows={5}
                style={{ resize: 'none' }}
            />
        ),
        [FORM_ITEM_TYPE.SELECT]: <Select {...params} />,
        [FORM_ITEM_TYPE.RADIO_GROUP]: getAsyncCom(params),
        [FORM_ITEM_TYPE.DATEPICKER]: <DatePicker locale={locale} {...params} />,
        [FORM_ITEM_TYPE.TIMEPICKER]: <TimePicker locale={locale} {...params} />,
        [FORM_ITEM_TYPE.CITY_CASCADER]: <Cascader {...params} />,
        [FORM_ITEM_TYPE.ID_PHOTO]: <IDPhoto {...params} />,
        [FORM_ITEM_TYPE.FILE_UPLOAD]: (
            <GlobalUpload
                amount={params?.rule?.max || 1}
                size={params?.rule?.maxSize || 9999}
                drag={false}
                type={3}
                {...params}
            >
                <Button icon={<UploadOutlined />}>上传附件</Button>
            </GlobalUpload>
        ),
        [FORM_ITEM_TYPE.IMAGE_UPLOAD]: (
            <GlobalUpload
                amount={params?.rule?.max || 1}
                otherProps={{
                    listType: 'picture-card',
                }}
                drag={false}
                size={params?.rule?.maxSize || 1}
                type={11}
                accept={alias === 'CERTIFICATE_PHOTO' ? 'normal' : 'image'}
                {...params}
            >
                <Space direction="vertical" size={8}>
                    <PlusOutlined />
                    {params.placeholder ? params.placeholder : '电子照片'}
                </Space>
            </GlobalUpload>
        ),
        [FORM_ITEM_TYPE.MULTI_SELECT]: <Select {...params} mode="multiple" />,
        [FORM_ITEM_TYPE.MULTI_CHOICE]: <Checkbox.Group {...params} />,
        [FORM_ITEM_TYPE.LINK]: <Input type="url" {...params} />,
    }
    return FormItemMap[type] || null
}

export default GetFormItemMap
