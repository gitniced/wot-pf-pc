import { makeAutoObservable } from 'mobx'
import http from '@/servers/http'
import api from './api'
import type { PermissionTreeType } from './interface'
import { history } from 'umi'

class PermissionStore {
    constructor() {
        makeAutoObservable(this)
    }
    // 权限列表
    permissionTree: PermissionTreeType[] = []

    // 选择的权限
    checkList: number[] = []
    public btnLoading: boolean = false //查询按钮loading状态
    clickHandler: any

    bindClickHandler = (callback: any) => {
        this.clickHandler = callback
    }

    getAheadData = () => {
        this.permissionTree?.map?.(items => {
            items?.children?.map?.(first => {
                first.checkChild = []
                first?.children?.map?.(second => {
                    if (second?.has) {
                        first.checkChild?.push(second?.key)
                    }
                    second.checkChild = []
                    second?.children?.map?.(third => {
                        if (third?.has) {
                            second.checkChild?.push(third?.key)
                        }
                        third.checkChild = []
                        third?.children?.map?.(fourth => {
                            if (fourth?.has) {
                                third.checkChild?.push(fourth?.key)
                            }
                        })
                    })
                })
            })
        })
    }

    // onSure = (roleCode: string, orgCode: string) => {
    //     this.permissionTree?.map?.(items => {
    //         items?.children?.map(first => {
    //             if (first?.has) {
    //                 this.checkList.push(first.key)
    //             }
    //             first?.children?.map(second => {
    //                 if (second?.has) {
    //                     this.checkList.push(second.key)
    //                 }
    //                 second?.children?.map(third => {
    //                     if (third?.has) {
    //                         this.checkList.push(third?.key)
    //                     }
    //                     third?.children?.map(fourth => {
    //                         if (fourth?.has) {
    //                             this.checkList.push(fourth?.key)
    //                         }
    //                     })
    //                 })
    //             })
    //         })
    //     })
    //     this.editPermission(roleCode, orgCode)
    // }

    onReset = () => {
        history.goBack()
    }

    getPermissionList = async ({
        roleCode,
        organizationCode,
        checkChange,
    }: {
        roleCode?: string
        organizationCode: string
        checkChange: any
    }) => {
        const params = roleCode
            ? {
                  roleCode,
                  organizationCode,
              }
            : {
                  organizationCode,
              }
        const res: any = await http(`${api.permissionList}`, 'post', params, {
            repeatFilter: false,
        })
        let tempList = (res || []).reduce((p: any, c: any, i) => {
            if (p[0]?.children) {
                p[0].children = [...(p[0]?.children || []), ...(c?.children || [])]
            }
            return i === 0 ? [c] : p
        }, [])

        let tempListChild = tempList?.[0]?.children || []
        if (tempListChild.length) {
            tempList[0].children = tempListChild.sort((a: any, b: any) => {
                return b.sort - a.sort
            })
        }
        this.permissionTree = tempList
        this.getAheadData()
        checkChange?.(res)
    }

    // editPermission = (roleCode: string, orgCode: string) => {
    //     const permissionIds = Array.from(new Set(this.checkList))
    //     this.btnLoading = true
    //     http(
    //         api.editPermission,
    //         'post',
    //         {
    //             permissionIds,
    //             roleCode,
    //             organizationCode: orgCode,
    //         },
    //         { repeatFilter: false },
    //     )
    //         .then(() => {
    //             message.success(`编辑成功`)
    //             history.goBack()
    //         })
    //         .finally(() => {
    //             this.btnLoading = false
    //         })
    // }

    clickLevel1 = (e: any, node: PermissionTreeType) => {
        this.permissionTree?.map(items => {
            items?.children?.map(first => {
                if (node?.key === first?.key) {
                    first.has = e.target.checked
                    first?.children?.map(second => {
                        if (second?.changeEnable) {
                            second.has = e.target.checked
                        }
                        second?.children?.map(third => {
                            if (third?.changeEnable) {
                                third.has = e.target.checked

                                third?.children?.map(fourth => {
                                    if (fourth?.changeEnable) {
                                        fourth.has = e.target.checked
                                    }
                                })
                            }
                        })
                    })
                }
            })
        })

        this.disposeDate()
    }

