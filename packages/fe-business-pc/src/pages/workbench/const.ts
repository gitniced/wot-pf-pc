// 用户登录类型
export const USER_TYPE = {
    /** 个人登录 */
    USER: '1',
    /** 机构登录 */
    ORG: '2',
    /** 资源方登录 */
    MERCHANT: '3',
}

export enum COMPONENT_TYPE_ENUM {
    /**待办事项 */
    TODO = 1,
    /**数据概览-评价数据 */
    DATA_OVERVIEW = 2,
    /**题库数据 */
    QUESTION_DATA = 4,
    /**数据概览-培训数据 */
    TRAINING_DATA = 10,
    /**日程 */
    SCHEDULE,
}

export const COMPONENT_TYPE = {
    todoList: COMPONENT_TYPE_ENUM.TODO,
    dataOverview: COMPONENT_TYPE_ENUM.DATA_OVERVIEW,
    questionData: COMPONENT_TYPE_ENUM.QUESTION_DATA,
    trainingData: COMPONENT_TYPE_ENUM.TRAINING_DATA,
    schedule: COMPONENT_TYPE_ENUM.SCHEDULE,
}

// 生成题库数据的数据
export const getQuestionListData = ({
    //理论细目表数
    theoryPoint,
    // 理论细目表数 本月对比
    monthTheoryPoint,
    // 理论知识题
    theorySubject,
    // 理论知识题 本月对比
    monthTheorySubject,
    // 技能细目表
    skillPoint,
    // 技能细目表 本月对比
    monthSkillPoint,
    // 技能操作卷
    skillPaper,
    // 技能操作卷 本月对比
    monthSkillPaper,
}) => {
    let theoryPointObject =
        theoryPoint !== undefined && monthTheoryPoint !== undefined
            ? [
                  {
                      aliasCode: 'theoryPoint',
                      monthCount: monthTheoryPoint,
                      name: '理论知识细目表（个）',
                      totalCount: theoryPoint,
                  },
              ]
            : []

    let theorySubjectObject =
        theorySubject !== undefined && monthTheorySubject !== undefined
            ? [
                  {
                      aliasCode: 'theorySubject',
                      monthCount: monthTheorySubject,
                      name: '理论知识题（道）',
                      totalCount: theorySubject,
                  },
              ]
            : []

    let skillPointObject =
        skillPoint !== undefined && monthSkillPoint !== undefined
            ? [
                  {
                      aliasCode: 'skillPoint',
                      monthCount: monthSkillPoint,
                      name: '技能操作细目表（个）',
                      totalCount: skillPoint,
                  },
              ]
            : []
    let skillPaperObject =
        skillPaper !== undefined && monthSkillPaper !== undefined
            ? [
                  {
                      aliasCode: 'skillPaper',
                      monthCount: monthSkillPaper,
                      name: '技能操作卷（份）',
                      totalCount: skillPaper,
                  },
              ]
            : []
    // 合并所有对象
    return [...theoryPointObject, ...theorySubjectObject, ...skillPointObject, ...skillPaperObject]
}
