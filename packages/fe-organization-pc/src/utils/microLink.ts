import { message } from 'antd'
import { LinkEnum } from './interface.d'
import type UserStore from '@/stores/userStore'
// import { getCookie } from '@/storage'

export const linkHandler = async (data: any, userStore?: UserStore) => {
    const currentAlias = location.pathname.split('/')?.[1] || ''
    // 跳转链接没有类型，说明为空白，无需跳转
    if (!data?.linkType || !Number(data?.linkType)) return
    switch (Number(data?.linkType)) {
        case LinkEnum.MiCRO:
            // 后端约定isPreDefine为1时 即为默认预置首页
            if (Number(data?.isPreDefine || 0) === 1) {
                location.href = `/${currentAlias}/home`
            } else {
                location.href = `/${currentAlias}/micro?code=${data.linkUrl}`
                // location.href = `/${currentAlias}/micro?code=${data.linkUrl}`
            }
            break
        case LinkEnum.IMAGE_TEXT:
            location.href = `/${currentAlias}/picture/detail?code=${data.linkUrl}`
            break
        case LinkEnum.IMAGE_LIST:
            location.href = `/${currentAlias}/picture/list`
            break
        case LinkEnum.CUSTOM_LINK:
            location.href = data.linkUrl
            break
        /**  我的报名  */
        case LinkEnum.MY_ENROLLMENT:
            // 我的报名
            location.href = `/${currentAlias}/mine/enroll-center/my-enrollment`
            break
        case LinkEnum.ONLINE_REGISTRATION:
            // 在线报名
            location.href = `/${currentAlias}${data.linkUrl}`
            // location.href = `/${currentAlias}/mine/enroll-center/my-enrollment`
            break
        /**  报名项目列表  */
        case LinkEnum.REGISTRATION_PROJECT_LIST:
            location.href = `/${currentAlias}/enroll-gateway/enroll-list?type=${data.linkUrl}`
            break
        /**  报名详情  */
        case LinkEnum.REGISTRATION_DETAILS_PAGE:
            location.href = `/${currentAlias}/enroll-gateway/enroll-detail?code=${data.linkUrl}`
            break
        // case LinkEnum.ONLINE_REGISTRATION:
        //     // 在线报名
        //     location.href = `/${currentAlias}${data.linkUrl}`
        //     break
        /**  考试评价 认定考试  */
        case LinkEnum.COGN_EXAM:
            location.href = `/${currentAlias}/mine${data.linkUrl}`
            break
        // /** 考试评价 证书查询   */
        // case LinkEnum.CERTIFICATE:
        //     location.href = `/${currentAlias}${data.linkUrl}`
        //     break
        // /**  考试评价 成绩查询   */
        // case LinkEnum.ACHIEVEMENT:
        //     location.href = `/${currentAlias}${data.linkUrl}`
        //     break
        // case LinkEnum.IDENTIFICATION_RESULT_LIST:
        //     location.href = `/${currentAlias}${data.linkUrl}`
        //     break
        // case LinkEnum.IDENTIFICATION_RESULT_DETAIL:
        //     location.href = `/${currentAlias}${data.linkUrl}`
        //     break
        // case LinkEnum.PLAN_FORMULA_LIST:
        //     location.href = `/${currentAlias}${data.linkUrl}`
        //     break
        // case LinkEnum.PLAN_FORMULA_DETAIL:
        //     location.href = `/${currentAlias}${data.linkUrl}`
        //     break
        case LinkEnum.COURSE_DETAIL:
            // 课程详情
            location.href = `/${currentAlias}/train-gateway/lesson/${data.linkUrl}`
            break
        case LinkEnum.MY_CLASS:
            // 我的班级
            location.href = `/${currentAlias}/mine/train-center/mine/student/subPages/student/class`
            break
        /**  图文分类  */
        case LinkEnum.IMAGE_CATEGORY:
            location.href = `/${currentAlias}/picture/list?code=${data.linkUrl}`
            break
        /**  练习列表  */
        case LinkEnum.PRACTICE_LIST:
            location.href = `/${currentAlias}/practice/list`
            break
        /**  练习详情  */
        case LinkEnum.PRACTICE_DETAILS:
            data?.linkUrl
                ? userStore?.setBrushQstVisible(true, data?.linkUrl)
                : message.error('练习code不存在')
            break
        /**  我的练习  */
        case LinkEnum.MY_PRACTICE:
            location.href = `/${currentAlias}/mine/exam-center/practice-list`
            break
        default:
            location.href = `/${currentAlias}${data.linkUrl}`
            break
    }
}

