import { makeAutoObservable } from 'mobx'
import api from './api'
import http from '@/servers/http'
import type {
    ActivityClassStatusStatisticsDto,
    ActivitySubmissionStatusDto,
    AnswerItem,
    CourseEvaluationDto,
    Key,
    LearningActivityDto,
    MapListLearningResourceSimpleDto,
    OutcomeItemDto,
    ResourceLibraryDetailDto,
    ResourceListDto,
    StudentHomeworkDto,
} from './interface'
import { history } from 'umi'
import qs from 'qs'
import { cloneDeep } from 'lodash'
import type { IQuestion } from '@/modules/question/types'
import { message } from 'antd'
import { RESOURCE_TYPE_LABEL, TeamCollaboration } from './const'
import customOpen from '@/utils/customOpen'

class store {
    constructor() {
        makeAutoObservable(this)
        if (!store.instance) {
            store.instance = this
        }
        return store.instance
    }
    /**是否请求成功 */
    public hasRequest: boolean = false
    /**班级编码 */
    public classCode: string = ''
    /**排课编码 */
    public scheduleCode: string = ''
    /**步骤编码 */
    public stepCode: string = ''
    /**当前活动 */
    public currentActivity: LearningActivityDto = {}
    /**当前活动code */
    public activityCode: string = ''
    /**学习步骤详情 */
    public activityList: LearningActivityDto[] = []
    /**学习成果列表 */
    public studyGain: OutcomeItemDto[] = []
    /**学习作业列表 */
    public studyHomework: StudentHomeworkDto[] = []
    /**提交状态 */
    public submissionStatus: ActivitySubmissionStatusDto = {}
    /**班级学习活动各状态统计 */
    public classStatusStatistics: ActivityClassStatusStatisticsDto = {}
    /** 课堂测验题目数据 */
    public questionList: IQuestion[] = []
    /** 课堂测验答案列表 */
    public answerList: AnswerItem[] = []
    /** 课堂测验批改列表 */
    public commentList: any[] = []
    /** 课堂测验提交中 */
    public isExamSubmitting: boolean = false
    /** 学习成果提交中 */
    public isGainSubmitting: boolean = false
    /** 课堂作业提交中 */
    public isHomeworkSubmitting: boolean = false
    /** 学习资源列表 */
    public resourceList: ResourceListDto[] = []
    /** 当前学习资源 */
    public currentResource: string = 'all'
    /** 课堂测验题目信息 */
    public questionInfo: any = {}

    /**是否已完成课堂表现评分 */
    public hasFinishPerformance: boolean = false
    /**是否隐藏课堂表现按钮 */
    public hidePerformanceBtn: boolean = true

    /**获取课堂表现是否隐藏 */
    getPerformanceHideByCourseEvaluations = async (scheduleCode: string) => {
        const courseEvaluations = (await http(api.getCourseEvaluations, 'get', {
            scheduleCode,
        })) as unknown as CourseEvaluationDto[]
        const performanceEvaluations = courseEvaluations.find(item => String(item.type) === '1')
        const hidePerformanceBtn =
            !performanceEvaluations || String(performanceEvaluations.weight) === '0'
        this.hidePerformanceBtn = hidePerformanceBtn
    }

    /**获取任务详情 */
    getActivityList = async (stepCode: string) => {
        http(`${api.getActivityList}?stepCode=${stepCode}`, 'post', { stepCode })
            .then(data => {
                let tempData = data as unknown as LearningActivityDto[]
                tempData = tempData.map(item => {
                    item.label = item.name
                    item.key = item.code
                    return item
                })
                tempData = tempData.sort((a, b) => a.sort! - b.sort!)
                // 获取第一个活动的code
                let activityCode = tempData[0]?.code || ''
                this.currentActivity = tempData[0] || {}
                this.updateCurrentActivityCodeAndQuery(activityCode, true)
                this.activityList = tempData as unknown as LearningActivityDto[]
            })
            .finally(() => {
                this.hasRequest = true
            })
    }
    /**获取学习资源 */
    getStudyResources = async (activityCode: string) => {
        http(`${api.getStudyResources}?activityCode=${activityCode}`, 'get', {})
            .then(data => {
                let resourceList: ResourceListDto[] = []
                let allList: Key[] = []
                Object.keys(data as unknown as MapListLearningResourceSimpleDto).forEach(key => {
                    const tempItem = {
                        key,
                        value: RESOURCE_TYPE_LABEL[key as keyof typeof RESOURCE_TYPE_LABEL],
                        list: ((data as unknown as MapListLearningResourceSimpleDto)?.[key]?.map?.(
                            (item: Key) => ({ ...item, kind: key }),
                        ) || []) as unknown as Key[],
                    }
                    allList = allList.concat(tempItem.list)
                    resourceList.push(tempItem)
                })
                if (resourceList.length > 0) {
                    const allTempItem = {
                        key: 'all',
                        value: '全部',
                        list: allList,
                    }
                    resourceList.unshift(allTempItem)

                    this.resourceList = resourceList
                } else {
                    this.resourceList = []
                }
            })
            .finally(() => {
                this.hasRequest = true
            })
    }

