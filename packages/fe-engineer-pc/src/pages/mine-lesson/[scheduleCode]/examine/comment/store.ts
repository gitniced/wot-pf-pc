import { makeAutoObservable } from 'mobx'
import api from './api'
import http from '@/servers/http'
import type {
    AssessmentProjectCriteriaDto,
    AssessmentProjectDto,
    CurrentEvaluationDto,
    InterGroupPeerTargetDto,
    PeerEvaluationTargetDto,
    ProjectLearningOutcomeDto,
} from './interface'
import { cloneDeep } from 'lodash'
import { EXAMINE_COMMENT_TYPE } from '../student/const'
import { message } from 'antd'
import { executeHttpSequentially } from '@/utils/axiosIterator'
import { history } from 'umi'

class store {
    constructor() {
        makeAutoObservable(this)
    }
    /**是否请求成功 */
    public hasRequest: boolean = false
    /**是否请求成功 */
    public hasRequestAssProjects: boolean = false
    /**考核项目列表 */
    public assProjects: Partial<AssessmentProjectDto>[] = []
    /**当前评价 */
    public currentEvaluation: Partial<CurrentEvaluationDto> = {}
    /**待评价列表 */
    public waitEvaluationList: Partial<CurrentEvaluationDto>[] = []
    /**成果列表 */
    public outcomeList: Partial<ProjectLearningOutcomeDto>[] = []

    /**是否请求数据 */
    public isRequestPending: boolean = false
    /**是否正在提交评价 */
    public isPendingSubmitEvaluation: boolean = false

    /**初始化 */
    initStore = () => {
        // this.hasRequest = false
        // this.hasRequestCriteria = false
        // this.hasRequestAssProjects = false
        // this.hasRequestCriteria = false
        // this.assProjects = []
        // this.criteria = {}
    }

    /**更新当前评价 */
    selectEvaluation = (code: string) => {
        const evaluation = this.waitEvaluationList.find(item => item.userCode === code)
        if (evaluation) {
            this.currentEvaluation = evaluation
        }
    }

    /**更新当前评价 */
    updateCurrentEvaluation = (data: Partial<CurrentEvaluationDto>) => {
        this.currentEvaluation = { ...this.currentEvaluation, ...data }
    }

    /**更新评价内容 */
    updateComment = (evaluationTask: string, value: string) => {
        if (evaluationTask && evaluationTask === this.currentEvaluation.evaluationTask) {
            this.updateCurrentEvaluation({
                comment: value,
            })
        }
    }

    /**更新评价标准 */
    updateCriteria = async (evaluationTask: string, code: string, value: number | undefined) => {
        if (evaluationTask && evaluationTask === this.currentEvaluation.evaluationTask) {
            const { criteriaList = [] } = this.currentEvaluation.criteria || {}
            const tempCriteriaList = cloneDeep(criteriaList)
            const index = tempCriteriaList.findIndex(item => item.code === code)
            if (index !== -1) {
                tempCriteriaList[index].score = value
                this.updateCurrentEvaluation({
                    criteria: {
                        ...this.currentEvaluation.criteria,
                        criteriaList: tempCriteriaList,
                    },
                })
            }
        }
    }

    /** 自评任务处理流程 */
    selfEvaluationTurbo = async (userCode: string, projectCode: string) => {
        this.isRequestPending = true
        executeHttpSequentially([
            () => this.getSelfEvaluationTaskCode(projectCode),
            () => this.getCriteria(projectCode),
        ])
            .then(data => {
                this.isRequestPending = false
                const { results } = data || {}
                const tempCurrentEvaluation: Partial<CurrentEvaluationDto> = {}
                const [_responseA, _responseB] = results || []
                if (_responseA.success) {
                    tempCurrentEvaluation.evaluationTask = (_responseA.result ||
                        '') as unknown as string
                }
                if (_responseB.success) {
                    tempCurrentEvaluation.criteria = (_responseB.result ||
                        {}) as unknown as AssessmentProjectCriteriaDto
                }
                this.currentEvaluation = {
                    userCode,
                    type: EXAMINE_COMMENT_TYPE.selfEvaluationCount,
                    ...tempCurrentEvaluation,
                }
            })
            .catch(() => {
                this.isRequestPending = false
            })
    }

