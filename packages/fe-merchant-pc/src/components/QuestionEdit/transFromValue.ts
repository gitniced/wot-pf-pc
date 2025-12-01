//* 转换给接口的数据  from
const parseFromValue = (params: Record<string, any>) => {
    const result: Record<string, any> = {}

    result.level = params.level
    result.type = params.workLevel

    const { commonJob = [], authenticatePoint = [] } = params
    const [work, type, level] = commonJob
    const [root, first, second, third, last] = authenticatePoint

    result.customContent = {
        commonJob: {
            jobNameCode: work?.value,
            jobName: work?.label,
            jobTypeCode: type?.value,
            jobType: type?.label,
            jobLevelCode: level?.value,
            jobLevel: level?.label,
        },
        discrimination: params.discrimination,
        authenticatePoint: {
            code: root?.value,
            name: root?.label,
            firstRangeCode: first?.value,
            firstRangeName: first?.label,
            secondRangeCode: second?.value,
            secondRangeName: second?.label,
            thirdRangeCode: third?.value,
            thirdRangeName: third?.label,
            pointCode: last?.value,
            pointName: last?.label,
        },
    }

    return result
}

// 转换给接口的数据 题库
const parseItemData = (param: Record<string, any>) => {
    const result: Record<string, any> = {
        title: param.title.content,
        analysis: param.analysis.content,
        type: param.type,
        optionList: param.optionList.map((item: any, index: number) => {
            return {
                answer: item.answer.content,
                isAnswer: item.isAnswer,
                questionCode: item.code,
                sort: index,
            }
        }),
    }
    return result
}

// 把接口数据转换成我们这边可以使用的
const parseGroupData = (param: Record<string, any>) => {
    const result: Record<string, any> = {
        title: param.title?.content,
        analysis: param.analysis?.content,
        type: param.type,
        childList: param.childList.map((item: Record<string, unknown>) => parseItemData(item)),
    }
    return result
}

const parseData = (param: Record<string, unknown>) => {
    if (param.status === 2) {
        return parseGroupData(param)
    } else {
        return parseItemData(param)
    }
}

// 把接口数据转换成我们可以使用的
const transFromSelfData = (params: Record<string, any>) => {
    const obj: Record<string, any> = {
        analysis: {
            content: params.analysis,
            error: false,
            errorMsg: '',
        },
        active: true,
        code: params.code,
        type: params.type,
        title: {
            content: params.title,
            error: false,
            errorMsg: '',
        },
        status: params.childList?.length > 0 ? 2 : 1,
        optionList: params.optionList?.map((i: Record<string, unknown>) => {
            return {
                sort: i.sort,
                isAnswer: i.isAnswer,
                code: i.code,
                answer: {
                    content: i.answer,
                },
            }
        }),
        childList: params.childList?.map((i: Record<string, unknown>) => {
            return transFromSelfData(i)
        }),
    }

    return obj
}

const transFromFieldsValue = (params: Record<string, any>) => {
    const { customContent } = params
    const { authenticatePoint, commonJob, knowledgePoint } = customContent

    const result: Record<string, any> = {
        workLevel: params.type,
        authenticatePoint: [
            {
                value: authenticatePoint?.code,
                label: authenticatePoint?.name,
            },
            {
                value: authenticatePoint?.firstRangeCode,
                label: authenticatePoint?.firstRangeName,
            },
            {
                value: authenticatePoint?.secondRangeCode,
                label: authenticatePoint?.secondRangeName,
            },
            {
                value: authenticatePoint?.thirdRangeCode,
                label: authenticatePoint?.thirdRangeName,
            },
            {
                value: authenticatePoint?.pointCode,
                label: authenticatePoint?.pointName,
            },
        ].filter(item => Boolean(item.label && item.value)),
        discrimination: params.customContent?.discrimination,
        level: params.level,
        knowledgePointCode: knowledgePoint?.codeList ?? [],
    }

    if (commonJob?.jobNameCode && commonJob?.jobTypeCode && commonJob?.jobLevelCode) {
        result.commonJob = [
            {
                value: commonJob?.jobNameCode,
                label: commonJob?.jobName,
            },
            {
                value: commonJob?.jobTypeCode,
                label: commonJob?.jobType,
            },
            {
                value: commonJob?.jobLevelCode,
                label: commonJob?.jobLevel,
            },
        ]
    }
    return result
}

export { parseFromValue, parseData, transFromSelfData, transFromFieldsValue }
