import React, { useEffect } from 'react'
import { READ_ONLY, NO_EDIT, HOME_PAGE, YES_EDIT } from './const'
import { useLocalObservable, Observer } from 'mobx-react'
import Hooks from './store'
import styles from './index.module.less'
import CustomTitle from '@/components/CustomTitle'
import classNames from 'classnames'
import { Space, Table, Button, Input, Image } from 'antd'
import { ChooseIconModal } from './components/chooseIconModal'
import type { ColumnsType } from 'antd/es/table'
import { getCookie } from '@/storage'
import type { NAV_OBJECT, GlobalNav } from './interface'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import CustomLink from '@/components/CustomLink'
import { Hook } from './hooks'
import BlockBox from '@/components/BlockBox'
import getCustomLinkList from '@/utils/getCustomLinkList'
import { Power } from '@wotu/wotu-pro-components'
// 导航管理
function Navigation() {
    const hooks = useLocalObservable(() => new Hooks())
    const orgCode = getCookie('SELECT_ORG_CODE') //获取机构Code
    const orgName = getCookie('ORG_NAME')
    const {
        operateNav,
        updateNavMessage,
        addNav,
        deleteNav,
        onSaveData,
        onLinkChange,
        components,
        moveRow,
        setNavId,
        iconType,
        saveIconKey,
        visible,
        setVisible,
        openIcon,
        isCurrentNav,
        onSubmit,
        getContent,
    } = Hook(hooks)
    useEffect(() => {
        document.title = orgName ? `导航管理-${orgName}` : '导航管理'
    }, [orgName])
    useEffect(() => {
        ;(async () => {
            let list = await getCustomLinkList('mobile')
            hooks.getLinkList(list)
            await hooks.getPortalInfo(orgCode) //获取主题色
            await hooks.getNavigationData(orgCode) //获取导航信息
            hooks?.gloablNav && setNavId(hooks?.gloablNav?.[0]?.id) //设置高亮显示
        })()
    }, [])

    // table数据
    const columns: ColumnsType<NAV_OBJECT> = [
        {
            title: '导航名称',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            width: '20%',
            render: (_, { operateCode, name }, idx) => (
                <div className={styles.rowOperate}>
                    {!operateCode?.includes('name') ? (
                        <div>
                            {name}
                            <svg
                                className="icon"
                                aria-hidden="true"
                                onClick={() => {
                                    operateNav('name', idx)
                                }}
                            >
                                <use xlinkHref={`#icon-pingjia`} />
                            </svg>
                        </div>
                    ) : (
                        <div>
                            <Input
                                ref={function (input) {
                                    if (input != null) {
                                        input.focus()
                                    }
                                }}
                                defaultValue={name}
                                maxLength={4}
                                onBlur={() => {
                                    operateNav('name', idx)
                                }}
                                onInput={e => {
                                    updateNavMessage(e, idx, 'name')
                                }}
                            />
                        </div>
                    )}
                </div>
            ),
        },
        {
            title: '跳转链接',
            dataIndex: 'url',
            key: 'url',
            align: 'center',
            width: '30%',
            render: (_, record) => {
                return (
                    <>
                        {record.readonly === READ_ONLY && record.isEdit === NO_EDIT ? (
                            '微页面 | 我的'
                        ) : (
                            <div className={styles.linkName}>
                                <CustomLink
                                    value={{
                                        label:
                                            record.linkName === HOME_PAGE
                                                ? '微页面 | 首页'
                                                : record.linkName,
                                    }}
                                    onChange={(e: any) => {
                                        console.log(e, 'record')
                                        onLinkChange?.(e, record.id)
                                    }}
                                    stylesName={'center'}
                                    noLink={true}
                                    onlyWeiLink={
                                        record.readonly === READ_ONLY && record.isEdit === YES_EDIT
                                            ? true
                                            : false
                                    }
                                    list={hooks?.customLinkList}
                                />
                            </div>
                        )}
                    </>
                )
            },
        },
        {
            title: '默认图标',
            dataIndex: 'icon',
            key: 'icon',
            align: 'center',
            width: '18%',
            render: (_, record, idx) => (
                <div className={styles.tableIconPreview}>
                    {record.icon ? (
                        <div onClick={() => openIcon(0, idx, record.icon)}>
                            {record.icon.includes('https://') ? (
                                <Image src={record.icon} preview={false} />
                            ) : (
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref={`#${record.icon}`} />
                                </svg>
                            )}

                            <div className={styles.changeBtn}>
                                <span>更换</span>
                            </div>
                        </div>
                    ) : (
                        <div
                            className={classNames(styles.tableIconPreview, styles.notSelected)}
                            onClick={() => openIcon(0, idx, record.icon)}
                        >
                            +{/* <div className={styles.jia}></div> */}
                        </div>
                    )}
                </div>
            ),
        },
        {
            title: '选中图标',
            dataIndex: 'activeIcon',
            key: 'activeIcon',
            align: 'center',
            width: '18%',
            render: (_, record, idx) => (
                <div className={styles.tableIconPreview}>
                    {record.selectedIcon ? (
                        <div onClick={() => openIcon(1, idx, record.selectedIcon)}>
                            {record.selectedIcon.includes('https://') ? (
                                <Image src={record.selectedIcon} preview={false} />
                            ) : (
                                <svg
                                    className={classNames('icon')}
                                    aria-hidden="true"
                                    style={{ fill: hooks.themeColor }}
                                >
                                    <use xlinkHref={`#${record.selectedIcon}`} />
                                </svg>
                            )}

                            <div className={styles.changeBtn}>
                                <span>更换</span>
                            </div>
                        </div>
                    ) : (
                        <div
                            className={classNames(styles.tableIconPreview, styles.notSelected)}
                            onClick={() => openIcon(1, idx, record.selectedIcon)}
                        >
                            +
                        </div>
                    )}
                </div>
            ),
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            onHeaderCell: () => ({
                style: {
                    textAlign: 'center',
                },
            }),
            width: '20%',
            render: (_, record, idx) => (
                <Space size="middle" className={styles.action}>
                    {record.readonly !== 1 && (
                        <>
                            <a onClick={() => deleteNav(idx, record?.code)}>删除</a>
                        </>
                    )}
                </Space>
            ),
        },
    ]

    return (
        <div className={styles.page}>
            <BlockBox>
                <CustomTitle title="导航管理" />
                <div className={styles.content}>
                    <div className={styles.contentIn}>
                        <Observer>
                            {() => {
                                return (
                                    <div className={styles.page_content}>
                                        <div className={styles.left}>
                                            <div className={styles.mobile_top}>
                                                <div className={styles.page_title}>
                                                    {'页面名称'}
                                                </div>
                                            </div>
                                            <div className={styles.navButton}>
                                                {hooks.gloablNav.map((s: GlobalNav) => (
                                                    <div
                                                        className={classNames(
                                                            styles.btn,
                                                            // isCurrentNav(s.id) && styles.btnActive,
                                                        )}
                                                        key={s.id}
                                                        onClick={() => setNavId(s.id)}
                                                    >
                                                        <div className={styles.logo}>
                                                            {getContent(s)}
                                                        </div>
                                                        <div
                                                            className={styles.title}
                                                            style={
                                                                isCurrentNav(s.id)
                                                                    ? { color: hooks.themeColor }
                                                                    : {}
                                                            }
                                                        >
                                                            {s.name}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className={styles.right}>
                                            <h3>导航栏设置</h3>
                                            <ul>
                                                <li>导航文字选中状态颜色同店铺主题色</li>
                                                <li>最多可设置5个导航（鼠标拖拽可调整顺序）</li>
                                            </ul>
                                            <DndProvider backend={HTML5Backend}>
                                                <Table
                                                    columns={columns}
                                                    dataSource={hooks.gloablNav}
                                                    pagination={false}
                                                    components={components}
                                                    onRow={(_, index) => {
                                                        const attr = {
                                                            index,
                                                            moveRow,
                                                        }
                                                        return attr as React.HTMLAttributes<any>
                                                    }}
                                                />
                                            </DndProvider>
                                            {hooks?.gloablNav?.length < 5 && (
                                                <div className={styles.add} onClick={addNav}>
                                                    <span className={styles.plus}>+</span>
                                                    添加导航
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            }}
                        </Observer>
                    </div>
                </div>
                <div className={styles.onSave}>
                    <Power powerId={11127}>
                        <Button type="primary" onClick={onSaveData}>
                            保存
                        </Button>
                    </Power>
                </div>
            </BlockBox>
            <ChooseIconModal
                visible={visible}
                iconType={iconType}
                onCancel={() => setVisible(false)}
                onOk={onSubmit}
                activeColor={hooks.themeColor}
                saveIconKey={saveIconKey}
                setVisible={setVisible}
            />
        </div>
    )
}

// const ObserverNavigation = observer(Navigation)
const ObserverNavigation: any = Navigation

export default ObserverNavigation
