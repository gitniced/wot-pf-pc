import { useEffect } from 'react'
import PermissionStore from './store'
import styles from './index.module.less'
import type { PermissionTreeType, RolePermissionProps } from './interface'
import { observer, useLocalObservable } from 'mobx-react'
import { Checkbox } from 'antd'

const Page = observer(({ roleCode, organizationCode, checkChange }: RolePermissionProps) => {
    let store = useLocalObservable(() => new PermissionStore())
    let {
        getPermissionList,
        clickLevel1,
        clickLevel2,
        clickLevel3,
        clickLevel4,
        bindClickHandler,
        // onReset,
        // onSure,
    } = store

    useEffect(() => {
        if (organizationCode) {
            getPermissionList({ roleCode, organizationCode, checkChange })
        }
    }, [roleCode, organizationCode])

    useEffect(() => {
        if (checkChange) {
            bindClickHandler(checkChange)
        }
    }, [checkChange])
    // useEffect(() => {
    //     if (checkChange) {
    //         checkChange(store.permissionTree)
    //     }
    // }, [store.permissionTree])

    const classNameList = ['first', 'second', 'third', 'fourth']
    const TextNameList = ['一', '二', '三', '四']
    const clickList = [clickLevel1, clickLevel2, clickLevel3, clickLevel4]
    // 获取复选框
    const getCheckLevelList = (treeData: PermissionTreeType | undefined, level: number) => {
        if (treeData?.children?.length) {
            return treeData?.children?.map?.((item: PermissionTreeType) => {
                let { key, title = '', has = false, changeEnable = false } = item || {}
                return (
                    changeEnable && (
                        <div className={styles[`part_${classNameList[level]}`]} key={key}>
                            <Checkbox
                                className={styles[`check_${classNameList[level]}`]}
                                defaultChecked={has}
                                checked={has}
                                onChange={e => clickList[level](e, item)}
                                disabled={!changeEnable}
                            >
                                {title}
                            </Checkbox>
                            <div className={styles[`group_${classNameList[level]}`]}>
                                {getCheckLevelList(item, level + 1)}
                            </div>
                        </div>
                    )
                )
            })
        }
    }
    // 获取表头
    const getTitleList = () => {
        return classNameList.map((item, index) => {
            return (
                <div className={styles[`item_top_${item}`]} key={index}>
                    {TextNameList[index]}级功能
                </div>
            )
        })
    }

    return (
        <div className={styles.page}>
            {store.permissionTree?.map((item: PermissionTreeType) => {
                return (
                    <div className={styles.item} key={item.key}>
                        <div className={styles.item_main}>
                            <div className={styles.item_top}>
                                {/* 表头 */}
                                {getTitleList()}
                            </div>
                            {/* 权限表内容 */}
                            {getCheckLevelList(item, 0)}
                        </div>
                    </div>
                )
            })}
        </div>
    )
})

Page.title = '权限配置'

export default Page
