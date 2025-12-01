import type { MenuItem, MenuItemVoid, RESTYPE } from './interface'
import { LinkEnum } from './interface'
import type LinkStore from './store'

//accessType字段 区分一下接入类型 1:跳转链接  2:个人中心菜单
export enum ACCESS_TYPE_ENUM {
    CUSTOM_LINK = 1,
    USER_CENTER = 2,
    COMPONENT = 3, // 组件
}

/**  获取考试评价 item  */
export const getItemChildren = (
    menuList: RESTYPE[],
    clickLink: (e: any, item?: RESTYPE) => void,
) => {
    let resultList =
        menuList?.length &&
        menuList?.reduce((acc: MenuItem[], item: RESTYPE) => {
            acc.push({
                key: item?.key,
                label: (
                    <div onClick={e => clickLink(e, item)} data-key={item.alias}>
                        {item.title}
                    </div>
                ),
                url: item.route,
            })
            return acc
        }, [])

    return resultList
}

/**
 * @name 获取二级菜单
 *
 * @param clickLink 点击事件
 * @param menuData 二级菜单数据 包括考试评价和培训
 *
 * */

export const getMenuItem: MenuItemVoid = (clickLink, menuData) => {
    let {
        evaluateMenuList,
        trainingMenuList,
        practiceMenuList = [],
        enrollMenuList = [],
        studyMenuList = [],
    } = menuData || {}

    let evaluateList = getItemChildren(evaluateMenuList, clickLink)
    let trainingList = getItemChildren(trainingMenuList, clickLink)
    let practiceList = getItemChildren(practiceMenuList, clickLink)
    let enrollList = getItemChildren(enrollMenuList, clickLink)
    let studyList = getItemChildren(studyMenuList, clickLink)
    return [
        {
            key: '1',
            label: (
                <div onClick={clickLink} data-key="MiCRO">
                    微页面
                </div>
            ),
        },
        {
            key: '2',
            label: <div data-key="PICTURE">图文</div>,
            children: [
                {
                    key: '2-1',
                    label: (
                        <div onClick={clickLink} data-key="IMAGE_LIST">
                            全部图文列表
                        </div>
                    ),
                },
                {
                    key: '2-3',
                    label: (
                        <div onClick={clickLink} data-key="IMAGE_CLASSIFIC">
                            图文分类列表
                        </div>
                    ),
                },
                {
                    key: '2-2',
                    label: (
                        <div onClick={clickLink} data-key="IMAGE_TEXT">
                            图文详情
                        </div>
                    ),
                },
            ],
        },
        Boolean(evaluateMenuList?.length) && {
            key: '5',
            label: <div data-key="EVALUATE">考试评价</div>,
            children: evaluateList,
        },
        Boolean(trainingMenuList?.length) && {
            key: 'TRAINING',
            label: <div data-key="EVALUATE">培训</div>,
            children: trainingList,
        },
        Boolean(enrollList?.length) && {
            key: 'ENROLL',
            label: <div data-key="ENROLL">报名</div>,
            children: enrollList,
        },
        Boolean(practiceMenuList?.length) && {
            key: 'PRACTICE',
            label: <div data-key="PRACTICE">练习</div>,
            children: practiceList,
        },
        Boolean(studyMenuList?.length) && {
            key: 'STUDY',
            label: <div data-key="STUDY_PLATFORM">学习平台</div>,
            children: studyList,
        },
        {
            key: '3',
            label: (
                <div onClick={clickLink} data-key="CUSTOM_LINK">
                    自定义链接
                </div>
            ),
        },
    ]
}

/**
 *  每种类型的 策略行为 用来回显
 */
