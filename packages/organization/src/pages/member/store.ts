import { runInAction, makeAutoObservable } from 'mobx'
import http from '@/servers/http'
import api from './api'
import { message } from 'antd'
import { cloneDeep } from 'lodash'
import type { FormDataType, ImportListType } from './interface'
import { getDecodeInfo } from '@wotu/wotu-components'
class RosterStore {
    constructor() {
        makeAutoObservable(this)
    }
    /** 机构id 'ORG220727W1FBX8G' */
    organizationCode: string = ''
    /** 机构name 'ORG220727W1FBX8G' */
    organizationName: string = ''
    /** 机构列表 */
    organizationList: any[] = []
    /** 机构详情 */
    organizationDetail: any = {}
    /** 机构架构-部门树 */
    departmentTree: any[] = []
    /** 当前选中的部门 */
    selectDepartment: any = {}
    /** 机构人数 */
    orgStaffCount: number = 0
    /** 当前选中部门编码/被创部门的上级编码 */
    departmentCode: React.Key = ''
    /** 当前选中部门name */
    departmentName: string = ''
    /** 成员编码 */
    userCode: string = ''
    /** 页码 */
    pageNo: number = 1
    /** 每页条目 */
    pageSize: number = 10
    /** 总数 */
    totalCount: number = 0
    /** 成员分页数据 */
    authList: FormDataType[] = []
    /** 角色列表 */
    roleList: any[] = []

    /** 设为主管的用户编码 */
    directorCode: string = ''
    /** 操作列表 */
    importList: ImportListType[] = []
    importPageTotal: number = 0

    /** 部门直属成员 DepartStaff */
    staffList: any[] = []

    /** 当前部门主管code */
    currentDirectorCode: string = ''

    /** 创建的部门的code */
    createDepartmentCode: string = ''

    /** 选中的树节点 selectedTreeKeys */
    selectedTreeKeys: React.Key[] = []
    // /** 选中的树节点的父节点 selectedTreeKeys */
    // selectedParentKeys: React.Key[] = []
    /** 展开的树节点 expandedKeys */
    expandedKeys: React.Key[] = []

    /** 右边展示的名字 */
    rightTitle: string = ''
    /** 是否选中机构 */
    isSelectOrg: boolean = true

    /** 操作列表请求次数 */
    importCount: number = 0

    /** 定时器 */
    clock?: NodeJS.Timeout
    /** 设置主管显隐 */
    directorVisible: boolean = false

    /** 计时器 */
    codeEvent: number[] = []
    /** 计时器时间 */
    codeEventTime = 60
    /** 验证码按钮文案 */
    codeBtnStr = '发送验证码'
    /** 验证码按钮是否可点击 */
    veriCodeBtn = false
    /** 转让步骤 */
    changeOwnerStep = 1
    /** 当前创建人 */
    organizationOwner = {}
    /** 转让创建人模态框显隐 */
    changeOwnerVisible = false
    /** 验证码随机数 */
    randomKey = ''

    /** 更新创建人模态框显隐 */
    updateChangeOwnerVisible = (bool: boolean) => {
        this.changeOwnerVisible = bool
    }

    /** 开始更改创建人 */
    changeOwner = (data: any) => {
        this.organizationOwner = data
        this.updateChangeOwnerVisible(true)
    }
    /** 开始更改创建人 */
    toggleShow = (code: string) => {
        const tempAuthList = cloneDeep(this.authList)
        tempAuthList.map(i => {
            if (i.code === code) {
                i.showPhone = !i.showPhone
            }
        })
        this.authList = tempAuthList
    }

    /** 更改创建人服务端 */
    changeOwnerServer = (data: any) => {
        http(api.changeOrganizationOwner, 'post', {
            organizationCode: this.organizationCode,
            staffCode: data.userCode,
        }).then(() => {
            this.getOrganizationDetail()
            message.success('转让创建者成功')
            this.organizationOwner = data
            this.switchDepartment('')
            this.setSelectedTreeKeys([])
            this.selectOrg()
            this.changeOwnerVisible = false
        })
    }

    /** 验证码随机数 */
    getRandomKey = () => {
        this.randomKey = new Date().getTime() + Math.random().toString(36).slice(-8)
    }