    /**获取学习成果 */
    getStudyGain = async (isTeacher: boolean, scheduleCode: string, activityCode: string) => {
        http(
            `${isTeacher ? api.getTeacherStudyGain : api.getStudyGain}`,
            isTeacher ? 'get' : 'post',
            {
                scheduleCode: isTeacher ? undefined : scheduleCode,
                activityCode,
            },
        )
            .then(data => {
                this.studyGain = (data as unknown as OutcomeItemDto[]) || []
            })
            .finally(() => {
                this.hasRequest = true
            })
    }
    /**获取学习课后作业 */
    getStudyHomework = async (activityCode: string) => {
        http(`${api.getStudyHomework}`, 'post', { activityCode })
            .then(data => {
                this.studyHomework = (data as unknown as StudentHomeworkDto[]) || []
            })
            .finally(() => {
                this.hasRequest = true
            })
    }
    /**获取课堂测验题目 */
    getQuestionList = async (activityCode: string, isTeacher: boolean, scheduleCode: string) => {
        http(`${isTeacher ? api.getQuestionAnswer : api.getQuestionList}`, 'get', {
            activityCode,
            scheduleCode,
        })
            .then((data: any) => {
                this.questionList = (data.questionList as IQuestion[]) || []
                this.answerList = data.answerList || []
                this.commentList = data.correctList || []
                this.questionInfo = data || []
            })
            .finally(() => {
                this.hasRequest = true
            })
    }

    /**编辑保存学习成果（待提交） */
    getStudyGainFile = async (activityCode: string) => {
        http(`${api.getStudyGainFile}`, 'post', { activityCode, studentCode: '2121' })
            .then(data => {
                this.studyGain = (data as unknown as OutcomeItemDto[]) || []
            })
            .finally(() => {
                this.hasRequest = true
            })
    }

    /**获取提交状态 */
    getSubmissionStatus = async (scheduleCode: string, activityCode: string, type: number) => {
        http(`${api.getSubmissionStatus}`, 'post', { scheduleCode, activityCode, type })
            .then(data => {
                this.submissionStatus = data as unknown as ActivitySubmissionStatusDto
            })
            .finally(() => {
                this.hasRequest = true
            })
    }
    /**获取班级学习活动各状态统计 */
    getClassStatusStatistics = async (scheduleCode: string, activityCode: string) => {
        http(`${api.getClassStatusStatistics}`, 'post', { scheduleCode, activityCode })
            .then(data => {
                const { classPerformanceStatus } =
                    data as unknown as ActivityClassStatusStatisticsDto
                if (classPerformanceStatus !== undefined) {
                    this.hasFinishPerformance = classPerformanceStatus
                }
                this.classStatusStatistics = data as unknown as ActivityClassStatusStatisticsDto
            })
            .finally(() => {
                this.hasRequest = true
            })
    }
    /** 更新当前学习资源 */
    updateCurrentResource = (resource: string) => {
        this.currentResource = resource
    }

