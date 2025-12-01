import { makeAutoObservable, runInAction, toJS } from 'mobx'
import { makePersistable, isHydrated } from 'mobx-persist-store'
import {
    editCourseConversionKeyInformation,
    editCourseStylistic1,
    editCourseStylistic2,
    getCourseConversionKeyInformation,
    getCourseDetailBaseInfo,
    getCourseStylistic1,
    getCourseStylistic2,
    getCourseTaskActivityList,
    getCourseTaskList,
    getCourseTaskStageList,
    getCourseTaskDetail,
    getCourseTaskStageDetail,
    getCourseTaskActivityDetail,
    saveCourseTask,
    saveCourseTaskStage,
    saveCourseTaskActivity,
    getCourseStylistic7,
    editCourseStylistic7,
    getCourseStylistic11,
    editCourseStylistic11,
    getCourseStylistic12,
    editCourseStylistic12,
    getCourseStylistic4,
    editCourseStylistic4,
    getCourseStylistic5,
    editCourseStylistic5,
    getCourseStylistic8,
    editCourseStylistic8,
    getCourseStylistic3,
    editCourseStylistic3,
    getCourseStylistic6,
    editCourseStylistic6,
    getCourseStylistic9,
    editCourseStylistic9,
    getCourseStylistic10,
    editCourseStylistic10,
    getCourseTaskTeachingPlanformation,
    editCourseTaskTeachingPlanformation,
    getCourseCheckInformation,
    editCourseCheckInformation,
    getCourseTaskListWayFinishStatus,
    removeCourseTask,
    getCourseTaskListWayTaskFinishStatus,
} from './service'
import type { ICourse, ICourseDesignOverview } from './types'
import { isObjectEqual } from '@/utils/object'
import {
    COURSE_DESIGN_STEP,
    COURSE_DESIGN_LEARNING_TASK_TYPE,
    COURSE_DESIGN_STYLISTIC,
    courseDesignStylisticList,
} from './const'
import type { IAIExchangeData } from '../ai/types'
import { message } from 'antd'
import { BIT_TYPE } from '../ai/const'
import type { ICourseConversionKeyInformation } from './types/conversion'
import type { ICourseStylistic1 } from './types/stylistic1'
import type { ICourseStylistic2 } from './types/stylistic2'
import type { ICourseStylistic3 } from './types/stylistic3'
import type { ICourseStylistic6 } from './types/stylistic6'
import type { ICourseStylistic9 } from './types/stylistic9'
import type { ICourseStylistic10 } from './types/stylistic10'
import type {
    ILearningTask,
    IListBaseItem,
    ILearningStage,
    ILearningActivity,
} from './types/learning'
import type { ICourseTeachingPlanInformation } from './types/teaching'
import type { ICourseStylistic7 } from './types/stylistic7'
import type { ICourseStylistic11 } from './types/stylistic11'
import type { ICourseStylistic12 } from './types/stylistic12'
import type { ICourseStylistic4 } from './types/stylistic4'
import type { ICourseStylistic5 } from './types/stylistic5'
import type { ICourseStylistic8 } from './types/stylistic8'
import type { ICourseCheckInformation } from './types/check'

class CourseStore {
    courseCode: string

    course: ICourse

    loadRefreshKey: string

    designOverview: ICourseDesignOverview

    conversionKeyInformation: ICourseConversionKeyInformation

    stylistic1: ICourseStylistic1

    stylistic2: ICourseStylistic2

    stylistic3: ICourseStylistic3

    // 基于taskCode的MAP存储，避免数据冲突
    stylistic6Map: Record<string, ICourseStylistic6>

    stylistic9Map: Record<string, ICourseStylistic9>

    stylistic10Map: Record<string, ICourseStylistic10>

    taskList: IListBaseItem[]

    stageMap: Record<string, IListBaseItem[]>

    activityMap: Record<string, IListBaseItem[]>

    taskDetailMap: Record<string, ILearningTask>

    stageDetailMap: Record<string, ILearningStage>

    activityDetailMap: Record<string, ILearningActivity>

    activeListItem?: IListBaseItem & { type: COURSE_DESIGN_LEARNING_TASK_TYPE }

    stylisticTaskFinishMap: Record<string, Record<string, number>>

    stylistic7: ICourseStylistic7

    stylistic11: ICourseStylistic11

    stylistic12: ICourseStylistic12

    stylistic4: ICourseStylistic4

    stylistic5: ICourseStylistic5

    stylistic8: ICourseStylistic8

    checkInformation: ICourseCheckInformation

    teachingPlanInformation: ICourseTeachingPlanInformation

    parentSetActiveKey?: (key: number | null) => void

    expandTaskMethod?: () => void | Promise<void>

