const api = {
    /** 获取学生考核项目多维度评分矩阵（自评/组内/组间/师评） */
    getMatrixByStudent: '/wil/evaluationScore/matrixByStudent',
    /** 获取学生评语列表（师评、组内互评、组间互评） */
    getMatrixByComments: '/wil/evaluationScore/comments',
}
export default api
