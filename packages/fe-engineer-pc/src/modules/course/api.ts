const api = {
    // 查看体例第一步的完成概览
    getWaysFirstOverview: '/wil/research/course_task/first_overview',
    // 查看课程校本转换
    getWaysKeyInformation: '/wil/research/course_task/key_information',
    // 编辑课程校本转换
    editWaysKeyInformation: '/wil/research/course_task/edit_key_information',
    // 体例一详情
    getWaysWayOne: '/wil/research/course_task/way_one',
    // 编辑体例一
    editWaysWayOne: '/wil/research/course_task/edit_way_one',
    // 体例二详情
    getWaysWayTwo: '/wil/research/course_task/way_two',
    // 编辑体例二
    editWaysWayTwo: '/wil/research/course_task/edit_way_two',
    // 查询课程基本信息
    getCourseDetailBaseInfo: '/wil/research/courses/detail_base_info',

    //========== 第三步 ==========
    //获取教学方案设计
    getCourseTaskTeachingPlan: '/wil/research/course_task/teaching_plan',
    saveOrUpdateTeachingPlan: '/wil/research/course_task/save_or_update_teaching_plan',
    //获取体例7
    getTaskTeachingActivityMastermind:
        '/wil/research/course_task/task_teaching_activity_mastermind',
    saveOrUpdateTaskTeachingActivityMastermind:
        '/wil/research/course_task/save_or_update_task_teaching_activity_mastermind',
    //获取体例11
    getCourseTaskTeachingSchedule: '/wil/research/course_task/teaching_schedule',
    saveOrUpdateTeachingSchedule: '/wil/research/course_task/save_or_update_teaching_schedule',
    //获取体例12
    getCourseTaskTaskLessonPlan: '/wil/research/course_task/task_lesson_plan',
    saveOrUpdateTaskLessonPlan: '/wil/research/course_task/save_or_update_task_lesson_plan',
    //获取考核方案
    getCourseTaskAssessmentPlan: '/wil/research/course_task/assessment_plan',
    saveOrUpdateAssessmentPlan: '/wil/research/course_task/save_or_update_assessment_plan',
    //获取体例4
    getCourseTaskCurriculumAssessmentPlan: '/wil/research/course_task/curriculum_assessment_plan',
    saveOrUpdateCurriculumAssessmentPlan:
        '/wil/research/course_task/save_or_update_curriculum_assessment_plan',
    //获取体例5
    getCourseTaskFinalAssessmentQuestions: '/wil/research/course_task/final_assessment_questions',
    saveOrUpdateFinalAssessmentQuestions:
        '/wil/research/course_task/save_or_update_final_assessment_questions',
    //获取体例8
    getCourseTaskStudyTaskAssessmentPlan: '/wil/research/course_task/study_task_assessment_plan',
    saveOrUpdateStudyTaskAssessmentPlan:
        '/wil/research/course_task/save_or_update_study_task_assessment_plan',
    // ========== 教研端-课程学习任务管理 ==========
    // 删除课程学习任务
    removeCourseTask: '/wil/research/course_task/remove_task',
    // 课程学习任务列表
    getCourseTaskList: '/wil/research/course_task/list_by_course_code',
    // 课程学习任务-环节列表
    getCourseTaskStageList: '/wil/research/course_task/list_stage_by_task_code',
    // 根据学习环节编码查询学习活动基本信息列表
    getCourseTaskActivityList: '/wil/research/course_task/list_activity_by_stage_code',
    // 课程学习任务详情
    getCourseTaskDetail: '/wil/research/course_task/task_detail',
    // 保存或修改课程学习任务
    saveCourseTask: '/wil/research/course_task/save_or_update',
    // 课程学习任务-环节详情
    getCourseTaskStageDetail: '/wil/research/course_task/stage_detail',
    // 保存或修改学习环节
    saveCourseTaskStage: '/wil/research/course_task/save_or_update_stage',
    // 课程学习任务-活动详情
    getCourseTaskActivityDetail: '/wil/research/course_task/activity_detail',
    // 保存或修改学习活动
    saveCourseTaskActivity: '/wil/research/course_task/save_or_update_activity',
    // 获取自己有权限的资源列表-本人个人+本校本专业公开
    getAuthResourcePage: '/wil/research/course_task/page_auth_resource',
    //获取体例3
    getCourseTaskWayThree: '/wil/research/course_task/get_way_three',
    saveOrUpdateWayThree: '/wil/research/course_task/save_or_update_way_three',
    //获取体例6
    getCourseTaskWaySix: '/wil/research/course_task/get_way_six',
    saveOrUpdateWaySix: '/wil/research/course_task/save_or_update_way_six',
    //获取体例9
    getCourseTaskLearningTaskWork: '/wil/research/course_task/learning_task_work',
    saveOrUpdateLearningTaskWork: '/wil/research/course_task/save_or_update_learning_task_work',
    //获取体例10
    getCourseTaskLearningTaskInformation: '/wil/research/course_task/learning_task_information',
    saveOrUpdateLearningTaskInformation:
        '/wil/research/course_task/save_or_update_learning_task_information',
    // 获取体例状态列表
    getCourseTaskListWayFinishStatus: '/wil/research/course_task/list_way_finish_status',
    // 获取体例中每个任务的完成状态
    getCourseTaskListWayTaskFinishStatus: '/wil/research/course_task/list_way_task_finish_status',

    // 下载体例
    downloadWay: '/wil/course_task/download_course_way',
} as const

export default api
