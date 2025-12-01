module.exports = {
    extends: [require.resolve('@umijs/fabric/dist/stylelint')],
    rules: {
        'selector-class-pattern': [
            // 命名规范
            '^([a-z][a-z0-9]*)(_[a-z0-9]+)*$',
            {
                message: 'Class selector need to be named as UnderScoreCase',
            },
        ],
        // 颜色指定小写（避免与prettier配置冲突）
        'color-hex-case': 'lower',
        'block-no-empty': true, // 禁止出现空块
        'function-url-quotes': 'always', // 要求或禁止 url 使用引号。
        'no-descending-specificity': null, // 禁止低优先级的选择器出现在高优先级的选择器之后
    },
}
