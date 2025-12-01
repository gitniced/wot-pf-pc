import { Form, Input, Modal } from 'antd'
// import { getCookie } from '@/storage'
// import http from '@/servers/http'
// import api from '../../api'
import { FOOTER_LINK_TYPE } from '../../const'
/**  链接modal  */
export function LinkModal(props) {
    // let { flag } = props || {}
    /** modal title  */
    const titleFc = () => {
        if (props.flag === FOOTER_LINK_TYPE.NAV_LINK) {
            return props.checkItem ? '编辑导航' : '添加导航'
        } else {
            return props.checkItem ? '编辑友情链接' : '添加友情链接'
        }
    }

    // **  添加编辑链接校验名称是否重复  */
    // const checkFooterLink = (title?: string) => {
    //     if (!title) return
    //     let organizationCode = getCookie('SELECT_ORG_CODE')
    //     return http(api.checkFooterLink, 'post', { organizationCode, title, type: flag })
    // }

    return (
        <Modal
            open={props.isModalOpen}
            title={titleFc()}
            onCancel={() => props.closeModel()}
            onOk={props.addLinks}
            maskClosable={false}
            centered
        >
            <Form
                form={props.form}
                labelCol={{
                    span: 6,
                }}
                validateTrigger={['onBlur']}
            >
                <Form.Item
                    label="名称"
                    name="title"
                    required
                    rules={[
                        {
                            required: true,
                            message: '请输入名称',
                            whitespace: true,
                        },
                        // () => ({
                        //     async validator(_, title: string) {
                        //         let noRepeat: boolean = checkFooterLink(title)
                        //         // 没有重复
                        //         if (noRepeat) {
                        //             return Promise.resolve()
                        //         } else {
                        //             return Promise.reject(
                        //                 new Error('链接名称已存在，请重新输入'),
                        //             )

                        //         }

                        //     },
                        // }),
                    ]}
                >
                    <Input
                        placeholder="请输入"
                        maxLength={props.flag === FOOTER_LINK_TYPE.NAV_LINK ? 10 : 50}
                        showCount
                    />
                </Form.Item>
                {props.flag === FOOTER_LINK_TYPE.NAV_LINK ? null : (
                    <Form.Item
                        label="跳转链接"
                        name="link"
                        required
                        rules={[
                            {
                                required: true,
                                message: '请输入跳转链接',
                                whitespace: true,
                            },
                            {
                                pattern: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                                message: '请输入正确的链接地址',
                            },
                        ]}
                    >
                        <Input placeholder="请输入" />
                    </Form.Item>
                )}
            </Form>
        </Modal>
    )
}