    /** 获取验证码 */
    getCode = async (account: string) => {
        if (this.codeEventTime === 60) {
            try {
                this.getRandomKey()
                await http(api.getCode, 'post', { account, key: this.randomKey })
                this.doCodeEvent()
            } catch (error) {
                console.log(error)
            }
        }
    }

    /** 开始倒计时 */
    doCodeEvent = () => {
        this.codeEvent.map(i => {
            window.clearInterval(i)
        })
        this.codeEvent = []
        this.codeBtnStr = `(${this.codeEventTime})重新发送`
        const codeEventItem = window.setInterval(() => {
            this.codeEventTime--
            if (this.codeEventTime !== 0) {
                this.codeBtnStr = `(${this.codeEventTime})重新发送`
            } else {
                this.codeEvent.map(i => {
                    window.clearInterval(i)
                })
                this.codeBtnStr = `发送验证码`
                this.codeEventTime = 60
            }
        }, 1000)
        this.codeEvent.push(codeEventItem)
    }

    /** 清除倒计时 */
    clearCodeEvent = () => {
        this.codeEvent?.map(i => {
            window.clearInterval(i)
        })
        this.codeEvent = []
        this.codeBtnStr = `发送验证码`
        this.codeEventTime = 60
    }

    /** 校验手机号与验证码 */
    mobileVerify = (step: number, owner: any, verifyCode: string) => {
        const { mobile } = owner || {}
        if (!this.randomKey) {
            message.error('请先获取验证码')
            return false
        }
        return http(api.verifyCode, 'post', {
            account: getDecodeInfo(mobile || ''),
            key: this.randomKey,
            verifyCode,
        }).then(() => {
            if (step.toString() === '1') {
                this.clearCodeEvent()
                this.changeOwnerStep = 2
            } else {
                this.changeOwnerServer(owner)
            }
        })
    }

    /** 更新设置主管显隐 */
    updateDirectorVisible = (bool: boolean) => {
        this.directorVisible = bool
    }

    /** 清除定时器 */
    clearClock = () => {
        clearTimeout(this.clock)
    }

    /** 选中机构 */
    selectOrg = () => {
        this.isSelectOrg = true
    }

    /** 选中部门 */
    selectDepartmentHandler = (data: any) => {
        this.getExpandedKeys(data)
        this.selectDepartment = data
    }

    /** 获取机构 code */
    getOrganizationCode = (code: any) => {
        this.organizationCode = code || ''
        this.getOrganizationDetail()
        this.getIndustryList()
        if (window.page_size) {
            this.pageHandler(1, window.page_size)
        } else {
            this.getAuthList()
        }
    }

    /** 人机校验 */
    serverVerify = (ticket: string, randstr: string) => {
        return http(
            'https://api.cloud.wozp.cn/captcha/ticket/validate',
            'post',
            { ticket, randstr }, //data中携带ticket和randstr
            { ticket: ticket }, //headers中携带ticket
        )
    }

    /** 切换部门*/
    switchDepartment = (selectedKey: React.Key, title?: string) => {
        this.departmentCode = selectedKey ?? ''
        if (!selectedKey) {
            this.isSelectOrg = true
            this.departmentName = ''
            this.rightTitle = this.organizationName
            console.log(this.organizationName)
        } else {
            this.isSelectOrg = false
            this.departmentName = title!
            this.rightTitle = title!
        }
        this.getAuthList()
        this.getDepartStaff()
    }

    /** 机构详情*/
    getOrganizationDetail = async () => {
        const res: any = await http(
            `${api.organizationDetail}${this.organizationCode}`,
            'get',
            {},
            { form: true, repeatFilter: false },
        )
        const { data, success } = res || {}

        if (success) {
            runInAction(() => {
                this.organizationDetail = data || {}
                this.organizationName = data?.name
                this.rightTitle = data?.name
            })
        } else {
            message.error('机构详情获取失败')
        }
    }

    /** 获取树形层级*/
    getDeepLevel = (tree: any[]) => {
        const getLevel = (tempTree: any[], level = 0) => {
            for (let i = 0; i < tempTree.length; i++) {
                const { children } = tempTree[i]
                tempTree[i].level = level
                children && getLevel(children, level + 1)
            }
        }
        getLevel(tree, 1)
        return tree
    }