    /**更新学习成果loading */
    updateStudyGainLoading = (outcomeCode: string, loading: boolean) => {
        const tempStudyGain = cloneDeep(this.studyGain)
        tempStudyGain.map(item => {
            if (item.code === outcomeCode) {
                item.loading = loading
            }
        })
        this.studyGain = tempStudyGain
    }
    /** 成果编辑处理
     * 1、检查成果文件是否存在
     * 2、不存在：创建web文件，提交学习成果的编辑内容，提交成功则跳转web文件
     * 3、存在：直接跳转web文件
     */
    onStudyGainEdit = async (
        isTeam: boolean,
        organizationCode: string,
        majorCode: string,
        scheduleCode: string,
        activityCode: string,
        outcomeCode: string,
        outcomeName: string,
        submitterCode: string,
        templateInfo: string,
        fileFormat: string,
    ) => {
        this.updateStudyGainLoading(outcomeCode, true)
        const dealEditHandler = async () => {
            if (fileFormat !== 'mind') {
                http(`${api.createWebFileByTemplate}`, 'post', {
                    format: fileFormat,
                    organizationCode,
                    teampCode: templateInfo,
                })
                    .then(webFile => {
                        if (webFile) {
                            http(api.bindWpsAndResource, 'post', {
                                wpsCode: webFile,
                                organizationCode,
                                majorCode,
                                name: outcomeName,
                                type: 4,
                                format: fileFormat,
                            })
                                .then(resourceRes => {
                                    if (resourceRes) {
                                        http(api.submitStudyGainEdit, 'post', {
                                            scheduleCode,
                                            outcomeCode,
                                            contentInfo: resourceRes,
                                            teamCode: isTeam ? submitterCode : undefined,
                                        })
                                            .then(res => {
                                                if (res) {
                                                    this.updateStudyGainLoading(outcomeCode, false)
                                                    this.getStudyGain(
                                                        false,
                                                        scheduleCode,
                                                        activityCode,
                                                    )
                                                    customOpen(
                                                        `/office/${fileFormat}/${resourceRes}`,
                                                        '_blank',
                                                    )
                                                } else {
                                                    this.updateStudyGainLoading(outcomeCode, false)
                                                }
                                            })
                                            .finally(() => {
                                                this.updateStudyGainLoading(outcomeCode, false)
                                            })
                                    } else {
                                        this.updateStudyGainLoading(outcomeCode, false)
                                    }
                                })
                                .catch(() => {
                                    this.updateStudyGainLoading(outcomeCode, false)
                                })
                        } else {
                            this.updateStudyGainLoading(outcomeCode, false)
                        }
                    })
                    .catch(() => {
                        this.updateStudyGainLoading(outcomeCode, false)
                    })
            } else {
                http(api.getMindJsonByTemplate, 'GET', { code: templateInfo })
                    .then(data => {
                        const { content = JSON.stringify({}) } = (data ||
                            {}) as unknown as ResourceLibraryDetailDto
                        http(api.bindWpsAndResource, 'post', {
                            organizationCode,
                            majorCode,
                            name: outcomeName,
                            type: 4,
                            format: fileFormat,
                            content,
                        })
                            .then(resourceRes => {
                                if (resourceRes) {
                                    http(api.submitStudyGainEdit, 'post', {
                                        scheduleCode,
                                        outcomeCode,
                                        contentInfo: resourceRes,
                                        teamCode: isTeam ? submitterCode : undefined,
                                    })
                                        .then(res => {
                                            if (res) {
                                                this.getStudyGain(false, scheduleCode, activityCode)
                                                customOpen(
                                                    `/office/${fileFormat}/${resourceRes}`,
                                                    '_blank',
                                                )
                                            } else {
                                                this.updateStudyGainLoading(outcomeCode, false)
                                            }
                                        })
                                        .finally(() => {
                                            this.updateStudyGainLoading(outcomeCode, false)
                                        })
                                } else {
                                    this.updateStudyGainLoading(outcomeCode, false)
                                }
                            })
                            .catch(() => {
                                this.updateStudyGainLoading(outcomeCode, false)
                            })
                    })
                    .catch(() => {
                        this.updateStudyGainLoading(outcomeCode, false)
                    })
            }
        }
        http(`${api.getSubmitterOutcome}`, 'post', {
            outcomeCode,
            submitterCode,
        })
            .then((checkData: OutcomeItemDto) => {
                if (checkData) {
                    const { contentUrl } = checkData || {}
                    if (!contentUrl) {
                        dealEditHandler()
                    } else {
                        this.getStudyGain(false, scheduleCode, activityCode)
                        customOpen(`/office/${fileFormat}/${contentUrl}`, '_blank')
                        this.updateStudyGainLoading(outcomeCode, false)
                    }
                } else {
                    dealEditHandler()
                }
            })
            .catch(() => {
                this.updateStudyGainLoading(outcomeCode, false)
            })
    }