    /** 组内互评任务处理流程 */
    intraGroupEvaluationTurbo = async (projectCode: string) => {
        this.isRequestPending = true
        executeHttpSequentially([
            () => this.getCriteria(projectCode),
            () => this.getIntraGroupTargets(projectCode),
        ])
            .then(data => {
                this.isRequestPending = false
                const { results } = data || {}
                const [_responseA, _responseB] = results || []
                let criteria: AssessmentProjectCriteriaDto = {}
                if (_responseA.success) {
                    criteria = (_responseA.result || {}) as unknown as AssessmentProjectCriteriaDto
                }
                if (_responseB.success) {
                    const evaluationList = (_responseB.result ||
                        []) as unknown as PeerEvaluationTargetDto[]
                    let waitEvaluationList: CurrentEvaluationDto[] = evaluationList.map(
                        (item, index) => {
                            if (index === 0) {
                                this.currentEvaluation = {
                                    ...item,
                                    type: EXAMINE_COMMENT_TYPE.intraGroupPeerCount,
                                    criteria: cloneDeep(criteria),
                                    userName: item.userName,
                                } as unknown as CurrentEvaluationDto
                            }
                            return {
                                ...item,
                                type: EXAMINE_COMMENT_TYPE.intraGroupPeerCount,
                                criteria: cloneDeep(criteria),
                                userName: item.userName,
                            } as unknown as CurrentEvaluationDto
                        },
                    )
                    this.waitEvaluationList = waitEvaluationList
                }
            })
            .catch(() => {
                this.isRequestPending = false
            })
    }

    /** 组间互评任务处理流程 */
    interGroupEvaluationTurbo = async (scheduleCode: string, projectCode: string) => {
        this.isRequestPending = true
        executeHttpSequentially([
            () => this.getCriteria(projectCode),
            () => this.getInterGroupTargets(scheduleCode, projectCode),
        ])
            .then(data => {
                this.isRequestPending = false
                const { results } = data || {}
                const [_responseA, _responseB] = results || []
                let criteria: AssessmentProjectCriteriaDto = {}
                if (_responseA.success) {
                    criteria = (_responseA.result || {}) as unknown as AssessmentProjectCriteriaDto
                }
                if (_responseB.success) {
                    const evaluationList = (_responseB.result ||
                        []) as unknown as InterGroupPeerTargetDto[]
                    let waitEvaluationList: CurrentEvaluationDto[] = evaluationList.map(
                        (item, index) => {
                            if (index === 0) {
                                this.currentEvaluation = {
                                    ...item,
                                    type: EXAMINE_COMMENT_TYPE.interGroupPeerCount,
                                    userCode: item.teamLeaderCode,
                                    userName: item.teamName,
                                    criteria: cloneDeep(criteria),
                                } as unknown as CurrentEvaluationDto
                            }
                            return {
                                ...item,
                                type: EXAMINE_COMMENT_TYPE.interGroupPeerCount,
                                userCode: item.teamLeaderCode,
                                userName: item.teamName,
                                criteria: cloneDeep(criteria),
                            } as unknown as CurrentEvaluationDto
                        },
                    )
                    this.waitEvaluationList = waitEvaluationList
                }
            })
            .catch(() => {
                this.isRequestPending = false
            })
    }

    /** 获取自评任务编号 */
    getSelfEvaluationTaskCode = (projectCode: string) => {
        return http(api.getSelfEvaluationTaskCode, 'get', {
            projectCode,
        })
    }

