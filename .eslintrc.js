module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        'eslint:recommended'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'quotes': 0,
        'no-spaced-func': 0,
        'no-unused-vars': 0,
        'space-in-brackets': 0,
        'no-trailing-spaces': 0,
        'comma-dangle': 0,
        'lines-between-class-members': 0,
        'no-multiple-empty-lines': 0,
        "indent": "off",
    }
}