    clickLevel2 = (e: any, node: PermissionTreeType) => {
        this.permissionTree?.map(items => {
            items?.children?.map(first => {
                first?.children?.map(second => {
                    if (node.key === second?.key) {
                        second.has = e.target.checked
                        // 处理三级是否选中
                        second?.children?.map(third => {
                            if (third?.changeEnable) {
                                third.has = e.target.checked
                                third?.children?.map(fourth => {
                                    if (fourth?.changeEnable) {
                                        fourth.has = e.target.checked
                                    }
                                })
                            }
                        })
                    }
                })
            })
        })

        this.disposeDate()
    }

    clickLevel3 = (e: any, node: PermissionTreeType) => {
        this.permissionTree?.map(items => {
            items?.children?.map(first => {
                first?.children?.map(second => {
                    second?.children?.map(third => {
                        if (third?.key === node?.key) {
                            third.has = e.target.checked
                            // 处理三级是否选中
                            third?.children?.map(fourth => {
                                if (fourth?.changeEnable) {
                                    fourth.has = e.target.checked
                                }
                            })
                        }
                    })
                })
            })
        })

        this.disposeDate()
    }

    clickLevel4 = (e: any, node: PermissionTreeType) => {
        this.permissionTree?.map(items => {
            items?.children?.map(first => {
                first?.children?.map(second => {
                    second?.children?.map(third => {
                        third?.children?.map(fourth => {
                            if (fourth?.key === node?.key) {
                                fourth.has = e.target.checked
                            }
                        })
                    })
                })
            })
        })

        this.disposeDate()
    }
    //将被选择的key填入父级的checkChild
    disposeDate = () => {
        this.permissionTree?.map?.(item => {
            item?.children?.map?.(first => {
                // 当二级被选中时，一级的checkChild 插入当前二级key，反之 删除
                first?.children?.map?.(second => {
                    second?.children?.map?.(third => {
                        third?.children?.map(fourth => {
                            // 当四级被选中时，三级的checkChild 插入当前三级key，反之 删除
                            if (fourth.has) {
                                if (!third.checkChild?.includes?.(fourth.key)) {
                                    third?.checkChild?.push?.(fourth.key)
                                    third.has = true
                                }
                            } else {
                                if (third?.checkChild?.includes(fourth?.key)) {
                                    third?.checkChild?.splice(
                                        third?.checkChild?.indexOf(fourth?.key),
                                        1,
                                    )
                                    // if (third.checkChild?.length === 0) {
                                    //     third.has = false
                                    // }
                                }
                            }
                        })
                        // 当三级被选中时，二级的checkChild 插入当前三级key，反之 删除
                        if (third.has) {
                            if (!second.checkChild?.includes?.(third.key)) {
                                second?.checkChild?.push?.(third.key)
                            }
                        } else {
                            if (second?.checkChild?.includes(third?.key)) {
                                second?.checkChild?.splice(
                                    second?.checkChild?.indexOf(third?.key),
                                    1,
                                )
                            }
                        }
                    })

                    if (second?.children?.length) {
                        // 当二级下有被选中的三级时候，一级二级都被选中
                        if (second?.checkChild?.length) {
                            second.has = true
                            if (!first?.checkChild?.includes(second.key)) {
                                first?.checkChild?.push(second.key)
                            }
                        } else {
                            second.has = false
                            if (first?.checkChild?.includes(second.key)) {
                                // 一级功能的checkChild删除当前二级的key
                                first?.checkChild?.splice(
                                    first?.checkChild?.indexOf(second?.key),
                                    1,
                                )
                            }
                        }
                    } else {
                        // 当二级没有子级，且二级被选中，一级也被选中
                        if (second?.has) {
                            if (!first?.checkChild?.includes(second.key)) {
                                first?.checkChild?.push(second.key)
                            }
                        } else {
                            if (first?.checkChild?.includes(second.key)) {
                                // 一级功能的checkChild删除当前二级的key
                                first?.checkChild?.splice(
                                    first?.checkChild?.indexOf(second?.key),
                                    1,
                                )
                            }
                        }
                    }
                })

                if (first?.children?.length) {
                    // 根据checkChild判断一级是否选中
                    if (first?.checkChild?.length) {
                        first.has = true
                    } else {
                        first.has = false
                    }
                }
            })
        })

        this.clickHandler(this.permissionTree)
    }
}

export default PermissionStore