    /**更新课后作业loading */
    updateHomeworkLoading = (homeworkCode: string, loading: boolean) => {
        const tempStudyHomework = cloneDeep(this.studyHomework)
        tempStudyHomework.map(item => {
            if (item.homeworkCode === homeworkCode) {
                item.loading = loading
            }
        })
        this.studyHomework = tempStudyHomework
    }

    /** 课后作业处理
     * 1、检查课后作业文件是否存在
     * 2、不存在：创建web文件，提交学习成果的编辑内容，提交成功则跳转web文件
     * 3、存在：直接跳转web文件
     */
    onHomeworkEdit = async (
        organizationCode: string,
        majorCode: string,
        scheduleCode: string,
        homeworkCode: string,
        homeworkName: string,
        templateInfo: string,
        fileFormat: string,
    ) => {
        this.updateHomeworkLoading(homeworkCode, true)
        const dealEditHandler = async () => {
            if (fileFormat !== 'mind') {
                http(`${api.createWebFileByTemplate}`, 'post', {
                    format: fileFormat,
                    organizationCode,
                    teampCode: templateInfo,
                })
                    .then(webFile => {
                        if (webFile) {
                            http(api.bindWpsAndResource, 'post', {
                                wpsCode: webFile,
                                organizationCode,
                                majorCode,
                                name: homeworkName,
                                type: 5,
                                format: fileFormat,
                            })
                                .then(resourceRes => {
                                    if (resourceRes) {
                                        http(api.submitHomeworkEdit, 'post', {
                                            scheduleCode,
                                            homeworkCode,
                                            contentInfo: webFile,
                                        })
                                            .then(res => {
                                                if (res) {
                                                    customOpen(
                                                        `/office/${fileFormat}/${resourceRes}`,
                                                        '_blank',
                                                    )
                                                }
                                            })
                                            .finally(() => {
                                                this.updateHomeworkLoading(homeworkCode, false)
                                            })
                                    }
                                })
                                .catch(() => {
                                    this.updateHomeworkLoading(homeworkCode, false)
                                })
                        }
                    })
                    .catch(() => {
                        this.updateHomeworkLoading(homeworkCode, false)
                    })
            } else {
                http(api.getMindJsonByTemplate, 'GET', { code: templateInfo })
                    .then(data => {
                        const { content = JSON.stringify({}) } = (data ||
                            {}) as unknown as ResourceLibraryDetailDto
                        http(api.bindWpsAndResource, 'post', {
                            organizationCode,
                            majorCode,
                            name: homeworkName,
                            type: 5,
                            format: fileFormat,
                            content,
                        })
                            .then(resourceRes => {
                                if (resourceRes) {
                                    http(api.submitHomeworkEdit, 'post', {
                                        scheduleCode,
                                        homeworkCode,
                                        contentInfo: resourceRes,
                                    })
                                        .then(res => {
                                            if (res) {
                                                customOpen(
                                                    `/office/${fileFormat}/${resourceRes}`,
                                                    '_blank',
                                                )
                                            }
                                        })
                                        .finally(() => {
                                            this.updateHomeworkLoading(homeworkCode, false)
                                        })
                                }
                            })
                            .catch(() => {
                                this.updateHomeworkLoading(homeworkCode, false)
                            })
                    })
                    .catch(() => {
                        this.updateHomeworkLoading(homeworkCode, false)
                    })
            }
        }
        const checkData = (await http(`${api.getSubmitterHomework}`, 'get', {
            homeworkCode,
        })) as unknown as OutcomeItemDto
        if (checkData) {
            const { contentInfo } = checkData || {}
            if (!contentInfo) {
                dealEditHandler()
            } else {
                customOpen(`/office/${fileFormat}/${contentInfo}`, '_blank')
                this.updateHomeworkLoading(homeworkCode, false)
            }
        } else {
            dealEditHandler()
        }
    }

