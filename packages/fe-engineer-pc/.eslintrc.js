// 让本配置文件不作为 ESLint 的根配置，避免 tsconfig 检查报错
module.exports = {
    root: false,
    // 排除本文件，避免 ESLint 用 tsconfig 检查 .eslintrc.js 导致报错
    ignorePatterns: ['.eslintrc.js', 'iconfonts.js'],
}
