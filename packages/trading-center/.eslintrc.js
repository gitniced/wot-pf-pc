module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['eslint:recommended', require.resolve('@umijs/fabric/dist/eslint')],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {},
    overrides: [
        {
            files: ['*.js', '*.ts', '*.jsx', '*.tsx'],
            rules: {
                '@typescript-eslint/no-unused-vars': 'error',
                'react/no-unknown-property': 'off',
                'react-hooks/exhaustive-deps': 'off',
                'no-use-before-define': 'off', // 不能在定义之前使用
                // 使用 === 替代 ==
                eqeqeq: [2, 'allow-null'],
                // 禁止使用空解构模式
                'no-empty-pattern': 'error',
                // 取消const强制
                'prefer-const': [
                    0,
                    {
                        ignoreReadBeforeAssign: false,
                    },
                ],
                // 不允许未使用的表达式(允许三元和短路运算)
                'no-unused-expressions': 'off',
                '@typescript-eslint/no-unused-expressions': [
                    0,
                    {
                        allowShortCircuit: true,
                        allowTernary: true,
                    },
                ],
            },
        },
    ],
}