    learningCurrentTreeMap(type: COURSE_DESIGN_LEARNING_TASK_TYPE, code: string) {
        const result: {
            taskCode: string | null
            stageCode: string | null
            activityCode: string | null
        } = {
            taskCode: null,
            stageCode: null,
            activityCode: null,
        }

        try {
            if (!code) return result

            if (type === COURSE_DESIGN_LEARNING_TASK_TYPE.task) {
                result.taskCode = code
            } else if (type === COURSE_DESIGN_LEARNING_TASK_TYPE.stage) {
                result.stageCode = code

                for (const [taskCode, stages] of Object.entries(this.stageMap)) {
                    const stageExists = stages.some(stage => stage.code === code)
                    if (stageExists) {
                        result.taskCode = taskCode
                        break
                    }
                }
            } else if (type === COURSE_DESIGN_LEARNING_TASK_TYPE.activity) {
                result.activityCode = code

                for (const [sCode, activities] of Object.entries(this.activityMap)) {
                    const activityExists = activities.some(activity => activity.code === code)
                    if (activityExists) {
                        result.stageCode = sCode
                        break
                    }
                }

                if (result.stageCode) {
                    for (const [taskCode, stages] of Object.entries(this.stageMap)) {
                        const stageExists = stages.some(stage => stage.code === result.stageCode)
                        if (stageExists) {
                            result.taskCode = taskCode
                            break
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Error getting learningCurrentTreeMap:', error)
        }

        return result
    }

    get activeTaskCode() {
        try {
            if (this.activeListItem?.type === COURSE_DESIGN_LEARNING_TASK_TYPE.task) {
                return this.activeListItem.code
            } else if (this.activeListItem?.type === COURSE_DESIGN_LEARNING_TASK_TYPE.stage) {
                // 优先从 stageDetailMap 获取 taskCode
                const stageDetail = this.stageDetailMap[this.activeListItem.code]
                if (stageDetail?.taskCode) {
                    return stageDetail.taskCode
                }

                // 如果详情中没有，从 stageMap 遍历查找对应的 taskCode
                for (const [taskCode, stages] of Object.entries(this.stageMap)) {
                    const stageExists = stages.some(
                        stage => stage.code === this.activeListItem.code,
                    )
                    if (stageExists) {
                        return taskCode
                    }
                }
            } else if (this.activeListItem?.type === COURSE_DESIGN_LEARNING_TASK_TYPE.activity) {
                // 优先从 activityDetailMap 获取详情数据
                const activityDetail = this.activityDetailMap[this.activeListItem.code]
                let stageCode = ''

                // 如果有活动详情，获取 stepCode 然后查找对应的阶段
                if (activityDetail?.stepCode) {
                    // 遍历阶段详情，查找包含该步骤的阶段
                    for (const [sCode, stageDetail] of Object.entries(this.stageDetailMap)) {
                        if (
                            stageDetail?.learningSteps?.some(
                                step => step.code === activityDetail.stepCode,
                            )
                        ) {
                            stageCode = sCode
                            break
                        }
                    }
                }

                // 如果没有找到 stageCode，从 activityMap 查找
                if (!stageCode) {
                    for (const [sCode, activities] of Object.entries(this.activityMap)) {
                        const activityExists = activities.some(
                            activity => activity.code === this.activeListItem.code,
                        )
                        if (activityExists) {
                            stageCode = sCode
                            break
                        }
                    }
                }

                // 有了 stageCode 后，查找对应的 taskCode
                if (stageCode) {
                    // 优先从 stageDetailMap 获取 taskCode
                    const stageDetail = this.stageDetailMap[stageCode]
                    if (stageDetail?.taskCode) {
                        return stageDetail.taskCode
                    }

                    // 如果详情中没有，从 stageMap 遍历查找对应的 taskCode
                    for (const [taskCode, stages] of Object.entries(this.stageMap)) {
                        const stageExists = stages.some(stage => stage.code === stageCode)
                        if (stageExists) {
                            return taskCode
                        }
                    }
                }
            }
        } catch (error) {
            return null
        }

        return null
    }

    get stepReadyStatusMap() {
        return {
            [COURSE_DESIGN_STEP.conversion]: this.designOverview.conversionOverview,
            [COURSE_DESIGN_STEP.learning]: this.designOverview.learningOverview,
            [COURSE_DESIGN_STEP.teaching]: this.designOverview.teachingOverview,
            [COURSE_DESIGN_STEP.check]: this.designOverview.checkOverview,
        }
    }

    constructor(courseCode: string) {
        makeAutoObservable(this)
        this.courseCode = courseCode
        this.course = {
            code: courseCode,
            coverUrl: '',
            customCoverStatus: 0,
            levelCode: '',
            majorCode: '',
            name: '',
        }
        this.loadRefreshKey = `${Date.now()}_${Math.random()}`
        this.designOverview = {
            conversionOverview: undefined,
            learningOverview: undefined,
            teachingOverview: undefined,
            checkOverview: undefined,
            conversionKeyInformation: undefined,
            learningKeyInformation: undefined,
            teachingKeyInformation: undefined,
            checkKeyInformation: undefined,
            total: undefined,
            waysOne: undefined,
            waysTwo: undefined,
            waysThree: undefined,
            waysFour: undefined,
            waysFive: undefined,
            waysSix: undefined,
            waysSeven: undefined,
            waysEight: undefined,
            waysNine: undefined,
            waysTen: undefined,
            waysEleven: undefined,
            waysTwelve: undefined,
        }
        this.conversionKeyInformation = {
            courseCode: courseCode,
            localIndustryOverview: '',
            schoolBasedConversion: '',
            teachingConditionsOverview: '',
        }

        this.teachingPlanInformation = {
            taskList: [],
            finalityTask: {
                basePeriod: 0,
                estimatePeriod: 0,
                motorizedPeriod: 0,
            },
            taskActivityDesignList: [],
        }

        this.stylistic1 = {
            courseCode: courseCode,
            taskAnalysis: [],
            conversionSuggestions: [],
        }
        this.stylistic2 = {
            courseCode: courseCode,
            tasks: [],
        }

        this.stylistic3 = {
            courseCode: courseCode,
            learningTaskDesignDtos: [],
        }

        this.taskList = []
        this.stageMap = {}
        this.activityMap = {}
        this.taskDetailMap = {}
        this.stageDetailMap = {}
        this.activityDetailMap = {}
        this.stylisticTaskFinishMap = {}

        this.checkInformation = {
            assessmentResultCompositionList: [],
            evaluatedRubricList: [],
        }

        this.stylistic7 = {
            period: 0,
            valueAnalysis: '',
            academicSituationAnalysisList: [],
            focus: '',
            nodus: '',
            stageMastermindList: [],
        }

        this.stylistic11 = {
            taskList: [],
            finalityTask: {
                basePeriod: 0,
                estimatePeriod: 0,
                motorizedPeriod: 0,
            },
            taskTeachingScheduleList: [],
            finalityWeekly: 0,
            finalityPeriod: 0,
            finalityAssessContent: '',
        }

        this.stylistic12 = {
            scenario: '',
            materials: '',
            requirements: '',
            academicSituationAnalysisList: [],
            stageMastermindList: [],
        }

        this.stylistic4 = {
            stageList: [],
            literacyAssessmentList: [],
            assessmentResultCompositionList: [],
        }

        this.stylistic5 = {
            finalAssessmentName: '',
            finalAssessmentDesc: '',
            finalAssessmentQuestionsStageList: [],
            finalAssessmentQuestionList: [],
            finalAssessmentScoringCriterianList: [],
        }

        this.stylistic8 = {
            studyTaskAssessmentPlanStageList: [],
            studyTaskAssessmentPlanCriteriaList: [],
            studyTaskAssessmentPlanGradeComposeList: [],
        }

        // 初始化基于taskCode的MAP存储
        this.stylistic6Map = {}
        this.stylistic9Map = {}
        this.stylistic10Map = {}

        makePersistable(this, {
            name: `engineer_courseStore_${courseCode}`,
            properties: [
                'courseCode',
                'course',
                'designOverview',
                'conversionKeyInformation',
                'taskList',
                'checkInformation',
                'teachingPlanInformation',
                'stylistic1',
                'stylistic2',
                'stylistic3',
                'stylistic4',
                'stylistic5',
                'stylistic6Map',
                'stylistic7',
                'stylistic8',
                'stylistic9Map',
                'stylistic10Map',
                'stylistic11',
                'stylistic12',
            ],
            storage: window.sessionStorage,
        })

        this.init()
    }

    private async init() {
        getCourseDetailBaseInfo(this.courseCode).then(res => {
            runInAction(() => {
                this.course = res
            })
        })

        this.loadOverview()
    }

    async loadOverview() {
        getCourseTaskListWayFinishStatus({
            courseCode: this.courseCode,
            waysCodeList: [...courseDesignStylisticList, 21, 22, 23, 24],
        }).then(res => {
            runInAction(() => {
                const waysTotal = courseDesignStylisticList.map(v => res[v]).filter(v => !!v).length

                const conversionOverview = !!res[21] && !!res[1] && res[2] ? 1 : 0
                const learningOverview =
                    !!res[22] && !!res[3] && res[6] && res[9] && res[10] ? 1 : 0
                const teachingOverview = !!res[23] && res[7] && res[11] && res[12] ? 1 : 0
                const checkOverview = !!res[24] && !!res[4] && res[5] && res[8] ? 1 : 0

                this.designOverview = {
                    ...this.designOverview,
                    conversionOverview: conversionOverview,
                    learningOverview: learningOverview,
                    teachingOverview: teachingOverview,
                    checkOverview: checkOverview,
                    conversionKeyInformation: res[21],
                    learningKeyInformation: res[22],
                    teachingKeyInformation: res[23],
                    checkKeyInformation: res[24],
                    total: waysTotal,
                    waysOne: res[COURSE_DESIGN_STYLISTIC.stylistic1],
                    waysTwo: res[COURSE_DESIGN_STYLISTIC.stylistic2],
                    waysThree: res[COURSE_DESIGN_STYLISTIC.stylistic3],
                    waysFour: res[COURSE_DESIGN_STYLISTIC.stylistic4],
                    waysFive: res[COURSE_DESIGN_STYLISTIC.stylistic5],
                    waysSix: res[COURSE_DESIGN_STYLISTIC.stylistic6],
                    waysSeven: res[COURSE_DESIGN_STYLISTIC.stylistic7],
                    waysEight: res[COURSE_DESIGN_STYLISTIC.stylistic8],
                    waysNine: res[COURSE_DESIGN_STYLISTIC.stylistic9],
                    waysTen: res[COURSE_DESIGN_STYLISTIC.stylistic10],
                    waysEleven: res[COURSE_DESIGN_STYLISTIC.stylistic11],
                    waysTwelve: res[COURSE_DESIGN_STYLISTIC.stylistic12],
                }
            })
        })
    }

    async loadStylisticTaskFinishMap(stylistic: COURSE_DESIGN_STYLISTIC) {
        const res = await getCourseTaskListWayTaskFinishStatus({
            courseCode: this.courseCode,
            way: stylistic,
        })

        runInAction(() => {
            this.stylisticTaskFinishMap = {
                ...this.stylisticTaskFinishMap,
                [stylistic]: res,
            }
        })
    }

    async loadOverviewPart(...args: number[]) {
        const res = await getCourseTaskListWayFinishStatus({
            courseCode: this.courseCode,
            waysCodeList: args,
        })

        const overview = toJS(this.designOverview)

        args.forEach(code => {
            switch (String(code)) {
                case '1':
                    overview.waysOne = res[1]
                    break
                case '2':
                    overview.waysTwo = res[2]
                    break
                case '3':
                    overview.waysThree = res[3]
                    break
                case '4':
                    overview.waysFour = res[4]
                    break
                case '5':
                    overview.waysFive = res[5]
                    break
                case '6':
                    overview.waysSix = res[6]
                    break
                case '7':
                    overview.waysSeven = res[7]
                    break
                case '8':
                    overview.waysEight = res[8]
                    break
                case '9':
                    overview.waysNine = res[9]
                    break
                case '10':
                    overview.waysTen = res[10]
                    break
                case '11':
                    overview.waysEleven = res[11]
                    break
                case '12':
                    overview.waysTwelve = res[12]
                    break
                case '21':
                    overview.conversionKeyInformation = res[21]
                    break
                case '22':
                    overview.learningKeyInformation = res[22]
                    break
                case '23':
                    overview.teachingKeyInformation = res[23]
                    break
                case '24':
                    overview.checkKeyInformation = res[24]
                    break
                default:
                    break
            }
        })

        const conversionOverview =
            !!overview.conversionKeyInformation && !!overview.waysOne && overview.waysTwo ? 1 : 0
        const learningOverview =
            !!overview.learningKeyInformation &&
            !!overview.waysThree &&
            overview.waysSix &&
            overview.waysNine &&
            overview.waysTen
                ? 1
                : 0
        const teachingOverview =
            !!overview.teachingKeyInformation &&
            overview.waysSeven &&
            overview.waysEleven &&
            overview.waysTwelve
                ? 1
                : 0
        const checkOverview =
            !!overview.checkKeyInformation &&
            !!overview.waysFour &&
            overview.waysFive &&
            overview.waysEight
                ? 1
                : 0

        const waysTotal = [
            overview.waysOne,
            overview.waysTwo,
            overview.waysThree,
            overview.waysFour,
            overview.waysFive,
            overview.waysSix,
            overview.waysSeven,
            overview.waysEight,
            overview.waysNine,
            overview.waysTen,
            overview.waysEleven,
            overview.waysTwelve,
        ].filter(v => !!v).length

        runInAction(() => {
            this.designOverview = {
                ...overview,
                total: waysTotal,
                conversionOverview: conversionOverview,
                learningOverview: learningOverview,
                teachingOverview: teachingOverview,
                checkOverview: checkOverview,
            }
        })
    }

    async loadConversion() {
        const res = await getCourseConversionKeyInformation(this.courseCode)
        runInAction(() => {
            this.conversionKeyInformation = res
        })
        return res
    }

    async saveConversionKeyInformation(
        obj: Partial<Omit<ICourseConversionKeyInformation, 'courseCode'>>,
    ) {
        const _conversionKeyInformation = {
            ...this.conversionKeyInformation,
            ...obj,
            courseCode: this.courseCode,
        }

        if (isObjectEqual(this.conversionKeyInformation, _conversionKeyInformation)) return true

        runInAction(() => {
            this.conversionKeyInformation = _conversionKeyInformation
        })

        const result = await editCourseConversionKeyInformation(_conversionKeyInformation)

        if (result) {
            await this.loadOverviewPart(21)
        }

        return result
    }

    async getCourseTaskList() {
        const taskList = await getCourseTaskList(this.courseCode)

        runInAction(() => {
            this.taskList = taskList?.sort((a, b) => a.sort - b.sort) || []
        })

        if (taskList?.length > 0) {
            const firstTask = taskList[0]
            this.setActiveListItem(firstTask, COURSE_DESIGN_LEARNING_TASK_TYPE.task)
        }
    }

    async removeCourseTask(taskCode: string) {
        const result = await removeCourseTask(taskCode)

        if (result) {
            message.success('删除成功')
            await this.loadLearning(true)
            this.loadOverview()
            setTimeout(async () => {
                await this.callExpandTaskMethod()
            }, 100)
        }

        return result
    }

    async loadTeaching() {
        const res = await getCourseTaskTeachingPlanformation(this.courseCode)

        runInAction(() => {
            this.teachingPlanInformation = res
        })
        return res
    }

    async saveTeachingPlanInformation(
        obj: Partial<Omit<ICourseTeachingPlanInformation, 'courseCode'>>,
    ) {
        const _teachingPlanInformation = {
            ...this.teachingPlanInformation,
            ...obj,
        }

        if (isObjectEqual(this.teachingPlanInformation, _teachingPlanInformation)) return true

        runInAction(() => {
            this.teachingPlanInformation = _teachingPlanInformation
        })

        const result = await editCourseTaskTeachingPlanformation(_teachingPlanInformation)

        if (result) {
            await this.loadOverviewPart(23)
        }

        return result
    }

    async loadStylistic1() {
        const res = await getCourseStylistic1(this.courseCode)
        runInAction(() => {
            this.stylistic1 = res
        })
        return res
    }

    async saveStylistic1(obj: Partial<Omit<ICourseStylistic1, 'courseCode'>>) {
        const _stylistic1 = {
            ...this.stylistic1,
            ...obj,
            courseCode: this.courseCode,
        }
        if (isObjectEqual(this.stylistic1, _stylistic1)) return true

        runInAction(() => {
            this.stylistic1 = _stylistic1
        })

        const result = await editCourseStylistic1(_stylistic1)

        if (result) {
            this.loadOverviewPart(COURSE_DESIGN_STYLISTIC.stylistic1)
        }

        return result
    }

    async loadStylistic2() {
        const res = await getCourseStylistic2(this.courseCode)
        runInAction(() => {
            this.stylistic2 = res
        })
        return res
    }

    async saveStylistic2(obj: Partial<Omit<ICourseStylistic2, 'courseCode'>>) {
        const _stylistic2 = {
            ...this.stylistic2,
            ...obj,
            courseCode: this.courseCode,
        }
        if (isObjectEqual(this.stylistic2, _stylistic2)) return true

        runInAction(() => {
            this.stylistic2 = _stylistic2
        })

        const result = await editCourseStylistic2(_stylistic2)

        if (result) {
            this.loadOverviewPart(COURSE_DESIGN_STYLISTIC.stylistic2)
        }

        return result
    }

    // 设置父页面的 setActiveKey 方法
    setParentSetActiveKey(setActiveKey: (key: number | null) => void) {
        this.parentSetActiveKey = setActiveKey
    }

    // 调用父页面的 setActiveKey 方法
    callParentSetActiveKey(key: number | null) {
        if (this.parentSetActiveKey) {
            this.parentSetActiveKey(key)
        }
    }

    // 设置展开任务方法
    setExpandTaskMethod(method: () => void | Promise<void>) {
        this.expandTaskMethod = method
    }

    // 调用展开任务方法
    async callExpandTaskMethod() {
        await this.expandTaskMethod?.()
    }

    async loadLearning(refresh = false) {
        const taskList = await getCourseTaskList(this.courseCode)
        runInAction(() => {
            this.taskList = taskList?.sort((a, b) => a.sort - b.sort) || []
        })

        // 设置默认激活第一个任务，但不预加载所有数据
        if (taskList?.length > 0 && (!this.activeListItem || refresh)) {
            const firstTask = taskList[0]
            await this.setActiveListItem(firstTask, COURSE_DESIGN_LEARNING_TASK_TYPE.task)
        }
    }

    async loadTasks() {
        const taskList = await getCourseTaskList(this.courseCode)
        runInAction(() => {
            this.taskList = taskList?.sort((a, b) => a.sort - b.sort) || []
        })
    }

    /**
     * 加载指定任务的阶段列表
     */
    async loadTaskStages(taskCode: string) {
        const stageList = await getCourseTaskStageList(taskCode)
        runInAction(() => {
            this.stageMap = {
                ...this.stageMap,
                [taskCode]: stageList,
            }
        })

        return stageList
    }

    /**
     * 加载指定阶段的活动列表
     */
    async loadStageActivities(stageCode: string) {
        const activityList = await getCourseTaskActivityList(stageCode)
        runInAction(() => {
            this.activityMap = {
                ...this.activityMap,
                [stageCode]: activityList,
            }
        })

        return activityList
    }

    /**
     * 加载任务详情
     */
    async loadTaskDetail(taskCode: string) {
        const taskDetail = await getCourseTaskDetail(taskCode)
        runInAction(() => {
            this.taskDetailMap = {
                ...this.taskDetailMap,
                [taskCode]: taskDetail,
            }
        })

        return taskDetail
    }

    /**
     * 加载阶段详情
     */
    async loadStageDetail(stageCode: string) {
        const stageDetail = await getCourseTaskStageDetail(stageCode)
        runInAction(() => {
            this.stageDetailMap = {
                ...this.stageDetailMap,
                [stageCode]: stageDetail,
            }
        })

        return stageDetail
    }

    /**
     * 加载活动详情
     */
    async loadActivityDetail(activityCode: string) {
        const activityDetail = await getCourseTaskActivityDetail(activityCode)
        runInAction(() => {
            this.activityDetailMap = {
                ...this.activityDetailMap,
                [activityCode]: activityDetail,
            }
        })

        return activityDetail
    }

    /**
     * 保存任务信息
     */
    async saveTask(taskCode: string, obj: Partial<Omit<ILearningTask, 'courseCode' | 'code'>>) {
        // 优先从 taskDetailMap 获取详情数据
        let currentTask = this.taskDetailMap[taskCode]

        // 如果详情中没有，再从 taskList 获取基础信息
        if (!currentTask) {
            const taskIndex = this.taskList.findIndex(item => item.code === taskCode)
            if (taskIndex === -1) return false

            currentTask = this.taskList[taskIndex] as ILearningTask
        }

        const updatedTask = {
            ...currentTask,
            ...obj,
        }

        // 检查是否有变化
        if (isObjectEqual(currentTask, updatedTask)) return true

        // 更新本地状态
        runInAction(() => {
            // 更新详情缓存
            this.taskDetailMap[taskCode] = updatedTask

            // 更新 taskList 中的基础信息
            const taskIndex = this.taskList.findIndex(item => item.code === taskCode)
            if (taskIndex !== -1) {
                this.taskList[taskIndex] = {
                    ...this.taskList[taskIndex],
                    code: updatedTask.code,
                    name: updatedTask.name,
                    sort: updatedTask.sort,
                }
                this.taskList = [...this.taskList]
            }

            // 如果当前激活项是被更新的任务，同步更新激活项信息
            if (
                this.activeListItem?.code === taskCode &&
                this.activeListItem?.type === COURSE_DESIGN_LEARNING_TASK_TYPE.task
            ) {
                this.activeListItem = {
                    ...this.activeListItem,
                    name: updatedTask.name,
                    sort: updatedTask.sort,
                }
            }

            updatedTask.learningStages?.forEach(item => {
                const mapStage = this.stageDetailMap[item.code]
                if (mapStage) {
                    mapStage.name = item.name
                    mapStage.sort = item.sort
                }
            })
        })

        const result = await saveCourseTask(updatedTask)

        if (result) {
            await this.loadOverviewPart(22)
            this.loadTasks()
        }

        return result
    }

    /**
     * 新增任务
     */
    async addTask(obj: Omit<ILearningTask, 'courseCode' | 'code'>) {
        const newTask = {
            code: '',
            name: obj.name,
            sort: obj.sort,
        }

        // 添加到本地状态
        runInAction(() => {
            this.taskList.push(newTask)
        })

        // 保存到服务器
        const result = await saveCourseTask({
            ...obj,
            courseCode: this.courseCode,
        })

        // 重新加载数据以获取服务器生成的 code
        if (result) {
            await this.loadLearning()
        }

        return result
    }

    /**
     * 保存阶段信息
     */
    async saveStage(stageCode: string, obj: Partial<Omit<ILearningStage, 'code' | 'taskCode'>>) {
        // 优先从 stageDetailMap 获取详情数据
        let currentStage = this.stageDetailMap[stageCode]
        let taskCode = ''

        // 如果详情中没有，再从 stageMap 获取基础信息
        if (!currentStage) {
            let stageIndex = -1
            let taskStages: IListBaseItem[] = []

            for (const [tCode, stages] of Object.entries(this.stageMap)) {
                const index = stages.findIndex(stage => stage.code === stageCode)
                if (index !== -1) {
                    taskCode = tCode
                    stageIndex = index
                    taskStages = stages
                    break
                }
            }

            if (stageIndex === -1) return false

            currentStage = taskStages[stageIndex] as ILearningStage
        } else {
            // 从详情数据中获取 taskCode
            taskCode = currentStage.taskCode
        }

        const updatedStage = {
            ...currentStage,
            ...obj,
        }

        // 检查是否有变化
        if (isObjectEqual(currentStage, updatedStage)) return true

        // 更新本地状态
        runInAction(() => {
            // 更新详情缓存
            this.stageDetailMap[stageCode] = updatedStage

            // 更新 stageMap 中的基础信息
            const taskStages = this.stageMap[taskCode]
            if (taskStages) {
                const stageIndex = taskStages.findIndex(stage => stage.code === stageCode)
                if (stageIndex !== -1) {
                    taskStages[stageIndex] = {
                        ...taskStages[stageIndex],
                        code: updatedStage.code,
                        name: updatedStage.name,
                        sort: updatedStage.sort,
                    }
                    this.stageMap = { ...this.stageMap }
                }
            }

            // 如果当前激活项是被更新的阶段，同步更新激活项信息
            if (
                this.activeListItem?.code === stageCode &&
                this.activeListItem?.type === COURSE_DESIGN_LEARNING_TASK_TYPE.stage
            ) {
                this.activeListItem = {
                    ...this.activeListItem,
                    name: updatedStage.name,
                    sort: updatedStage.sort,
                }
            }

            updatedStage.learningSteps?.forEach(item => {
                const mapStep = this.stageDetailMap[item.code]
                if (mapStep) {
                    mapStep.name = item.name
                    mapStep.sort = item.sort
                }
            })
        })

        const result = await saveCourseTaskStage(updatedStage)

        if (result) {
            await this.loadOverviewPart(22)
            this.loadTasks()
            this.loadTaskStages(taskCode)
        }

        return result
    }

    /**
     * 保存活动信息
     */
    async saveActivity(
        activityCode: string,
        obj: Partial<Omit<ILearningActivity, 'code' | 'stepCode'>>,
        forceRefresh = false,
    ) {
        // 优先从 activityDetailMap 获取详情数据
        let currentActivity = this.activityDetailMap[activityCode]
        let stageCode = ''

        if (!currentActivity) {
            let activityIndex = -1
            let stageActivities: IListBaseItem[] = []

            for (const [sCode, activities] of Object.entries(this.activityMap)) {
                const index = activities.findIndex(activity => activity.code === activityCode)
                if (index !== -1) {
                    stageCode = sCode
                    activityIndex = index
                    stageActivities = activities
                    break
                }
            }

            if (activityIndex === -1) return false

            currentActivity = stageActivities[activityIndex] as ILearningActivity
        } else {
            for (const [sCode, activities] of Object.entries(this.activityMap)) {
                const index = activities.findIndex(activity => activity.code === activityCode)
                if (index !== -1) {
                    stageCode = sCode
                    break
                }
            }
        }

        let tempTaskCode = ''

        try {
            if (stageCode) {
                for (const [sCode, list] of Object.entries(this.stageMap)) {
                    const index = list.findIndex(i => i.code === stageCode)
                    if (index !== -1) {
                        tempTaskCode = sCode
                        break
                    }
                }
            }
        } catch (error) {
            //
        }

        const updatedActivity = {
            ...currentActivity,
            ...obj,
        }

        // 检查是否有变化
        if (!forceRefresh && isObjectEqual(currentActivity, updatedActivity)) return true

        // 更新本地状态
        runInAction(() => {
            // 更新详情缓存
            this.activityDetailMap[activityCode] = updatedActivity

            // 更新 activityMap 中的基础信息
            const stageActivities = this.activityMap[stageCode]
            if (stageActivities) {
                const activityIndex = stageActivities.findIndex(
                    activity => activity.code === activityCode,
                )
                if (activityIndex !== -1) {
                    stageActivities[activityIndex] = {
                        ...stageActivities[activityIndex],
                        code: updatedActivity.code,
                        name: updatedActivity.name,
                        sort: updatedActivity.sort,
                    }
                    this.activityMap = { ...this.activityMap }
                }
            }

            // 如果当前激活项是被更新的活动，同步更新激活项信息
            if (
                this.activeListItem?.code === activityCode &&
                this.activeListItem?.type === COURSE_DESIGN_LEARNING_TASK_TYPE.activity
            ) {
                this.activeListItem = {
                    ...this.activeListItem,
                    name: updatedActivity.name,
                    sort: updatedActivity.sort,
                }
            }
        })

        const result = await saveCourseTaskActivity(updatedActivity)

        if (result) {
            await this.loadOverviewPart(22)
            this.loadTasks()
            if (this.stageDetailMap[stageCode]?.taskCode || tempTaskCode) {
                this.loadTaskStages(this.stageDetailMap[stageCode]?.taskCode || tempTaskCode)
            }
            this.loadStageActivities(stageCode)
        }

        return result
    }

    async refreshCourseDesignInfoByAI(aiExchangeData: IAIExchangeData) {
        if (aiExchangeData.courseCode !== this.courseCode) {
            message.warning('课程代码不匹配')
            return
        }

        if (aiExchangeData.courseDesignStep === COURSE_DESIGN_STEP.conversion) {
            if (aiExchangeData.bizType === BIT_TYPE.keyInformation) {
                await this.loadConversion()
            } else if (aiExchangeData.bizType === BIT_TYPE.wayOne) {
                await this.loadStylistic1()
            } else if (aiExchangeData.bizType === BIT_TYPE.wayTwo) {
                await this.loadStylistic2()
            }

            this.loadRefreshKey = `${Date.now()}_${Math.random()}`
            this.loadOverview()
        } else if (aiExchangeData.courseDesignStep === COURSE_DESIGN_STEP.learning) {
            if (aiExchangeData.bizType === BIT_TYPE.courseTaskKeyInfo) {
                await Promise.all([
                    this.loadTaskDetail(aiExchangeData.taskCode),
                    this.getCourseTaskList(),
                    this.loadTaskStages(aiExchangeData.taskCode),
                ])
            } else if (aiExchangeData.bizType === BIT_TYPE.learningStageKeyInfo) {
                const treeMap = this.learningCurrentTreeMap(
                    COURSE_DESIGN_LEARNING_TASK_TYPE.stage,
                    aiExchangeData.stageCode,
                )

                const requestList: Promise<any>[] = [
                    this.loadStageDetail(aiExchangeData.stageCode),
                    this.loadStageActivities(aiExchangeData.stageCode),
                    this.getCourseTaskList(),
                ]

                if (treeMap.taskCode) {
                    requestList.push(this.loadTaskStages(treeMap.taskCode))
                }

                await Promise.all(requestList)
            } else if (aiExchangeData.bizType === BIT_TYPE.learningActivityKeyInfo) {
                const treeMap = this.learningCurrentTreeMap(
                    COURSE_DESIGN_LEARNING_TASK_TYPE.activity,
                    aiExchangeData.activityCode,
                )

                const requestList: Promise<any>[] = [
                    this.loadActivityDetail(aiExchangeData.activityCode),
                    this.getCourseTaskList(),
                ]

                if (treeMap.stageCode) {
                    requestList.push(this.loadStageActivities(treeMap.stageCode))
                }

                if (treeMap.taskCode) {
                    requestList.push(this.loadTaskStages(treeMap.taskCode))
                }

                await Promise.all(requestList)
            } else if (aiExchangeData.bizType === BIT_TYPE.wayThree) {
                await this.loadStylistic3()
            } else if (aiExchangeData.bizType === BIT_TYPE.waySix) {
                await this.loadStylistic6(aiExchangeData.taskCode)
                this.loadStylisticTaskFinishMap(COURSE_DESIGN_STYLISTIC.stylistic6)
            } else if (aiExchangeData.bizType === BIT_TYPE.wayNine) {
                await this.loadStylistic9(aiExchangeData.taskCode)
                this.loadStylisticTaskFinishMap(COURSE_DESIGN_STYLISTIC.stylistic9)
            } else if (aiExchangeData.bizType === BIT_TYPE.wayTen) {
                await this.loadStylistic10(aiExchangeData.taskCode)
                this.loadStylisticTaskFinishMap(COURSE_DESIGN_STYLISTIC.stylistic10)
            }

            this.loadRefreshKey = `${Date.now()}_${Math.random()}`
            this.loadOverview()
        } else if (aiExchangeData.courseDesignStep === COURSE_DESIGN_STEP.teaching) {
            if (aiExchangeData.bizType === BIT_TYPE.teachingPlan) {
                await this.loadTeaching()
            } else if (aiExchangeData.bizType === BIT_TYPE.waySeven) {
                await this.loadStylistic7(aiExchangeData.taskCode)
                this.loadStylisticTaskFinishMap(COURSE_DESIGN_STYLISTIC.stylistic7)
            } else if (aiExchangeData.bizType === BIT_TYPE.wayEleven) {
                await this.loadStylistic11()
            } else if (aiExchangeData.bizType === BIT_TYPE.wayTwelve) {
                await this.loadStylistic12(aiExchangeData.taskCode)
                this.loadStylisticTaskFinishMap(COURSE_DESIGN_STYLISTIC.stylistic12)
            }

            this.loadRefreshKey = `${Date.now()}_${Math.random()}`
            this.loadOverview()
        } else if (aiExchangeData.courseDesignStep === COURSE_DESIGN_STEP.check) {
            if (aiExchangeData.bizType === BIT_TYPE.assessmentPlan) {
                await this.loadCheck()
            } else if (aiExchangeData.bizType === BIT_TYPE.wayFour) {
                await this.loadStylistic4()
            } else if (aiExchangeData.bizType === BIT_TYPE.wayFive) {
                await this.loadStylistic5(aiExchangeData.taskCode)
                this.loadStylisticTaskFinishMap(COURSE_DESIGN_STYLISTIC.stylistic5)
            } else if (aiExchangeData.bizType === BIT_TYPE.wayEight) {
                await this.loadStylistic8(aiExchangeData.taskCode)
                this.loadStylisticTaskFinishMap(COURSE_DESIGN_STYLISTIC.stylistic8)
            }

            this.loadRefreshKey = `${Date.now()}_${Math.random()}`
            this.loadOverview()
        }
    }

    async loadCheck() {
        const res = await getCourseCheckInformation(this.courseCode)

        runInAction(() => {
            this.checkInformation = res
        })
        return res
    }

    async saveCheckInformation(_obj: any | ((p: any) => any)) {
        const obj = typeof _obj === 'function' ? _obj(this.checkInformation) : _obj
        const _checkInformation = {
            ...this.checkInformation,
            ...obj,
        }

        if (isObjectEqual(this.checkInformation, _checkInformation)) return true

        runInAction(() => {
            this.checkInformation = _checkInformation
        })

        const result = await editCourseCheckInformation(_checkInformation)

        if (result) {
            await this.loadOverviewPart(24)
        }

        return result
    }

    async loadStylistic7(taskCode: string) {
        const res = await getCourseStylistic7(taskCode)
        runInAction(() => {
            this.stylistic7 = res
        })
        return res
    }

    async saveStylistic7(obj: Partial<Omit<ICourseStylistic7, 'courseCode'>>) {
        const _stylistic7 = {
            ...this.stylistic7,
            ...obj,
        }
        if (isObjectEqual(this.stylistic7, _stylistic7)) return true

        runInAction(() => {
            this.stylistic7 = _stylistic7
        })

        const result = await editCourseStylistic7(_stylistic7)

        if (result) {
            this.loadOverviewPart(COURSE_DESIGN_STYLISTIC.stylistic7)
            this.loadStylisticTaskFinishMap(COURSE_DESIGN_STYLISTIC.stylistic7)
        }

        return result
    }

    async loadStylistic11() {
        const res = await getCourseStylistic11(this.courseCode)
        runInAction(() => {
            this.stylistic11 = res
        })
        return res
    }

    async saveStylistic11(obj: Partial<Omit<ICourseStylistic11, 'courseCode'>>) {
        const _stylistic11 = {
            ...this.stylistic11,
            ...obj,
        }
        if (isObjectEqual(this.stylistic11, _stylistic11)) return true

        runInAction(() => {
            this.stylistic11 = _stylistic11
        })

        const result = await editCourseStylistic11(_stylistic11)

        if (result) {
            this.loadOverviewPart(COURSE_DESIGN_STYLISTIC.stylistic11)
        }

        return result
    }

    async loadStylistic12(taskCode: string) {
        const res = await getCourseStylistic12(taskCode)
        runInAction(() => {
            this.stylistic12 = res
        })
        return res
    }

    async saveStylistic12(obj: Partial<Omit<ICourseStylistic12, 'courseCode'>>) {
        const _stylistic12 = {
            ...this.stylistic12,
            ...obj,
        }
        if (isObjectEqual(this.stylistic12, _stylistic12)) return true

        runInAction(() => {
            this.stylistic12 = _stylistic12
        })

        const result = await editCourseStylistic12(_stylistic12)

        if (result) {
            this.loadOverviewPart(COURSE_DESIGN_STYLISTIC.stylistic12)
            this.loadStylisticTaskFinishMap(COURSE_DESIGN_STYLISTIC.stylistic12)
        }

        return result
    }

    async loadStylistic4() {
        const res = await getCourseStylistic4(this.courseCode)
        runInAction(() => {
            this.stylistic4 = res
        })
        return res
    }

    async saveStylistic4(obj: Partial<Omit<ICourseStylistic4, 'courseCode'>>) {
        const _stylistic4 = {
            ...this.stylistic4,
            ...obj,
        }
        if (isObjectEqual(this.stylistic4, _stylistic4)) return true

        runInAction(() => {
            this.stylistic4 = _stylistic4
        })

        const result = await editCourseStylistic4(_stylistic4)

        if (result) {
            this.loadOverviewPart(COURSE_DESIGN_STYLISTIC.stylistic4)
        }

        return result
    }

    async loadStylistic5(taskCode: string) {
        const res = await getCourseStylistic5(taskCode)
        runInAction(() => {
            this.stylistic5 = res
        })
        return res
    }

    async saveStylistic5(obj: Partial<Omit<ICourseStylistic5, 'courseCode'>>) {
        const _stylistic5 = {
            ...this.stylistic5,
            ...obj,
        }
        if (isObjectEqual(this.stylistic5, _stylistic5)) return true

        runInAction(() => {
            this.stylistic5 = _stylistic5
        })

        const result = await editCourseStylistic5(_stylistic5)

        if (result) {
            this.loadOverviewPart(COURSE_DESIGN_STYLISTIC.stylistic5)
            this.loadStylisticTaskFinishMap(COURSE_DESIGN_STYLISTIC.stylistic5)
        }

        return result
    }

    async loadStylistic8(taskCode: string) {
        const res = await getCourseStylistic8(taskCode)
        runInAction(() => {
            this.stylistic8 = res
        })
        return res
    }

    async saveStylistic8(obj: Partial<Omit<ICourseStylistic8, 'courseCode'>>) {
        const _stylistic8 = {
            ...this.stylistic8,
            ...obj,
        }
        if (isObjectEqual(this.stylistic8, _stylistic8)) return true

        runInAction(() => {
            this.stylistic8 = _stylistic8
        })

        const result = await editCourseStylistic8(_stylistic8)

        if (result) {
            this.loadOverviewPart(COURSE_DESIGN_STYLISTIC.stylistic8)
            this.loadStylisticTaskFinishMap(COURSE_DESIGN_STYLISTIC.stylistic8)
        }

        return result
    }

    async loadStylistic3() {
        const res = await getCourseStylistic3(this.courseCode)
        runInAction(() => {
            this.stylistic3 = res
        })
        return res
    }

    async saveStylistic3(obj: Partial<Omit<ICourseStylistic3, 'courseCode'>>) {
        const _stylistic3 = {
            ...this.stylistic3,
            ...obj,
            courseCode: this.courseCode,
        }

        if (isObjectEqual(this.stylistic3, _stylistic3)) return true

        runInAction(() => {
            this.stylistic3 = _stylistic3
        })

        const result = await editCourseStylistic3(_stylistic3)

        if (result) {
            this.loadOverviewPart(COURSE_DESIGN_STYLISTIC.stylistic3)
        }

        return result
    }

    async loadStylistic6(taskCode: string) {
        // 直接从服务器加载最新数据
        const res = await getCourseStylistic6(taskCode)
        runInAction(() => {
            this.stylistic6Map[taskCode] = res
        })
        return res
    }

    async saveStylistic6(obj: Partial<ICourseStylistic6>) {
        const taskCode = obj.taskCode || ''
        const currentData = this.stylistic6Map[taskCode] || {
            basicInfoDto: { enterpriseName: '', workDuration: 0 },
            learningTaskDesignDto: { materials: '', requirements: '', scenario: '' },
            representativeFeatures: '',
            taskCode: taskCode,
            workAndLearningAnalysisItems: [],
        }

        const _stylistic6 = {
            ...currentData,
            ...obj,
        }

        if (isObjectEqual(currentData, _stylistic6)) return true

        runInAction(() => {
            this.stylistic6Map[taskCode] = _stylistic6
        })

        const result = await editCourseStylistic6(_stylistic6)

        if (result) {
            this.loadOverviewPart(COURSE_DESIGN_STYLISTIC.stylistic6)
        }

        return result
    }

    async loadStylistic9(taskCode: string) {
        // 直接从服务器加载最新数据
        const res = await getCourseStylistic9(taskCode)
        runInAction(() => {
            this.stylistic9Map[taskCode] = res
        })
        return res
    }

    async saveStylistic9(obj: Partial<ICourseStylistic9>) {
        const taskCode = obj.taskCode || ''
        const currentData = this.stylistic9Map[taskCode] || {
            materials: '',
            requirements: '',
            scenario: '',
            stageLearningStepList: [],
            stageMastermindList: [],
            stageTeachingScheduleList: [],
            studyTaskAssessmentPlanGradeComposeList: [],
            taskCode: taskCode,
        }

        const _stylistic9 = {
            ...currentData,
            ...obj,
        }

        if (isObjectEqual(currentData, _stylistic9)) return true

        runInAction(() => {
            this.stylistic9Map[taskCode] = _stylistic9
        })

        const result = await editCourseStylistic9(_stylistic9)

        if (result) {
            this.loadOverviewPart(COURSE_DESIGN_STYLISTIC.stylistic9)
            this.loadStylisticTaskFinishMap(COURSE_DESIGN_STYLISTIC.stylistic9)
        }

        return result
    }

    async loadStylistic10(taskCode: string) {
        // 直接从服务器加载最新数据
        const res = await getCourseStylistic10(taskCode)

        runInAction(() => {
            this.stylistic10Map[taskCode] = res
        })
        return res
    }

    async saveStylistic10(obj: Partial<ICourseStylistic10>) {
        const taskCode = obj.taskCode || ''
        const currentData = this.stylistic10Map[taskCode] || {
            stageLearningStepList: [],
            stageTeachingScheduleList: [],
            taskCode: taskCode,
        }

        const _stylistic10 = {
            ...currentData,
            ...obj,
        }

        if (isObjectEqual(currentData, _stylistic10)) return true

        runInAction(() => {
            this.stylistic10Map[taskCode] = _stylistic10
        })

        const result = await editCourseStylistic10(_stylistic10)

        if (result) {
            this.loadOverviewPart(COURSE_DESIGN_STYLISTIC.stylistic10)
            this.loadStylisticTaskFinishMap(COURSE_DESIGN_STYLISTIC.stylistic10)
        }

        return result
    }

    /**
     * 批量更新任务排序
     */
    async updateTasksOrder(newTasks: (IListBaseItem & { id: string })[]) {
        // 备份当前状态，用于错误回滚
        const originalTaskList = [...this.taskList]

        try {
            // 1. 更新本地状态 - 直接按照新的顺序重新排列数组
            runInAction(() => {
                // 创建新的任务列表，按照拖拽后的顺序
                const reorderedTaskList = newTasks
                    .map((newTask, index) => {
                        const originalTask = this.taskList.find(t => t.code === newTask.code)
                        if (originalTask) {
                            return {
                                ...originalTask,
                                sort: index + 1,
                            }
                        }
                        return newTask
                    })
                    .filter(Boolean)

                // 直接替换整个数组以确保 MobX 能检测到变化
                this.taskList = [...reorderedTaskList]
            })

            // 2. 批量保存到服务器
            const updatePromises = newTasks.map(async (task, index) => {
                // 优先从 taskDetailMap 获取详情数据
                let taskData = this.taskDetailMap[task.code]

                if (!taskData) {
                    // 如果没有详情，从 taskList 获取基础信息
                    const updatedTask = this.taskList.find(t => t.code === task.code)
                    if (updatedTask) {
                        taskData = {
                            ...updatedTask,
                            code: task.code,
                            courseCode: this.courseCode,
                            sort: index + 1,
                            learningStages: this.stageMap[task.code] || [],
                        } as ILearningTask
                    }
                }

                if (taskData) {
                    const saveData: any = {
                        code: task.code,
                        courseCode: this.courseCode,
                        name: taskData.name,
                        sort: index + 1,
                        learningStages: taskData.learningStages || this.stageMap[task.code] || [],
                    }

                    // 如果有详情数据，才添加详情字段
                    if (this.taskDetailMap[task.code]) {
                        if (taskData.scenario !== undefined) saveData.scenario = taskData.scenario
                        if (taskData.materials !== undefined)
                            saveData.materials = taskData.materials
                        if (taskData.requirements !== undefined)
                            saveData.requirements = taskData.requirements
                    }

                    return await saveCourseTask(saveData)
                }
                return false
            })

            const results = await Promise.all(updatePromises)

            // 检查是否所有保存都成功
            if (results.some(result => !result)) {
                throw new Error('部分任务排序保存失败')
            }

            return true
        } catch (error) {
            // 保存失败时回滚本地状态
            runInAction(() => {
                this.taskList = originalTaskList
            })
            throw error
        }
    }

    /**
     * 设置激活的学习项目，并懒加载相关数据
     */
    async setActiveListItem(item: IListBaseItem, type: COURSE_DESIGN_LEARNING_TASK_TYPE) {
        runInAction(() => {
            this.activeListItem = {
                ...item,
                type,
            }
        })

        // 根据类型懒加载相关数据
        if (type === COURSE_DESIGN_LEARNING_TASK_TYPE.task) {
            // 如果选中任务，加载该任务的阶段列表（如果还没有加载）
            if (!this.stageMap[item.code]) {
                await this.loadTaskStages(item.code)
            }
        } else if (type === COURSE_DESIGN_LEARNING_TASK_TYPE.stage) {
            // 如果选中阶段，加载该阶段的活动列表（如果还没有加载）
            if (!this.activityMap[item.code]) {
                await this.loadStageActivities(item.code)
            }
        }
        // 活动类型不需要加载额外数据
    }

    /**
     * 清除激活的学习项目
     */
    clearActiveListItem() {
        runInAction(() => {
            this.activeListItem = undefined
        })
    }

    /**
     * 检查数据是否已从本地存储中恢复
     * 从本地同步数据到store是异步的，所以最好在页面useEffect添加store.isHydrated依赖
     * 在里面判断isHydrated为true之后再去做一些数据处理，防止数据错误
     */
    get isHydrated() {
        return isHydrated(this)
    }

    /**
     * 根据taskCode获取Stylistic6数据
     */
    getStylistic6ByTaskCode(taskCode: string): ICourseStylistic6 {
        return (
            this.stylistic6Map[taskCode] || {
                basicInfoDto: { enterpriseName: '', workDuration: 0 },
                learningTaskDesignDto: { materials: '', requirements: '', scenario: '' },
                representativeFeatures: '',
                taskCode: taskCode,
                workAndLearningAnalysisItems: [],
            }
        )
    }

    /**
     * 根据taskCode获取Stylistic9数据
     */
    getStylistic9ByTaskCode(taskCode: string): ICourseStylistic9 {
        return (
            this.stylistic9Map[taskCode] || {
                materials: '',
                requirements: '',
                scenario: '',
                stageLearningStepList: [],
                stageMastermindList: [],
                stageTeachingScheduleList: [],
                studyTaskAssessmentPlanGradeComposeList: [],
                taskCode: taskCode,
            }
        )
    }

    /**
     * 根据taskCode获取Stylistic10数据
     */
    getStylistic10ByTaskCode(taskCode: string): ICourseStylistic10 {
        return (
            this.stylistic10Map[taskCode] || {
                stageLearningStepList: [],
                stageTeachingScheduleList: [],
                taskCode: taskCode,
            }
        )
    }
}

export default CourseStore