    /**提交活动内容
     * 1、课堂测验
     * 2、学习成果
     * 3、课后作业
     */
    submitActivityContent = async ({
        scheduleCode,
        activityCode,
        submissionType,
        submissionCode,
        type,
        groupCode,
    }: {
        scheduleCode: string
        activityCode: string
        submissionType: number
        submissionCode?: string
        type?: number
        groupCode?: string
    }) => {
        let params = {}
        switch (submissionType) {
            case 1:
                this.isExamSubmitting = true
                params = {
                    scheduleCode,
                    activityCode,
                    submissionType,
                }
                break
            case 2:
                this.isGainSubmitting = true
                params = {
                    scheduleCode,
                    activityCode,
                    submissionType,
                    type,
                    groupCode: type === TeamCollaboration ? groupCode : undefined,
                }
                break
            case 3:
                this.isHomeworkSubmitting = true
                params = {
                    scheduleCode,
                    activityCode,
                    submissionType,
                    submissionCode,
                }
                break
            default:
                params = {}
        }
        http(`${api.submitActivity}`, 'post', params)
            .then(data => {
                if (data) {
                    message.success('提交成功')
                } else {
                    message.error('提交失败')
                }
            })
            .finally(() => {
                switch (submissionType) {
                    case 1:
                        this.isExamSubmitting = false
                        break
                    case 2:
                        this.isGainSubmitting = false
                        this.getStudyGain(false, scheduleCode, activityCode)
                        break
                    case 3:
                        this.isHomeworkSubmitting = false
                        this.getStudyHomework(activityCode)
                        break
                }
                this.getSubmissionStatus(scheduleCode, activityCode, type!)
            })
    }

    /**保存课后作业的编辑结果 */
    submitHomeworkEdit = async (
        scheduleCode: string,
        homeworkCode: string,
        contentInfo: string,
    ) => {
        http(`${api.submitHomeworkEdit}`, 'post', {
            scheduleCode,
            homeworkCode,
            contentInfo,
        })
            .then(data => {
                if (data) {
                    const studyHomework = cloneDeep(this.studyHomework)
                    const newStudyHomework = studyHomework.map(item => {
                        if (item.homeworkCode === homeworkCode) {
                            return { ...item, submissionStatus: 1 }
                        } else {
                            return item
                        }
                    })
                    this.studyHomework = newStudyHomework
                }
            })
            .finally(() => {
                this.hasRequest = true
            })
    }

    /**提交课后作业 */
    submitAllHomework = async (homeworkCode: string, activityCode: string) => {
        this.updateHomeworkLoading(homeworkCode, true)
        http(`${api.submitAllHomework}`, 'post', { homeworkCode })
            .then(data => {
                if (data) {
                    this.getStudyHomework(activityCode)
                }
            })
            .finally(() => {
                this.updateHomeworkLoading(homeworkCode, false)
            })
    }

    /**更新当前活动code和路由query */
    updateCurrentActivityCodeAndQuery = (activityCode?: string, isInit: boolean = false) => {
        const currentPath = history.location.pathname
        const currentQuery = history.location.query
        if (isInit) {
            this.activityCode = activityCode!
            const newQuery = { ...currentQuery, activityCode }
            history.replace(`${currentPath}?${qs.stringify(newQuery)}`)
        } else {
            if (activityCode && activityCode !== this.activityCode) {
                this.activityCode = activityCode!
                const newQuery = { ...currentQuery, activityCode }
                history.replace(`${currentPath}?${qs.stringify(newQuery)}`)
            }
        }
    }

    /**更新当前页面query */
    updatePageParams = (classCode?: string, scheduleCode?: string, stepCode?: string) => {
        this.classCode = classCode!
        this.scheduleCode = scheduleCode!
        this.stepCode = stepCode!
    }

    /**更新当前页面query */
    updateGainItem = (data: OutcomeItemDto, scheduleCode: string) => {
        const { type, code, contentUrl, groupCode } = data || {}
        const tempStudyGain = cloneDeep(this.studyGain)
        const newStudyGain = tempStudyGain.map(item => {
            if (item.code === data.code) {
                return { ...item, ...data }
            } else {
                return item
            }
        })
        this.studyGain = newStudyGain

        http(api.submitStudyGainEdit, 'post', {
            scheduleCode,
            outcomeCode: code,
            contentInfo: contentUrl,
            teamCode: type === TeamCollaboration ? groupCode : undefined,
        }).then(res => {
            if (res) {
                message.success('更新成功')
            }
        })
    }

    /**提交课堂测验 */
    submitQuestion = async (answerList: any, activityCode: string, scheduleCode: string) => {
        http(api.submitQuestion, 'post', { answerList, activityCode }).then((res: any) => {
            if (res) {
                message.success('提交成功')
                this.getQuestionList(activityCode, false, scheduleCode)
            }
        })
    }
}

export default store