    /** 获取组内互评列表 */
    getIntraGroupTargets = (projectCode: string): Promise<PeerEvaluationTargetDto[]> => {
        return http(api.getIntraGroupTargets, 'get', {
            projectCode,
        })
    }

    /** 获取组内互评列表 */
    getInterGroupTargets = async (
        scheduleCode: string,
        projectCode: string,
    ): Promise<InterGroupPeerTargetDto[]> => {
        return http(api.getInterGroupTargets, 'get', {
            scheduleCode,
            projectCode,
        })
    }

    /**获取考核项目成果 */
    getProjectOutcomes = (userCode: string, scheduleCode: string, projectCode: string) => {
        http(api.getProjectOutcomes, 'post', {
            scheduleCode,
            userCode,
            projectCode,
        }).then(data => {
            this.outcomeList = (data || []) as unknown as ProjectLearningOutcomeDto[]
        })
    }

    /**获取考核项目评价标准 */
    getCriteria = (projectCode: string) => {
        return http(api.getCriteria, 'get', {
            projectCode,
        })
    }

    /**获取考核项目成果 */
    getAssProjects = async (scheduleCode: string, evaluationType: number) => {
        http(api.getAssProjects, 'get', {
            scheduleCode,
            evaluationType,
        })
            .then(data => {
                this.assProjects = (data || []) as unknown as AssessmentProjectDto[]
            })
            .finally(() => {
                this.hasRequestAssProjects = true
            })
    }

    /**提交评价 */
    submitEvaluation = async (
        scheduleCode: string,
        type: keyof typeof EXAMINE_COMMENT_TYPE,
        params: Partial<CurrentEvaluationDto>,
    ) => {
        this.isPendingSubmitEvaluation = true
        const { evaluationTask, criteria, comment } = params || {}
        const { criteriaList = [] } = criteria || {}
        const evaluationDetails = criteriaList.map(item => {
            return {
                criterionCode: item.code,
                score: item.score,
                weight: item.weight,
            }
        })
        http(api.submitEvaluation, 'post', {
            evaluationTask,
            evaluationDetails,
            comment: type !== EXAMINE_COMMENT_TYPE.selfEvaluationCount ? comment : undefined,
        })
            .then(data => {
                if (data) {
                    if (type === EXAMINE_COMMENT_TYPE.selfEvaluationCount) {
                        message.success('评价提交成功')
                        history.replace(
                            `/mine-lesson/${scheduleCode}/examine/comment?type=${
                                type as unknown as keyof typeof EXAMINE_COMMENT_TYPE
                            }`,
                        )
                    } else {
                        const { userCode } = params || {}
                        let currentIndex = 0
                        const newWaitEvaluationList = this.waitEvaluationList.map((item, index) => {
                            if (item.userCode === userCode) {
                                currentIndex = index
                                return { ...item, status: true }
                            }
                            return item
                        })
                        this.waitEvaluationList = newWaitEvaluationList
                        const prevWaitEvaluationList = newWaitEvaluationList.filter(
                            (i, index) => index < currentIndex,
                        )
                        const nextWaitEvaluationList = newWaitEvaluationList.filter(
                            (i, index) => index > currentIndex,
                        )
                        const prevEvaluation = prevWaitEvaluationList.find(item => !item.status)
                        const nextEvaluation = nextWaitEvaluationList.find(item => !item.status)
                        if (nextEvaluation) {
                            this.currentEvaluation = nextEvaluation
                        } else if (prevEvaluation) {
                            this.currentEvaluation = prevEvaluation
                        } else {
                            message.success('评价已完成')
                            history.replace(
                                `/mine-lesson/${scheduleCode}/examine/comment?type=${
                                    type as unknown as keyof typeof EXAMINE_COMMENT_TYPE
                                }`,
                            )
                        }
                    }
                }
            })
            .finally(() => {
                this.isPendingSubmitEvaluation = false
            })
    }
}

export default store