    /** 机构架构-部门树*/
    getIndustryList = async () => {
        const res: any = await http(
            `${api.organizationTree}${this.organizationCode}`,
            'get',
            {},
            { form: true, repeatFilter: false },
        )

        const { data, success } = res || {}
        if (success) {
            runInAction(() => {
                this.departmentTree = this.getDeepLevel(data?.children || [])

                /** console.log(data?.children)*/
                this.orgStaffCount = data.staffCount
            })
        } else {
            message.error(res.message)
        }
    }

    getSearchTree = async (value: string) => {
        const res: any = await http(
            `${api.searchTree}`,
            'post',
            { organizationCode: this.organizationCode, name: value },
            { repeatFilter: false, form: true },
        )

        const { data, success } = res || {}
        if (success) {
            this.departmentTree = data || []
        } else {
            message.error(res.message)
        }
    }

    /** 添加子部门*/
    /** createDepartment = async (departmentCode: string, name: string) => {*/
    /**
     * 当前选中的部门
     * @param {*} departmentData
     * @param {string} name
     * @memberof RosterStore
     */
    createDepartment = async (name: string) => {
        const { key } = this.selectDepartment || {}
        return http(api.createDepartment, 'post', {
            name: name,
            organizationCode: this.organizationCode,
            parentCode: key,
        }).then((res: any) => {
            const tempExpandKeys = key ? this.getExpandedKeys(this.selectDepartment) : []
            runInAction(() => {
                this.setSelectedTreeKeys([res])
                this.expandedKeys = [...tempExpandKeys, res]
                this.departmentCode = res
                this.rightTitle = name
                this.getAuthList()
                this.getIndustryList()
                this.isSelectOrg = false
                message.success('添加成功')
            })
        })
    }

    /** 改变选中的树节点*/
    setSelectedTreeKeys = (select: React.Key[]) => {
        this.selectedTreeKeys = select
        this.isSelectOrg = false
    }

    setExpandedKeys = (isNew: boolean, keys?: React.Key[]) => {
        keys && (this.expandedKeys = keys)
        isNew && (this.expandedKeys = [...this.expandedKeys, this.departmentCode])
    }

    /** 获取当前部门的上层key */
    getExpandedKeys = (data: any) => {
        const { level } = data || {}
        let tempExpandKeys: any[] = []
        console.log(Reflect.ownKeys(data))
        if (Reflect.ownKeys(data).length === 0) {
            return tempExpandKeys
        }
        if (level.toString() === '1') {
            tempExpandKeys = [data.key]
        } else if (level.toString() === '2') {
            const { parentCode } = data || {}
            tempExpandKeys = [parentCode, data.key]
        } else {
            let firstKey = ''
            const { parentCode } = data || {}
            this.departmentTree.map(i => {
                let findObj = i.children.find((ii: any) => ii.key === parentCode)
                if (findObj) {
                    firstKey = findObj.parentCode
                }
            })
            tempExpandKeys = [firstKey, parentCode, data.key]
        }
        return tempExpandKeys
    }

    /** 编辑部门*/
    editDepartment = async (name: string) => {
        const { key } = this.selectDepartment || {}
        return http(api.editDepartment, 'post', {
            name,
            organizationCode: this.organizationCode,
            code: key,
        }).then(() => {
            message.success('编辑成功')
            this.getIndustryList()
        })
    }

    findDepartment = (list: any[], matchKey: string) => {
        for (let i = 0; i < list.length; i++) {
            if (list[i].children) {
                const result: any = this.findDepartment(list[i].children, matchKey)
                if (result) return result
            }
            if (list[i].key === matchKey) return list[i]
        }
        return null
    }

    /** 删除部门*/
    delDepartment = async () => {
        const { key, parentCode } = this.selectDepartment || {}
        return http(api.delDepartment, 'POST', {
            code: key,
            organizationCode: this.organizationCode,
        }).then(() => {
            message.success('删除成功')
            if (parentCode) {
                const temp = this.findDepartment(this.departmentTree, parentCode)
                this.selectDepartmentHandler(temp)
                this.setSelectedTreeKeys([parentCode])
                this.getIndustryList()
                this.switchDepartment(parentCode)
                this.rightTitle = temp.title
            } else {
                this.getIndustryList()
                this.getAuthList()
                this.isSelectOrg = true
                this.rightTitle = this.organizationName
            }
        })
    }

