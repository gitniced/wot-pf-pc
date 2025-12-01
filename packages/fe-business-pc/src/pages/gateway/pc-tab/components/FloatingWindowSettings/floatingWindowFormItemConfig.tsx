import { ACTION_TYPE_ENUM, NAME_TYPE_ENUM } from './const'
import styles from './index.module.less'
import { Input, Radio } from 'antd'
import GlobalUpload from '@/components/GlobalUpload'
import { PlusOutlined } from '@ant-design/icons'
import CustomLink from '@/components/CustomLink'
import { IconsChoice } from './IconsChoice'
const { TextArea } = Input

export function floatingWindowFormItemConfig(
    nameType: any,
    actionType: any,
    customLinkList: any[] = [],
) {
    return [
        {
            label: '选择图标',
            name: 'selectedIcon',
            required: true,
            rules: [
                {
                    required: true,
                    message: '请输入名称',
                    whitespace: true,
                },
            ],
            component: <IconsChoice />,
            condition: true,
        },
        {
            label: '名称',
            name: 'nameType',
            required: true,
            rules: [
                {
                    required: true,
                    message: '请选择名称',
                },
            ],
            className: styles.name_type_item,
            component: (
                <Radio.Group>
                    <Radio value={1}>显示</Radio>
                    <Radio value={2}>隐藏</Radio>
                </Radio.Group>
            ),
            condition: true,
        },
        {
            condition: nameType === NAME_TYPE_ENUM.SHOW,
            label: '',
            name: 'name',
            className: styles.name_item,
            component: <Input maxLength={4} showCount />,
        },
        {
            label: '交互',
            name: 'actionType',
            required: true,
            rules: [
                {
                    required: true,
                    message: '请选择交互',
                },
            ],
            component: (
                <Radio.Group>
                    <Radio value={1}>悬浮出现图片</Radio>
                    <Radio value={2}>悬浮出现文案</Radio>
                    <Radio value={3}>点击跳转链接</Radio>
                </Radio.Group>
            ),
            condition: true,
        },
        {
            condition: actionType === ACTION_TYPE_ENUM.IMAGE,
            label: '上传图片',
            name: 'uploadImg',
            required: true,
            rules: [
                {
                    required: true,
                    message: '请上传图片',
                },
            ],
            extra: '建议尺寸1：1，支持jpg、png、bmp、gif格式，不超过10M',
            component: (
                <GlobalUpload
                    amount={1}
                    otherProps={{
                        listType: 'picture-card',
                    }}
                    drag={false}
                    size={10}
                    type={11}
                    accept={'image'}
                    className={styles.nav_upload}
                >
                    <div className={styles.upload_placeholder}>
                        <PlusOutlined />
                        上传
                    </div>
                </GlobalUpload>
            ),
        },
        {
            condition: actionType === ACTION_TYPE_ENUM.IMAGE,
            label: '图片描述',
            name: 'uploadImgText',
            required: false,
            rules: [],
            extra: '建议尺寸1：1，支持jpg、png、bmp、gif格式，不超过10M',
            component: (
                <TextArea
                    showCount
                    maxLength={50}
                    rows={3}
                    placeholder="请输入"
                    style={{ width: '480px' }}
                />
            ),
        },
        {
            condition: actionType === ACTION_TYPE_ENUM.TEXT,
            label: '文案',
            name: 'actionText',
            required: true,
            rules: [
                {
                    required: true,
                    message: '请输入文案',
                    whitespace: true,
                },
            ],
            component: (
                <TextArea
                    showCount
                    maxLength={50}
                    rows={3}
                    placeholder="请输入"
                    style={{ width: '480px' }}
                />
            ),
        },
        {
            condition: actionType === ACTION_TYPE_ENUM.LINK,
            label: '跳转链接',
            name: 'actionCustomLink',
            required: true,
            rules: [
                {
                    required: true,
                    message: '请选择跳转链接',
                },
            ],
            component: <CustomLink type="pc" list={customLinkList} />,
        },
    ]
}
