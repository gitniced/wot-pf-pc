import React from 'react'
import { Divider, Dropdown, Space } from 'antd'
import { RightOutlined } from '@ant-design/icons'
import './index.module.less'
import type { PersonInfoProps } from './index'

const PersonInfo = (props: PersonInfoProps) => {
    return (
        <Dropdown
            overlayStyle={{ width: '272px', height: '460px' }}
            getPopupContainer={triggerNode => triggerNode.parentElement as HTMLElement}
            overlayClassName={'person_info_dropdown'}
            dropdownRender={() => {
                return (
                    <div className="person_info_dropdown_content">
                        <div className="person_info_dropdown_header">
                            {/* 头像  TODO delect */}
                            <img
                                src={props.avatar}
                                onError={e => {
                                    e.target.src = defaultAvatar
                                }}
                                alt=""
                                style={{ width: '56px', height: '56px', fill: '#FAAD14' }}
                                className="icon icon_moren no_margin"
                            />
                            {/* <svg
                style={{ width: '56px', height: '56px', fill: '#FAAD14' }}
                width={'56'}
                height={'56'}
                className="icon icon_moren"
                aria-hidden="true"
              >
                <use xlinkHref="#icon_moren"></use>
              </svg> */}

                            <div className="person_info_dropdown_header_name">{props.name}</div>
                            {/* 已认证 */}
                            {props.isAuthentication ? (
                                <div className="auth_tag certified">
                                    <svg
                                        className="icon icon_yirenzheng"
                                        viewBox="0 0 1024 1024"
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        p-id="9003"
                                        width="200"
                                        height="200"
                                    >
                                        <path
                                            d="M556.373333 87.893333c-24.32-8.96-64-8.96-88.32 0l-234.666666 87.893334c-45.226667 17.066667-81.92 69.973333-81.92 118.186666v345.6c0 34.56 22.613333 80.213333 50.346666 100.693334l234.666667 175.36c41.386667 31.146667 109.226667 31.146667 150.613333 0l234.666667-175.36c27.733333-20.906667 50.346667-66.133333 50.346667-100.693334v-345.6c0.426667-48.213333-36.266667-101.12-81.066667-118.186666l-234.666667-87.893334z m-79.36 510.293334c-6.4 6.4-14.506667 9.386667-22.613333 9.386666s-16.213333-2.986667-22.613333-9.386666l-68.266667-69.12a32.170667 32.170667 0 0 1 0-45.226667c12.373333-12.373333 32.853333-12.373333 45.226667 0l46.08 46.08 160.853333-160.853333c12.373333-12.373333 32.853333-12.373333 45.226667 0 12.373333 12.373333 12.373333 33.28-0.426667 45.653333l-183.466667 183.466667z"
                                            p-id="9004"
                                        />
                                    </svg>
                                    {/* <svg className="icon icon_yirenzheng" aria-hidden="true">
                    <use xlinkHref="#icon_yirenzheng"></use>
                  </svg> */}
                                    已认证
                                    {/* <Tag
                    color="success"
                    icon={
                      <svg className="icon icon_yirenzheng" aria-hidden="true">
                        <use xlinkHref="#icon_yirenzheng"></use>
                      </svg>
                    }
                  >
                    已认证
                  </Tag> */}
                                </div>
                            ) : (
                                <div className="auth_tag not_certified">
                                    <svg
                                        className="icon icon_weirenzheng"
                                        viewBox="0 0 1024 1024"
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        p-id="8853"
                                        width="200"
                                        height="200"
                                    >
                                        <path
                                            d="M556.373333 87.893333c-24.32-8.96-64-8.96-88.32 0l-234.666666 87.893334c-45.226667 17.066667-81.92 69.973333-81.92 118.186666v345.6c0 34.56 22.613333 80.213333 50.346666 100.693334l234.666667 175.36c41.386667 31.146667 109.226667 31.146667 150.613333 0l234.666667-175.36c27.733333-20.906667 50.346667-66.133333 50.346667-100.693334v-345.6c0.426667-48.213333-36.266667-101.12-81.066667-118.186666l-234.666667-87.893334z m47.36 517.546667c-8.106667 0-16.213333-2.986667-22.613333-9.386667l-67.84-67.84-69.973333 69.973334c-6.4 6.4-14.506667 9.386667-22.613334 9.386666s-16.213333-2.986667-22.613333-9.386666a32.170667 32.170667 0 0 1 0-45.226667l69.973333-69.973333-68.266666-68.266667a32.170667 32.170667 0 0 1 0-45.226667c12.373333-12.373333 32.853333-12.373333 45.226666 0l67.84 67.84 66.133334-66.133333c12.373333-12.373333 32.853333-12.373333 45.226666 0 12.373333 12.373333 12.373333 32.853333 0 45.226667l-66.133333 66.133333 67.84 67.84c12.8 12.8 12.8 32.853333 0.426667 45.653333-6.4 6.4-14.506667 9.386667-22.613334 9.386667z"
                                            p-id="8854"
                                        />
                                    </svg>
                                    {/* <svg className="icon icon_weirenzheng" aria-hidden="true" fill='rgba(0,0,0,0.25)'>
                    <use xlinkHref="#icon_weirenzheng"></use>
                  </svg> */}
                                    未认证
                                    {/* <Tag
                    icon={
                      <svg className="icon icon_weirenzheng" aria-hidden="true">
                        <use xlinkHref="#icon_weirenzheng"></use>
                      </svg>
                    }
                  >
                    未认证
                  </Tag> */}
                                </div>
                            )}

                            {/* 未认证 */}
                            {/* <div className='auth_tag not_certified'>
              <Tag
                icon={
                  <svg className="icon icon_weirenzheng" aria-hidden="true">
                    <use xlinkHref="#icon_weirenzheng"></use>
                  </svg>
                }
              >未认证</Tag>
            </div> */}
                        </div>
                        <Divider style={{ margin: 0 }} />
                        <div className="person_info_dropdown_menu">
                            <div className="person_info_item" onClick={props.onClickAccountCenter}>
                                <svg
                                    className="icon icon_zhanghaozhongxin"
                                    viewBox="0 0 1024 1024"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    p-id="9153"
                                    width="200"
                                    height="200"
                                >
                                    <path
                                        d="M595.2 75.52l253.44 146.346667c51.2 29.866667 83.2 84.906667 83.2 144.213333v291.84c0 59.306667-32 114.346667-83.2 144.213333l-253.44 146.346667c-25.6 14.933333-54.613333 22.186667-83.2 22.186667-28.586667 0-57.6-7.253333-83.2-22.186667L175.36 802.133333c-51.2-29.866667-83.2-84.906667-83.2-144.213333V366.08c0-59.306667 32-114.346667 83.2-144.213333l253.44-146.346667c51.2-29.866667 114.773333-29.866667 166.4 0zM512 117.333333c-17.493333 0-35.413333 4.693333-51.2 13.653334L207.36 277.333333c-31.573333 18.346667-51.2 52.053333-51.2 88.746667v291.84c0 36.266667 19.626667 70.4 51.2 88.746667l253.44 146.346666c31.573333 18.346667 70.826667 18.346667 102.4 0l253.44-146.346666c31.573333-18.346667 51.2-52.053333 51.2-88.746667V366.08c0-36.266667-19.626667-70.4-51.2-88.746667L563.2 130.986667c-15.786667-8.96-33.706667-13.653333-51.2-13.653334z m0 422.4c111.786667 0 202.666667 76.8 202.666667 171.093334 0 17.493333-14.506667 32-32 32s-32-14.506667-32-32c0-58.88-62.293333-107.093333-138.666667-107.093334s-138.666667 48.213333-138.666667 107.093334c0 17.493333-14.506667 32-32 32s-32-14.506667-32-32c0-94.293333 90.88-171.093333 202.666667-171.093334z m0-301.226666c72.533333 0 131.413333 58.88 131.413333 131.413333 0 72.533333-58.88 131.413333-131.413333 131.413333-72.533333 0-131.413333-58.88-131.413333-131.413333 0-72.533333 58.88-131.413333 131.413333-131.413333z m0 64c-37.12 0-67.413333 30.293333-67.413333 67.413333 0 37.12 30.293333 67.413333 67.413333 67.413333 37.12 0 67.413333-30.293333 67.413333-67.413333 0-37.12-30.293333-67.413333-67.413333-67.413333z"
                                        p-id="9154"
                                    />
                                </svg>
                                {/* <svg className="icon icon_zhanghaozhongxin" aria-hidden="true">
                  <use xlinkHref="#icon_zhanghaozhongxin"></use>
                </svg> */}
                                账号设置
                                <RightOutlined className="right_arrow" />
                            </div>
                            <div className="person_info_item grey" onClick={props.onClickBaseInfo}>
                                基础信息
                            </div>
                            <div
                                className="person_info_item grey"
                                onClick={props.onClickAuthBinding}
                            >
                                认证绑定
                            </div>
                            <div className="person_info_item grey" onClick={props.onClickSetting}>
                                修改密码
                            </div>
                            <Divider style={{ margin: '8px 0px' }} />
                            <div className="person_info_item" onClick={props.onClickLogout}>
                                <svg className="icon icon_tuichudenglu" aria-hidden="true">
                                    <use xlinkHref="#icon_tuichu" />
                                </svg>
                                退出登录
                            </div>
                        </div>
                    </div>
                )
            }}
        >
            {/* {props.name} */}
            <Space>
                {' '}
                <div className="name_show_text"> {props.name}</div>
            </Space>
        </Dropdown>
    )
}

export default PersonInfo