export const microLinkHandler = async (url: { code: string; type: LinkEnum }, userStore?: any) => {
    console.log('🍊 url:', url)
    const currentAlias = location.pathname.split('/')?.[1] || ''
    const { type = '', code = '', route } = url
    let currentUrl = code || route

    // 跳转链接没有类型，说明为空白，无需跳转
    if (!type) return

    switch (Number(type)) {
        case LinkEnum.MiCRO:
            location.href = `/${currentAlias}/micro?code=${code}`
            break
        case LinkEnum.IMAGE_TEXT:
            location.href = `/${currentAlias}/picture/detail?code=${code}`
            break
        case LinkEnum.IMAGE_LIST:
            location.href = `/${currentAlias}/picture/list`
            break
        case LinkEnum.CUSTOM_LINK:
            // if (
            //     code.includes('https://p-match.wozhipei.com') ||
            //     code.includes('https://sx.szhpeixun.com/home')
            // ) {
            //     window.open(code)
            // } else {
            //     location.href = code
            // }
            window.open(code)
            break
        case LinkEnum.MY_ENROLLMENT:
            // 我的报名
            location.href = `/${currentAlias}/mine/enroll-center/my-enrollment`
            break
        /**  在线报名  */
        case LinkEnum.ONLINE_REGISTRATION:
            location.href = `/${currentAlias}${code}`
            break
        /**  报名项目列表  */
        case LinkEnum.REGISTRATION_PROJECT_LIST:
            location.href = `/${currentAlias}/enroll-gateway/enroll-list?type=${code}`
            break
        /**  报名详情  */
        case LinkEnum.REGISTRATION_DETAILS_PAGE:
            location.href = `/${currentAlias}/enroll-gateway/enroll-detail?code=${code}`
            break
        case LinkEnum.IDENTIFICATION_RESULT_DETAIL:
            location.href = `/${currentAlias}${code}`
            break
        /**  证书查询 成绩查询  */
        case LinkEnum.ACHIEVEMENT:
        case LinkEnum.CERTIFICATE:
            location.href = `/${currentAlias}${code}`
            break
        /**  认定考试  */
        case LinkEnum.COGN_EXAM:
            location.href = `/${currentAlias}/mine${code}`
            break
        case LinkEnum.PLAN_FORMULA_DETAIL:
            location.href = `/${currentAlias}${code}`
            break
        case LinkEnum.COURSE_DETAIL:
            // 课程详情
            location.href = `/${currentAlias}/train-gateway/lesson/${code}`
            break
        case LinkEnum.MY_CLASS:
            // 我的班级
            location.href = `/${currentAlias}/mine/train-center/mine/student/subPages/student/class`
            break
        /**   图文分类  */
        case LinkEnum.IMAGE_CATEGORY:
            location.href = `/${currentAlias}/picture/list?code=${code}`
            break
        /**  练习列表  */
        case LinkEnum.PRACTICE_LIST:
            if (code) {
                if (code.includes('/')) {
                    location.href = `/${currentAlias}/practice/list`
                } else {
                    userStore?.setBrushQstVisible(true, code)
                }
            }
            break
        /**  练习详情  */
        case LinkEnum.PRACTICE_DETAILS:
            if (code) {
                userStore?.setBrushQstVisible(true, code)
            }
            break
        /**  我的练习  */
        case LinkEnum.MY_PRACTICE:
            location.href = `/${currentAlias}/mine/exam-center/practice-list`
            break
        // eslint-disable-next-line no-duplicate-case
        case LinkEnum.REGISTRATION_DETAILS_PAGE:
            location.href = `/${currentAlias}/enroll-gateway/enroll-detail?code=${code}`
            break

        default:
            currentUrl && location.replace(`/${currentAlias}${currentUrl}`)
    }
}