    /** 删除成员*/
    delAuth = (selectUserCode: string) => {
        return http(api.delAuth, 'POST', {
            organizationCode: this.organizationCode,
            userCode: selectUserCode,
        }).then(() => {
            runInAction(() => {
                this.getAuthList()
                this.getIndustryList()
                message.success('删除成功')
            })
        })
    }

    pageHandler = (pageNo: number, pageSize: number) => {
        if (pageNo) this.pageNo = pageNo
        if (pageSize) this.pageSize = pageSize
        this.getAuthList()
    }

    /**获取成员分页列表*/
    getAuthList = async () => {
        const res: any = await http(
            api.authList,
            'post',
            {
                organizationCode: this.organizationCode,
                departmentCode: this.departmentCode,
                pageSize: this.pageSize || 10,
                pageNo: this.pageNo,
            },
            {
                repeatFilter: false,
                form: true,
            },
        )

        const { data, success } = res || {}

        if (success) {
            this.totalCount = data?.totalCount || 0
            data?.data?.map(i => (i.showPhone = false))
            this.authList = data?.data || []
        } else {
            message.error(res.message)
        }
        if (window?.update_page_size && Number.isInteger(data?.pageSize)) {
            window?.update_page_size?.(data?.pageSize)
        }
    }

    /** 设为主管的用户编码*/
    setDirectorCode = (code: string) => {
        this.directorCode = code
    }
    /** 部门直属成员 departStaff*/
    getDepartStaff = async () => {
        if (!this.departmentCode) return
        const res: any = await http(
            `${api.departStaff}`,
            'post',
            { departmentCode: this.departmentCode, organizationCode: this.organizationCode },
            { form: true },
        )
        const { success, data = [] } = res || {}
        if (success) {
            this.staffList = data || []
            data.map((i: any) => {
                if (i.isDirector) {
                    this.currentDirectorCode = i.userCode
                }
            })
        } else {
            message.error(res.message)
        }
    }
    /** 设置主管*/
    setDirector = async () => {
        const res: any = await http(
            `${api.setDirector}`,
            'POST',
            {
                departmentCode: this.departmentCode,
                directorCode: this.directorCode,
                organizationCode: this.organizationCode,
            },
            { form: true },
        )
        const { success, message: mess } = res || {}
        if (success) {
            runInAction(() => {
                this.getAuthList()
                message.success('设置成功')
            })
        } else {
            message.error(mess)
        }
    }

    /** 下载列表*/
    getImportList = async () => {
        const res: any = await http(
            api.importList,
            'POST',
            {
                order: '',
                orderBy: '',
                organizationCode: this.organizationCode,
                pageNo: 1,
                pageSize: 5,
            },
            { repeatFilter: false, form: true },
        )
        const { data, success } = res || {}

        if (success) {
            runInAction(() => {
                this.importList = data?.data || []

                if (data?.data[0] && data?.data[0].status !== 2 && this.importCount < 5) {
                    this.importCount++
                    this.clock = setTimeout(() => {
                        this.getImportList()
                    }, 5000)
                } else {
                    this.clearClock

                    this.getIndustryList()
                    this.getAuthList()
                    this.getOrganizationDetail()
                }
            })
        } else {
            message.error(res.message)
        }
    }

    /** 文件上传*/
    upload = async (file: string) => {
        await http(api.siteList, 'post', {
            file,
        })
        runInAction(() => {})
    }
    /** 文件导入*/
    importResource = async (fileUrl: string, fileName: string) => {
        return await http(api.excelImport, 'post', {
            url: fileUrl,
            name: fileName,
            departmentCode: this.departmentCode,
            organizationCode: this.organizationCode,
            type: '1',
        }).then(() => {
            this.getImportList()
            this.getIndustryList()
            message.success('文件导入成功')
        })
    }
}

export default RosterStore
