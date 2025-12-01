// const fabric = require.resolve('@umijs/fabric')

// module.exports = {
//     extends: [require('@umijs/fabric/dist/stylelint')],
//     rules: {
// 'selector-class-pattern': [
//     // 命名规范
//     '^([a-z][a-z0-9]*)(_[a-z0-9]+)*$',
//     {
//         message: 'Class selector need to be named as UnderScoreCase',
//     },
// ],
// // 颜色指定小写（避免与prettier配置冲突）
// 'color-hex-case': 'lower',
// 'block-no-empty': 'error', // 禁止出现空块
// 'function-url-quotes': 'always', // 要求或禁止 url 使用引号。
// 'no-descending-specificity': null, // 禁止低优先级的选择器出现在高优先级的选择器之后
//     },
// }

module.exports = {
    root: true,
    extends: [
        'stylelint-config-standard', // 配置stylelint拓展插件
        'stylelint-config-recess-order', // 配置stylelint css属性书写顺序插件,
        'stylelint-config-rational-order',
        'stylelint-config-prettier', // 配置stylelint和prettier兼容
    ],
    plugins: [
        'stylelint-order', //指定事物的排序，例如声明块中的属性（插件包）。
        'stylelint-declaration-block-no-ignored-properties', //禁止由于同一规则中的另一个属性值而被忽略的属性值。
        'stylelint-less', // 配置stylelint less拓展插件
        'stylelint-prettier', //将 Prettier 作为 stylelint 规则运行。
    ],
    overrides: [
        {
            files: ['*.less', '**/*.less'],
            customSyntax: 'postcss-less',
            extends: ['stylelint-config-standard', 'stylelint-config-recommended'],
        },
    ],
    ignoreFiles: [
        '**/*.js',
        '**/*.jsx',
        '**/*.tsx',
        '**/*.ts',
        '**/*.json',
        './src/styles/antd.variable.css',
    ],
    rules: {
        'color-function-notation': 'legacy',
        'selector-pseudo-class-no-unknown': null,
        'font-family-no-missing-generic-family-keyword': null,
        'selector-class-pattern': [
            // 命名规范
            '^([a-z][a-z0-9]*)(_[a-z0-9]+)*$',
            {
                message: 'Class selector need to be named as UnderScoreCase',
            },
        ],
        // 颜色指定小写（避免与prettier配置冲突）
        'block-no-empty': true, // 禁止出现空块
        'function-url-quotes': 'always', // 要求或禁止 url 使用引号。
        'no-descending-specificity': null, // 禁止低优先级的选择器出现在高优先级的选择器之后
        'order/properties-order': [
            'position',
            'top',
            'right',
            'bottom',
            'left',
            'z-index',
            'display',
            'justify-content',
            'align-items',
            'float',
            'clear',
            'overflow',
            'overflow-x',
            'overflow-y',
            'margin',
            'margin-top',
            'margin-right',
            'margin-bottom',
            'margin-left',
            'padding',
            'padding-top',
            'padding-right',
            'padding-bottom',
            'padding-left',
            'width',
            'min-width',
            'max-width',
            'height',
            'min-height',
            'max-height',
            'font-size',
            'font-family',
            'font-weight',
            'border',
            'border-style',
            'border-width',
            'border-color',
            'border-top',
            'border-top-style',
            'border-top-width',
            'border-top-color',
            'border-right',
            'border-right-style',
            'border-right-width',
            'border-right-color',
            'border-bottom',
            'border-bottom-style',
            'border-bottom-width',
            'border-bottom-color',
            'border-left',
            'border-left-style',
            'border-left-width',
            'border-left-color',
            'border-radius',
            'text-align',
            'text-justify',
            'text-indent',
            'text-overflow',
            'text-decoration',
            'white-space',
            'color',
            'background',
            'background-position',
            'background-repeat',
            'background-size',
            'background-color',
            'background-clip',
            'opacity',
            'filter',
            'list-style',
            'outline',
            'visibility',
            'box-shadow',
            'text-shadow',
            'resize',
            'transition',
        ],
    },
}