export const getLinks = ({ store, type }: { store: LinkStore; type?: 'pc' | 'mobile' }) => {
    return {
        // 微页面
        MiCRO: () => store.setWeiVisible(true),
        // 图文详情
        IMAGE_TEXT: () => store.setPictureVisible(true),
        // 图文列表
        IMAGE_LIST: {
            type: LinkEnum.IMAGE_LIST,
            label: '图文 | 全部图文列表',
            code: '/picture/list',
        },
        /**  图文分类  */
        IMAGE_CLASSIFIC: () => store.setCategoryVisible(true),
        // 自定义链接
        CUSTOM_LINK: () => store.setLinkVisible(true),
        // 考试评价 | 证书查询
        KP_MENU_CERT_QUERY: {
            type: LinkEnum.CERTIFICATE,
            label: '考试评价 | 证书查询',
            code: store.objUrl.KP_MENU_CERT_QUERY,
        },

        //考试评价 | 成绩查询
        KP_MENU_PERFORMANCE_QUERY: {
            type: LinkEnum.ACHIEVEMENT,
            label: '考试评价 | 成绩查询',
            code: store.objUrl.KP_MENU_PERFORMANCE_QUERY,
        },

        // 考试评价 |  我的考试改为 认定考试
        KP_COGN_EXAM: {
            type: LinkEnum.COGN_EXAM,
            label: '考试评价 | 认定考试',
            code: store.objUrl.KP_COGN_EXAM,
        },

        // 考试评价 | 评价计划列表
        KP_MENU_EVA_PLAN_LIST: {
            type: LinkEnum.EVALUATION_PLAN,
            label: '考试评价 | 评价计划列表',
            code: store.objUrl.KP_MENU_EVA_PLAN_LIST,
        },

        // 考试评价 | 考试意向报名
        KP_MENU_EXAM_INTENTION_SIGN: {
            type: LinkEnum.INTENTION,
            label: '考试评价 | 考试意向报名',
            code: store.objUrl.KP_MENU_EXAM_INTENTION_SIGN,
        },

        // 考试评价 ｜ 认定结果列表
        IDENTIFICATION_RESULT_LIST: {
            type: LinkEnum.IDENTIFICATION_RESULT_LIST,
            label: '考试评价 | 认定结果列表',
            code: store.objUrl.IDENTIFICATION_RESULT_LIST,
        },

        IDENTIFICATION_RESULT_DETAIL: () => store.setIdentifyResultVisible(true),

        // 考试评价 ｜ 计划公示列表
        PLAN_FORMULA_LIST: {
            type: LinkEnum.PLAN_FORMULA_LIST,
            label: '考试评价 | 计划公示列表',
            code: store.objUrl.PLAN_FORMULA_LIST,
        },
        // 考试评价 ｜ 我的成绩
        MY_SCORE: {
            type: LinkEnum.MY_SCORE,
            label: '考试评价 | 我的成绩',
            code: store.objUrl.MY_SCORE,
        },
        // 考试评价 ｜ 我的证书
        MY_CERTIFICATE: {
            type: LinkEnum.MY_CERTIFICATE,
            label: '考试评价 | 我的证书',
            code: store.objUrl.MY_CERTIFICATE,
        },

        // 考试评价 ｜ 计划公示详情
        PLAN_FORMULA_DETAIL: () => store.setPlanFormulaVisible(true),
        // 报名中心  在线机构报名
        INSTITUTIONAL_REGISTRATION: {
            type: LinkEnum.ONLINE_REGISTRATION,
            label: '报名 | 在线机构报名',
            code:
                type === 'pc'
                    ? `/enroll-gateway/enroll-information?organizationCode=${store.orgCode}`
                    : `/enroll-center/enroll-online?applyChannel=organization&organizationCode=${store.orgCode}&type=organization`,
        },

        // 我的报名
        MY_REGISTRATION: {
            type: LinkEnum.MY_ENROLLMENT,
            label: '报名 | 我的报名',
        },
        // 全部报名列表
        REGISTRATION_LIST: {
            type: LinkEnum.ALL_ENROLL_LIST,
            label: '报名 | 全部报名列表',
        },
        // 全部报名列表
        ADMISSIONS: {
            type: LinkEnum.ADMISSIONS,
            label: '报名 | 机构招生主页',
        },
        /**  报名项目列表  */
        APPLY_ITEM_LIST: () => store.setEnrollModalOpen(true, 'project'),
        /**  报名详情  */
        REGISTRATION_DETAILS_PAGE: () => store.setEnrollModalOpen(true, 'details'),

        // 我的班级
        MY_CLASS: {
            type: LinkEnum.MY_CLASS,
            label: '培训 | 我的班级',
        },

        // 课程中心
        COURSE_CENTER: {
            type: LinkEnum.COURSE_CENTER,
            label: '培训 | 课程中心',
        },
        // 课程详情页
        COURSE_DETAILS: () => store.setCourseModalOpen(true),

        /**  练习列表  */
        PRACTICE_LIST: {
            type: LinkEnum.PRACTICE_LIST,
            label: '练习 | 练习列表',
        },
        /**  练习详情  */
        PRACTICE_DETAILS: () => store.setPracticeVisible(true),
        /**  我的练习  */
        MY_PRACTICE: {
            type: LinkEnum.MY_PRACTICE,
            label: '练习 | 我的练习',
        },
        /** 合格证书   */
        CERTIFICATE_OF_QUALITY: {
            type: LinkEnum.CERTIFICATE_OF_QUALITY,
            label: '培训 | 合格证书',
        },
        /**  培训 证书查询  */
        CERTIFICATE_QUERY: {
            type: LinkEnum.CERTIFICATE_QUERY,
            label: '培训 | 证书查询',
        },
        /**  培训 证书查询  */
        STUDY_PLATFORM_MY_CERTIFICATE: {
            type: LinkEnum.STUDY_PLATFORM_MY_CERTIFICATE,
            label: '学习平台 ｜ 我的证书',
        },
    }
}
