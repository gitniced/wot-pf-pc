/* eslint-disable */
const fs = require('fs')
const path = require('path')
// const packageInfo = require('./package.json')
try {
    let oldData = fs.readFileSync(path.join(__dirname, './src/styles/antd.variable.css'), 'utf8')
    let newData = oldData
        // .replaceAll('ant-', `${packageInfo.name}-`)
        .replaceAll('font-size: 14px', 'font-size: 16px')
    fs.writeFileSync(path.join(__dirname, './src/styles/antd.variable.css'), newData, 'utf8')
} catch (error) {
    throw error
}
