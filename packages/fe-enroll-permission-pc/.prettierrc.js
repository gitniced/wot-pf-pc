const fabric = require('@umijs/fabric')

module.exports = {
    ...fabric.prettier,
    '#semi': '句尾添加分号',
    semi: false,
    '#singleQuote': '使用单引号代替双引号',
    singleQuote: true,
    '#tabWidth': '缩进字节数',
    tabWidth: 4,
    '#printWidth': '超过最大值换行',
    printWidth: 100,
    '#useTabs': '缩进不使用tab，使用空格',
    useTabs: false,
    ignorePath: '.prettierignore',
    '#arrowParens': '(x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号',
    arrowParens: 'avoid',
    '#bracketSpacing': '在对象，数组括号与文字之间加空格 "{ foo: bar }"',
    bracketSpacing: true,
    '#eslintIntegration': '让prettier使用eslint的代码格式进行校验',
    eslintIntegration: true,
}
