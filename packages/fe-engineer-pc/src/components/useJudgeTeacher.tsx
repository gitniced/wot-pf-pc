import { getCookie } from '@/storage'

/**
 * 判断当前身份是否是教师
 */
const useJudgeTeacher = () => {
    /**
     * 当前身份code
     * 教师身份 14
     * 学生身份 15
     */
    const identityCode = getCookie('SELECT_IDENTITY_CODE')
    const currentIdentity = identityCode ? identityCode.toString() : ''
    return currentIdentity === '14'
}

export default useJudgeTeacher
